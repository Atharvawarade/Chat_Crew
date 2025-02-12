import os
import json
import requests
from bs4 import BeautifulSoup
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from flask import Flask, request, jsonify, render_template, session
from flask_session import Session  # To support server-side session
from dotenv import load_dotenv
from voice import get_voice_input  # Import the function from voice.py

# Load environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

# Flask app initialization
app = Flask(__name__)

# Configure session management
app.config['SESSION_TYPE'] = 'filesystem'  # Store session data on the filesystem
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default-secret')  # Secure session data
Session(app)

# File paths
JSON_BACKUP_FILE = "firestore_backup.json"
SCRAPED_DATA_FILE = "scraped_data.json"
UPLOADS_FOLDER = r"C:\\Users\\athar\\Videos\\Chat_Crew\\uploads"

# Backup Firestore database
def backup_firestore():
    print("Backing up Firestore database...")
    import firebase_admin
    from firebase_admin import credentials, firestore
    from google.protobuf.timestamp_pb2 import Timestamp

    # Initialize Firebase Admin SDK
    cred_path = r"C:\\Users\\athar\\Downloads\\student-assistance-chatbot-firebase-adminsdk-pgilm-3da5ce2ba5.json"
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    # Serialize Firestore data
    def serialize_document(doc_data):
        if doc_data is None:
            return None
        elif isinstance(doc_data, dict):
            return {key: serialize_document(value) for key, value in doc_data.items()}
        elif isinstance(doc_data, list):
            return [serialize_document(item) for item in doc_data]
        elif hasattr(doc_data, 'to_dict'):  # Check if it's a Firestore timestamp
            try:
                return doc_data.timestamp()  # Convert to timestamp
            except:
                return str(doc_data)  # Fallback to string representation if unable to convert
        elif isinstance(doc_data, (int, float, str, bool)):
            return doc_data
        else:
            try:
                return str(doc_data)
            except:
                return repr(doc_data)

    # Fetch all collections and documents
    def fetch_all_collections():
        collections = db.collections()
        data = {}
        for collection in collections:
            collection_name = collection.id
            data[collection_name] = {}
            docs = collection.stream()
            for doc in docs:
                data[collection_name][doc.id] = serialize_document(doc.to_dict())
        return data

    # Export data to JSON
    data = fetch_all_collections()
    with open(JSON_BACKUP_FILE, 'w') as json_file:
        json.dump(data, json_file, indent=4)
    print(f"Firestore data exported to {JSON_BACKUP_FILE}")

# Scrape website data
def scrape_website(base_url):
    print(f"Scraping website: {base_url}")
    try:
        response = requests.get(base_url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        data = []
        for link in soup.find_all('a', href=True):
            title = link.text.strip() or "No Title"  # Default to "No Title" if text is empty
            url = link['href'].strip()
            if not url.startswith('http'):
                url = base_url.rstrip('/') + '/' + url.lstrip('/')
            data.append({"title": title, "url": url})

        with open(SCRAPED_DATA_FILE, 'w') as f:
            json.dump(data, f, indent=4)
        print(f"Scraped data saved to {SCRAPED_DATA_FILE}")

    except Exception as e:
        print(f"Error scraping website: {e}")
        raise

# Load text from Firebase backup, scraped data, and PDFs in the uploads folder
def get_text_chunks():
    print("Loading data and creating text chunks...")
    text = ""

    # Process JSON backup file
    print(f"Processing JSON backup file: {JSON_BACKUP_FILE}")
    with open(JSON_BACKUP_FILE, 'r') as json_file:
        json_data = json.load(json_file)
        for collection, documents in json_data.items():
            for doc_id, doc_data in documents.items():
                text += f"Collection: {collection}, Document: {doc_id}, Data: {doc_data}\n"

    # Process scraped data
    print(f"Processing scraped data file: {SCRAPED_DATA_FILE}")
    with open(SCRAPED_DATA_FILE, 'r') as f:
        scraped_data = json.load(f)
        for entry in scraped_data:
            title = entry.get('title', 'No Title')  # Use a default value if 'title' is missing
            url = entry.get('url', 'No URL')       # Use a default value if 'url' is missing
            text += f"Title: {title}, URL: {url}\n"

    # Process all PDF files in the uploads folder
    print(f"Processing PDF files in the uploads folder: {UPLOADS_FOLDER}")
    for filename in os.listdir(UPLOADS_FOLDER):
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(UPLOADS_FOLDER, filename)
            print(f"Processing PDF file: {pdf_path}")
            reader = PdfReader(pdf_path)
            for page in reader.pages:
                text += page.extract_text()

    # Split text into chunks
    print("Splitting text into chunks...")
    splitter = RecursiveCharacterTextSplitter(chunk_size=3000, chunk_overlap=500)
    chunks = splitter.split_text(text)
    print(f"Number of chunks created: {len(chunks)}")
    return chunks

# Create vector store from text chunks
def create_vector_store():
    try:
        print("Creating vector store...")
        chunks = get_text_chunks()
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        vector_store = FAISS.from_texts(chunks, embedding=embeddings)
        vector_store.save_local("faiss_index")
        print("Vector store created successfully!")
    except Exception as e:
        print(f"Error creating vector store: {e}")
        raise

# Create a conversational chain
def get_conversational_chain():
    print("Creating conversational chain...")
    prompt_template = """
    Based on the provided context and previous conversation, answer the question as clearly and briefly as possible.
    If you cannot find the answer in the context, inform the user or guide them appropriately.

    Previous Conversation:\n{history}\n
    Context:\n{context}\n
    Question:\n{question}\n
    Answer:
    """
    model = ChatGoogleGenerativeAI(model="gemini-1.5-pro", client=genai, temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["history", "context", "question"])
    chain = load_qa_chain(llm=model, chain_type="stuff", prompt=prompt)
    print("Conversational chain created.")
    return chain

# Load vector store and perform query
def query_vector_store(question):
    try:
        print(f"Querying vector store with question: {question}")
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        vector_store = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
        docs = vector_store.similarity_search(question)
        print(f"Number of relevant documents found: {len(docs)}")

        # Check for previous conversation history
        history = session.get("history", "")

        # Generate response using the conversational chain
        chain = get_conversational_chain()
        response = chain({"input_documents": docs, "history": history, "question": question}, return_only_outputs=True)

        # Retrieve and format the response text
        response_text = response.get("output_text", "").strip()
        if not response_text:
            print("No response generated.")
            return "Unable to generate a response. Please try again."
        
        # Update session history
        session["history"] = f"{history}\nQuestion: {question}\nAnswer: {response_text}" if history else f"Question: {question}\nAnswer: {response_text}"
        print(f"Updated session history: {session['history']}")
        
        return response_text

    except Exception as e:
        print(f"Error processing question: {e}")
        return "An error occurred while processing your question. Please try again later."

# Flask routes
@app.route('/')
def index():
    # Clear history when the page is reloaded
    session.pop("history", None)
    return render_template('index.html')

@app.route('/query', methods=['POST'])
def handle_query():
    question = request.json.get('question', '').strip()
    if not question:
        print("No question provided.")
        return jsonify({"response": "No question provided."})

    response_text = query_vector_store(question)
    print(f"Response sent to webpage: {response_text}")
    return jsonify({"response": response_text})

@app.route('/voice-input', methods=['POST'])
def voice_input():
    try:
        recognized_text = get_voice_input()
        if "Error" in recognized_text:
            print(f"Voice input error: {recognized_text}")
            return jsonify({"success": False, "message": recognized_text})
        print(f"Voice input recognized text: {recognized_text}")
        return jsonify({"success": True, "text": recognized_text})
    except Exception as e:
        print(f"Unexpected error in voice input: {e}")
        return jsonify({"success": False, "message": "An unexpected error occurred in voice input processing."})


@app.route('/scrape', methods=['POST'])
def scrape_and_update():
    base_url = request.json.get('base_url', '').strip()
    if not base_url:
        return jsonify({"response": "No base URL provided."})   

    try:
        scrape_website(base_url)
        create_vector_store()
        return jsonify({"response": "Website scraped and vector store updated successfully."})
    except Exception as e:
        print(f"Error in scraping and updating vector store: {e}")
        return jsonify({"response": "Error scraping website or updating vector store."})

if __name__ == "__main__":
    # Backup Firestore database
    backup_firestore()

    # Ensure the vector store is created when starting the server
    create_vector_store()

    # Run the Flask app
    app.run(port=5000)
    