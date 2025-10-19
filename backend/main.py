# --- FILE: backend/main.py ---
from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from config import db, firestore # Import firestore for ArrayUnion
from datetime import datetime
import re

app = FastAPI()

# SUPERVISOR'S NOTE: This is the mandatory CORS middleware. It must stay.
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Aura backend live"}

# Endpoint to fetch all jobs for the JobListing page.
@app.get("/api/sprints")
def get_all_sprints():
    sprints_ref = db.collection("sprints").stream()
    sprints = []
    for sprint in sprints_ref:
        sprint_data = sprint.to_dict()
        sprint_data['id'] = sprint.id
        sprints.append(sprint_data)
    return sprints

@app.get("/api/sprints/{sprint_id}")
def get_sprint_details(sprint_id: str):
    sprint_ref = db.collection("sprints").document(sprint_id)
    sprint_doc = sprint_ref.get()
    if sprint_doc.exists:
        sprint_data = sprint_doc.to_dict()
        sprint_data['id'] = sprint_doc.id
        return sprint_data
    else:
        raise HTTPException(status_code=404, detail="Sprint not found")

@app.post("/api/sprints/{sprint_id}/submit")
async def submit_sprint(
    sprint_id: str,
    username: str = Form(...),
    company: str = Form(...),
    title: str = Form(...),
    file: UploadFile = Form(...) # The file is received but will not be stored.
):
    # We still validate that a PDF was sent to make the flow feel real.
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    # SUPERVISOR'S NOTE: Reverting to your original "fake" path generation.
    # No actual upload happens.
    def clean_string(s):
        return re.sub(r"[^\w\- ]", "", s).replace(" ", "_")

    safe_company = clean_string(company)
    safe_title = clean_string(title)
    safe_username = clean_string(username)

    # This is now a fake path, not a real URL.
    fake_file_path = f"submissions/{safe_company}/{safe_title}/{safe_username}.pdf"
    doc_id = f"{sprint_id}_{safe_username}"
    
    submission_data = {
        "username": username,
        "company": company,
        "title": title,
        "sprint_id": sprint_id,
        "file_url": fake_file_path, # Using the fake path
        "submitted_time": datetime.utcnow().isoformat()
    }
    db.collection("submissions").document(doc_id).set(submission_data)

    user_ref = db.collection("users").document(username)
    new_badge = {
        "sprintId": sprint_id,
        "sprintName": title,
        "companyName": company,
        "issuedOn": datetime.utcnow().isoformat()
    }

    user_ref.set({"verified_skills": firestore.ArrayUnion([new_badge])}, merge=True)

    return {
        "message": "Submission successful",
        "file_url": fake_file_path
    }

@app.get("/api/users/{username}/profile")
def get_user_profile(username: str):
    user_ref = db.collection("users").document(username)
    user_doc = user_ref.get()
    if user_doc.exists:
        return user_doc.to_dict()
    else:
        user_data = {
            "name": username.replace("_", " ").title(),
            "email": f"{username}@university.edu",
            "headline": "Aspiring Software Engineer",
            "verified_skills": []
        }
        db.collection("users").document(username).set(user_data)
        return user_data