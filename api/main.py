from fastapi import FastAPI
from typing import List
from pydantic import BaseModel

from dataset import data_ships
from dataset import data_containers

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
  # print(data)
  
  # from input app 
  # algo
  # ship capacity
  # number of containers / problem length
  
  # from within api
  # problem - sample from containers list usi\
  
  # returns
  # gathered data
  # solution
  # container value/profit
  # total weight
  
  return data

@app.get("/ships")
def get_ships():
  return data_ships()

@app.get("/containers")
def get_containers():
  return data_containers()