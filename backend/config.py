# --- FILE: backend/config.py ---
import os
from dotenv import load_dotenv
from google.cloud import firestore

# Load environment variables
load_dotenv()

# Get the service account key path
key_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

if not key_path or not os.path.exists(key_path):
    raise FileNotFoundError("Firestore key file not found. Check .env and path.")

# SUPERVISOR'S NOTE: This is the critical fix.
# Your database is NOT named '(default)', it is named 'kabel-aura-database'.
# We must explicitly tell the client which database to connect to.
# My previous "clean" code was missing this 'database' parameter.
db = firestore.Client.from_service_account_json(
    key_path,
    database="kabel-aura-database"  # <--- THIS IS THE FIX
)