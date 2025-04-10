from fastapi import FastAPI
from typing import List
from pydantic import BaseModel

from dataset import data_ships
from dataset import data_containers

from algo import hsa
from algo import pso
from algo import epso

class Problem(BaseModel):
  # weight: List[int]
  # value: List[int]
  length: int
  capacity: int
  algo: str

app = FastAPI()

# Solve Route
@app.post("/") 
def read_root(data: Problem):
  # from input app: algo, capacity, length  

  problem = data_containers(data.length)
  # print(problem)
  if data.algo == 'hsa':
    solution = hsa(problem, data.capacity)
  elif data.algo == 'pso':
    solution = pso(problem, data.capacity)
  elif data.algo == 'epso':
    solution = epso(problem, data.capacity)
  
  return {'problem': problem, 'solution': solution}
  
  # returns
  # gathered data
  # solution
  # container value/profit
  # total weight 
  # return data

@app.get("/ships")
def get_ships():
  return data_ships()

# @app.get("/containers")
# def get_containers():
#   return data_containers()