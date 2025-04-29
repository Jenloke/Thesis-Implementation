from fastapi import FastAPI
from typing import List
from pydantic import BaseModel

from dataset import data_ships
from dataset import data_containers

from algo import epso

from datetime import datetime

class Problem(BaseModel):
  capacity: int
  problem: List[dict]

class Containers(BaseModel):
  length: int

app = FastAPI()

# Solve Route
@app.post("/") 
def read_root(data: Problem):
  start_time = datetime.now()

  solution = epso(data.problem, data.capacity)

  end_time = datetime.now()
  runTime = (end_time - start_time).total_seconds()
  
  return {'problem': data.problem, 'solution': solution, 'runtime': runTime}

@app.get("/ships")
def get_ships():
  return data_ships()

@app.post("/containers")
def get_containers(data: Containers):
  return data_containers(data.length)