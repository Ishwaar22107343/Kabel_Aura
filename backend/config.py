# --- FILE: backend/config.py (FINAL DEPLOYMENT VERSION) ---
import os
import json
from google.oauth2 import service_account
from google.cloud import firestore

# SUPERVISOR'S NOTE: This is the deployment-ready logic.
# It checks for the cloud environment variable first.
# If it's not in the cloud, it falls back to your local file.

# Check if running in Google Cloud Run
if "GOOGLE_APPLICATION_CREDENTIALS_JSON" in os.environ:
    # In the cloud, credentials are a JSON string in an env var
    creds_json_str = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON")
    creds_info = json.loads(creds_json_str)
    credentials = service_account.Credentials.from_service_account_info(creds_info)
else:
    # Locally, we use the file path from .env
    from dotenv import load_dotenv
    load_dotenv()
    key_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    if not key_path or not os.path.exists(key_path):
        raise FileNotFoundError("LOCAL: Firestore key file not found. Check .env and path.")
    credentials = service_account.Credentials.from_service_account_file(key_path)

# Initialize Firestore with the credentials and correct database name
db = firestore.Client(
    credentials=credentials,
    database="kabel-aura-database"
)