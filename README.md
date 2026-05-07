# AI-First CRM HCP Interaction Logger

AI-powered CRM dashboard for logging and managing HCP interactions using natural language.

## Tech Stack

Frontend:
- React
- Redux Toolkit
- Axios

Backend:
- FastAPI
- LangGraph
- Groq API

## Features

- AI interaction logging
- Conversational CRM editing
- Sentiment analysis
- AI-generated summaries
- Follow-up recommendations
- Login flow
- Dynamic CRM dashboard

---

# Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:
http://localhost:3000

---

# Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on:
http://127.0.0.1:8000

---

# Environment Variables

Create `.env` inside backend folder:

```env
GROQ_API_KEY=your_api_key
```

#Screenshots
<img width="1920" height="1020" alt="Screenshot 2026-05-07 200615" src="https://github.com/user-attachments/assets/ca696c6f-1f47-43e9-8805-a211678d7e18" />

<img width="1920" height="1020" alt="Screenshot 2026-05-07 200708" src="https://github.com/user-attachments/assets/7c80ce02-9a94-4930-b4da-5f6b9874fcb2" />


