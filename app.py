import os
import pandas as pd
import json
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
from voice import get_voice_input  # Import the function from voice.py

# Load environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

app = Flask(__name__)

# Paths
EXCEL_FILE = r"C:\\Users\\athar\\Downloads\\Courses_22-11-24-01-51-31.xlsx"  # Replace with your Excel file path
PDF_FILE = r"C:\\Users\\athar\\Videos\\SIH Project Final\\Colleges1.pdf"       # Replace with your PDF file path
JSON_BACKUP_FILE = "firestore_backup.json"                                    # JSON file created from Firestore backup

# Run the Firestore backup program
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
        if isinstance(doc_data, dict):
            return {key: serialize_document(value) for key, value in doc_data.items()}
        elif isinstance(doc_data, list):
            return [serialize_document(value) for value in doc_data]
        elif isinstance(doc_data, firestore.SERVER_TIMESTAMP.__class__):
            return doc_data.isoformat()
        elif isinstance(doc_data, Timestamp):
            return doc_data.ToDatetime().isoformat()
        elif hasattr(doc_data, 'isoformat'):
            return doc_data.isoformat()
        return doc_data

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

# Load text from Excel, PDF, and JSON files
def get_text_chunks():
    print("Loading data and creating text chunks...")
    text = ""

    # Process Excel file
    print(f"Processing Excel file: {EXCEL_FILE}")
    df = pd.read_excel(EXCEL_FILE)
    for _, row in df.iterrows():
        text += " ".join([str(cell) for cell in row if pd.notna(cell)]) + "\n"

    # Process PDF file
    print(f"Processing PDF file: {PDF_FILE}")
    reader = PdfReader(PDF_FILE)
    for page in reader.pages:
        text += page.extract_text()

    # Process JSON file
    print(f"Processing JSON file: {JSON_BACKUP_FILE}")
    with open(JSON_BACKUP_FILE, 'r') as json_file:
        json_data = json.load(json_file)
        for collection, documents in json_data.items():
            for doc_id, doc_data in documents.items():
                text += f"Collection: {collection}, Document: {doc_id}, Data: {doc_data}\n"

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

# Load vector store and perform query
def query_vector_store(question):
    try:
        print(f"Querying vector store with question: {question}")
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        vector_store = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
        docs = vector_store.similarity_search(question)
        print(f"Number of relevant documents found: {len(docs)}")
        chain = get_conversational_chain()
        response = chain({"input_documents": docs, "question": question}, return_only_outputs=True)
        print(f"Response generated: {response.get('output_text', 'No response generated.')}")
        return response.get("output_text", "No response generated.")
    except Exception as e:
        print(f"Error processing question: {e}")
        return "Error occurred while processing your question."

# Create a conversational chain
def get_conversational_chain():
    print("Creating conversational chain...")
    prompt_template = """
    Answer the question as detailed as possible from the provided context. If the answer is not in
    the provided context, just say, "Answer is not available in the context." Don't provide a wrong answer.
    
    Context:\n{context}?\n
    Question:\n{question}\n
    Answer:
    """
    model = ChatGoogleGenerativeAI(model="gemini-1.5-pro", client=genai, temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(llm=model, chain_type="stuff", prompt=prompt)
    print("Conversational chain created.")
    return chain

# Route to serve the index.html page
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle query submissions
@app.route('/query', methods=['POST'])
def handle_query():
    question = request.json.get('question', '')
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
            return jsonify({"success": False, "message": recognized_text})
        return jsonify({"success": True, "text": recognized_text})
    except Exception as e:
        print(f"Error in voice input: {e}")
        return jsonify({"success": False, "message": "Error processing voice input."})

if __name__ == "__main__":
    # Backup Firestore database
    backup_firestore()

    # Ensure the vector store is created when starting the server
    create_vector_store()

    # Run the Flask app
    app.run(port=5000)
