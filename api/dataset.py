import pandas as pd
import numpy as np

# Returns list of ships
def data_ships():
  df_ships = pd.read_csv('dataset/Ship_Performance_Dataset.csv')
  df_ships.dropna(inplace=True)
  # df_ships.info()

  return [
    {'index': 0, 'max_weight': 1000},
    {'index': 1, 'max_weight': 1000},
    {'index': 2, 'max_weight': 1000},
    {'index': 3, 'max_weight': 1000},
    {'index': 4, 'max_weight': 1000},
  ]

def data_containers():
  return [
    {'index': 0, 'value': 100, 'weight': 100},
    {'index': 1, 'value': 200, 'weight': 200},
    {'index': 2, 'value': 300, 'weight': 300},
    {'index': 3, 'value': 400, 'weight': 400},
  ]