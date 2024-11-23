from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from llm.llm import KrubaMudengLLM
import os
from dotenv import load_dotenv
import uvicorn

load_dotenv()

app = FastAPI()

class Parameters(BaseModel):
    kruba: str
    mudeng: str
    enemy: str

@app.post("/invoke/")
async def invoke_llm(parameters: Parameters):
    try:
        llm = KrubaMudengLLM(
            base_url="https://api.opentyphoon.ai/v1",
            model="typhoon-v1.5x-70b-instruct",
            api_key=os.getenv("TYPHOON_CHAT_KEY")
        )
        response = llm.invoke((parameters.kruba, parameters.mudeng, parameters.enemy))
        return {"response": response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)