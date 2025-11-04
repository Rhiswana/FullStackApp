# 🧠 AI Notes App

A fullstack notes web app built with **React (frontend)**, **FastAPI (backend)**, **MySQL (database)**, and **Hugging Face AI** for automatic summarization of text.

---

## 🚀 Features

- ✏️ Create, view, and delete notes  
- 🤖 Summarize notes using Hugging Face AI models  
- 🧩 Full CRUD integration with MySQL  
- 🔄 Real-time updates between React and FastAPI  
- 🌐 CORS-enabled API for frontend communication

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + Axios |
| Backend | FastAPI |
| Database | MySQL |
| AI | Hugging Face Inference API (`facebook/bart-large-cnn`) |
| Environment | Python 3.10+, Node.js 18+ |

---

## 📂 Project Structure

ai-notes-app/
│
├── ai-notes-frontend/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── AddNote.js
│ │ │ ├── ListNotes.js
│ │ │ └── ListNewNotes.js
│ │ ├── services/
│ │ │ └── api.js
│ │ └── App.js
│ └── package.json
│
├── ai-notes-backend/ # FastAPI backend
│ ├── main.py
│ ├── database.py
│ ├── models.py
│ ├── schemas.py
│ ├── .env
│ └── requirements.txt
│
└── README.md

HF_API_KEY=hf_your_huggingface_token_here
✅ Make sure your Hugging Face token has the permission:
“Make calls to Inference Providers” enabled under
👉 Hugging Face → Settings → Access Tokens

Backend setup
cd ai-notes-backend
pip install fastapi uvicorn sqlalchemy pymysql python-dotenv requests pydantic

backend run:uvicorn main:app --reload

Frontend setup
cd ai-notes-frontend
npm install
Frontend run:npm start
Frontend runs at:
👉 http://localhost:3000
🧠 How AI Summarization Works
POST http://localhost:8000/summarize
❤️ Credits

Built using:

FastAPI

React

Hugging Face

MySQL

Video link:https://drive.google.com/file/d/1ZEdL152tnn892gDjlDSDKgPC1g02q6w2/view?usp=drive_link
Author
By
  B Rhiswana Begam
