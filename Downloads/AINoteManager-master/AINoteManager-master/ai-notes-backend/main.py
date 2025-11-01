from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Note
from schemas import NoteCreate, NoteOut
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import requests


load_dotenv()


Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.get("/")
def root():
    return {"message": "FastAPI + MySQL + Hugging Face AI is running!"}


@app.get("/notes", response_model=list[NoteOut])
def get_notes(db: Session = Depends(get_db)):
    return db.query(Note).all()


@app.post("/notes", response_model=NoteOut)
def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    new_note = Note(text=note.text)
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note


@app.delete("/notes/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(note)
    db.commit()
    return {"message": "Note deleted successfully"}


# ---------------------------
# AI Summarization Endpoint
# ---------------------------

HF_API_KEY = os.getenv("HF_API_KEY")
HF_MODEL = "facebook/bart-large-cnn"  # you can change this model if needed

class TextInput(BaseModel):
    text: str


@app.post("/summarize")
def summarize_text(inp: TextInput):
    if not inp.text.strip():
        raise HTTPException(status_code=400, detail="Text input is empty")

    if not HF_API_KEY:
        raise HTTPException(status_code=500, detail="Missing HF_API_KEY in .env")

    url = f"https://api-inference.huggingface.co/models/{HF_MODEL}"
    headers = {"Authorization": f"Bearer {HF_API_KEY}"}
    payload = {"inputs": inp.text}

    try:
        # 🔧 SSL verification disabled to fix CERTIFICATE_VERIFY_FAILED
        response = requests.post(url, headers=headers, json=payload, timeout=60, verify=False)
        print("HF status:", response.status_code)
        print("HF body:", response.text)
    except Exception as e:
        print("❌ Error calling Hugging Face:", e)
        raise HTTPException(status_code=502, detail=str(e))

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail={"error": "Hugging Face API failed", "body": response.text},
        )

    data = response.json()
    if isinstance(data, list) and len(data) > 0 and "summary_text" in data[0]:
        summary = data[0]["summary_text"]
    else:
        summary = str(data)

    return {"summary": summary}
