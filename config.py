import os
from dotenv import load_dotenv
from google.cloud import firestore

# Load environment variables
load_dotenv()

# Get the service account key path
key_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

# Initialize Firestore
if not key_path or not os.path.exists(key_path):
    raise FileNotFoundError("❌ Firestore key file not found. Check .env and aura-key.json path.")

db = firestore.Client.from_service_account_json(key_path, database="kabel-aura-database")
