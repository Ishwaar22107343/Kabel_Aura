from fastapi import FastAPI
from config import db

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Aura backend live"}

@app.get("/test-db")
def test_db():
    # Write a dummy record
    test_ref = db.collection("test").document("ping")
    test_ref.set({"status": "connected", "source": "FastAPI"})

    # Read it back
    doc = test_ref.get()
    return {"result": doc.to_dict()}
