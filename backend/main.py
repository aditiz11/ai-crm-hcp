from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from agent.graph import process_interaction

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GLOBAL MEMORY
current_interaction = {
    "hcp_name": "",
    "date": "",
    "time": "",
    "interaction_type": "",
    "attendees": "",
    "discussion": "",
    "sentiment": "",
    "product": "",
    "summary": "",
    "follow_up": "",
    "brochure_shared": False,
    "samples_distributed": ""
}

class ChatRequest(BaseModel):
    message: str
    current_data: dict = {}


@app.post("/agent/chat")
def chat(req: ChatRequest):

    global current_interaction

    ai_result = process_interaction(
        req.message,
        req.current_data
    )

    # MERGE ONLY NON EMPTY VALUES
    for key, value in ai_result.items():

        if value not in ["", None, [], {}]:

            current_interaction[key] = value

    return {
        "reply": "Interaction updated successfully.",
        "data": current_interaction
    }