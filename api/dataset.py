import pandas as pd
import numpy as np

# Returns list of ships
def data_ships(l):
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

def data_containers(length: int):
  df_containers = pd.read_csv('dataset/ph_commodity_trade_statistics_data.csv')
  df_containers.dropna(inplace=True)
  
  df_containers_sample = df_containers.sample(length, random_state=100, ignore_index=True)
  df_containers_sample = df_containers_sample[['trade_usd', 'weight_kg']]
  
  df_containers_sample.rename(columns={'trade_usd' : 'value', 'weight_kg' : 'weight'}, inplace=True)
  df_containers_sample['weight'] = df_containers_sample['weight'].round()

  return df_containers_sample.to_dict('records')
