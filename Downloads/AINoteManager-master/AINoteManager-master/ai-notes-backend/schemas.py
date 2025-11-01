from pydantic import BaseModel

class NoteCreate(BaseModel):
    text: str

class NoteOut(BaseModel):
    id: int
    text: str

    class Config:
        from_attributes = True  # (for Pydantic v2)
