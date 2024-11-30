import os
import pandas as pd
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

# Load environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

app = Flask(__name__)

# Path to Excel files
EXCEL_FILES = [r"C:\\Users\\athar\\Downloads\\Courses_22-11-24-01-51-31.xlsx"]  # Replace with your actual Excel file paths

# Load Excel data and create text chunks
def get_excel_text_chunks():
    print("Loading Excel data and creating text chunks...")
    text = ""
    for file in EXCEL_FILES:
        print(f"Processing file: {file}")
        df = pd.read_excel(file)
        for _, row in df.iterrows():
            text += " ".join([str(cell) for cell in row if pd.notna(cell)]) + "\n"
    
    # Split text into chunks
    print("Splitting text into chunks...")
    splitter = RecursiveCharacterTextSplitter(chunk_size=3000, chunk_overlap=500)
    chunks = splitter.split_text(text)
    print(f"Number of chunks created: {len(chunks)}")
    return chunks

# Create vector store from Excel chunks
def create_vector_store():
    try:
        print("Creating vector store...")
        chunks = get_excel_text_chunks()
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

if __name__ == "__main__":
    # Ensure the vector store is created when starting the server
    create_vector_store()
    # Run the Flask app
    app.run(port=5000)
