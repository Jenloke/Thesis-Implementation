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

@app.get("/ships")
def get_ships():
  return [100, 200]

@app.get("/containers")
def get_containers():
  return [[100, 100], [200, 200]]