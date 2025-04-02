from fastapi import FastAPI
from typing import List
from pydantic import BaseModel

class Problem(BaseModel):
  weight: List[int]
  value: List[int]
  capacity: int
  algo: str

app = FastAPI()

@app.post("/")
def read_root(data: Problem):
  # insert algo
  return sum(data.value)