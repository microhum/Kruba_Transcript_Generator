
from langchain_openai.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from pydantic import ValidationError
import os
from pprint import pprint
from llm.basemodel import Transcript
from llm.prompt import system_prompt, user_prompt, json_example, stories
from dotenv import load_dotenv

class KrubaMoodengLLM:
    def __init__(self, base_url, model, api_key):
        self.client = ChatOpenAI(
            base_url=base_url,
            model=model,
            api_key=api_key,
            max_tokens=1000,
        )
        self.system_prompt = system_prompt
        self.user_prompt = user_prompt
        self.json_example = json_example
        self.current_data = None
        self.parameters = None

    def create_prompt(self):
        user_prompt = HumanMessagePromptTemplate.from_template(self.user_prompt)
        system_prompt = SystemMessagePromptTemplate.from_template(self.system_prompt)
        prompt = ChatPromptTemplate.from_messages([system_prompt, user_prompt])
        return prompt

    def gather_data(self, user_prompt):
        try:
            response = self.client(messages=user_prompt)
            json_content = self.extract_json_content(response.content)
            pprint(f"JSON after dumps:\n{json_content}\n")
            data = Transcript.model_validate_json(json_content)
            data = data.model_dump()
            return data
        
        except ValidationError as e:
            print("Validation Error Occured: ", e)
            return {"result": response, "error": "Failed to extract valid EHR data. Please try again."}

    def invoke(self, parameters):
        prompt = self.create_prompt()
        kruba, moodeng, enemy, story_extend = parameters
        prompt = prompt.format_messages(kruba=kruba, moodeng=moodeng, enemy=enemy, story_extend = story_extend, stories = stories, json_example=self.json_example)
        self.current_data = self.gather_data(prompt)
        return self.current_data

    def extract_json_content(self, content):
       try:
           # Remove newlines and carriage returns
           content = content.replace('\n', '').replace('\r', '')
           # Find the start and end of the JSON object
           start = content.index('{')
           end = content.rindex('}') + 1
           json_str = content[start:end]
           # Ensure keys are enclosed in double quotes
           json_str = json_str.replace("'", '"')
           # Correct missing quotes around keys
           import re
           json_str = re.sub(r'(\w+):', r'"\1":', json_str)
           # Handle None values
           json_str = json_str.replace('None', 'null')
           return json_str

       except ValueError:
           print("JSON Parsing Error Occurred: ", content)
           print("No valid JSON found in response")
           return None
        
# testing
if __name__ == "__main__":
    load_dotenv()
    parameters = ("ครูบา", "หมูเด้ง", "ปีศาจร้ายน่ากลัว", "ตามหา infinity stone")
    llm = KrubaMoodengLLM(
        base_url="https://api.opentyphoon.ai/v1",
        model="typhoon-v1.5x-70b-instruct",
        api_key=os.getenv("TYPHOON_CHAT_KEY")
    )
    response = llm.invoke(parameters=parameters)
    pprint(response)