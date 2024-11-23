from pydantic import BaseModel
from typing import List, Optional
from pprint import pprint

class TranscriptEntry(BaseModel):
    role: str
    text: str

class Transcript(BaseModel):
    transcript: List[TranscriptEntry]
    detail: Optional[str] = None


if __name__ == "__main__":
    data = {
        "transcript": [
            {"role": "kruba", "text": "พอเพียงช่วยด้วยเจ้าไดโนเสาร์จะกินบีมพอเพียงช่วยด้วยเจ้าไดโนเสาร์จะกินบีม"},
            {"role": "kruba", "text": "อย่ามายุ่งกับข้าข้าจะกินเจ้าบีมอย่ากินเจ้าบีมนะ"},
            {"role": "enemy", "text": "โอย โอย โอย พอเพียงช่วยบีมพอด้วยพอเพียงปราบเจ้าไดโนเสาร์ได้แล้ว"},
            {"role": "kruba", "text": "พอเพียงมีเมตตาครูบารักบีมครูบารักไดโนเสาร์พอเพียงช่วยไดโนเสาร์"},
            {"role": "enemy", "text": "ไดโนเสาร์ขอโทษพอเพียงไดโนเสาร์ขอโทษบีมไดโนเสาร์รักพอเพียงไดโนเสาร์รักบีมพอเพียงช่วยบีม"},
            {"role": "moodeng", "text": "พอเพียงช่วยบีมพอเพียงช่วยไดโนเสาร์พอเพียงบีมช่วยผู้ประสบภัยสาธุสาธุ"}
        ],
        "detail": "พอเพียงถูกเจ้าไดโนเสาร์แต่ก็มีครูบาคอยช่วยเหลือ ปล่อยพลังบุญใส่ไดโนเสาร์"
    }
    transcript_instance = Transcript(**data)
    pprint(transcript_instance.transcript)