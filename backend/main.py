from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from llm.llm import KrubaMoodengLLM
import os
from dotenv import load_dotenv
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Parameters(BaseModel):
    kruba: str
    mudeng: str
    enemy: str
    story_extend: str

@app.post("/invoke/")
async def invoke_llm(parameters: Parameters):
    try:
        llm = KrubaMoodengLLM(
            base_url="https://api.opentyphoon.ai/v1",
            model="typhoon-v1.5x-70b-instruct",
            api_key=os.getenv("TYPHOON_CHAT_KEY")
        )
        response = llm.invoke((parameters.kruba, parameters.mudeng, parameters.enemy, parameters.story_extend))
        return {"response": response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)