import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

if api_key:
    print(f"Google API Key retrieved: {api_key[:4]}...")  # Print only the first few characters for security
else:
    print("Google API Key not found.")