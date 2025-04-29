import pandas as pd
import numpy as np

# Returns list of ships
def data_ships():
  df_ships = pd.read_csv('dataset/Ship_Performance_Dataset.csv')
  df_ships.dropna(inplace=True)
  
  # new_df_ships = df_ships.loc[(df_ships['Ship_Type'] == 'Container Ship') & (df_ships['Route_Type'] == 'Short-haul')]
  new_df_ships = df_ships.loc[(df_ships['Ship_Type'] == 'Container Ship')]
  
  n = np.random.randint(2,5)
  ships = new_df_ships[['Ship_Type', 'Cargo_Weight_tons', 'Operational_Cost_USD']].sample(n=n)
  
  ships['Cargo_Weight_tons'] = ships['Cargo_Weight_tons'].astype(int)
  
  ships['Operational_Cost_USD'] = ships['Operational_Cost_USD'].astype(int)

  return ships.to_dict('records')

def data_containers(length: int = 200):
  df_containers = pd.read_csv('dataset/ph_commodity_trade_statistics_data.csv')
  df_containers.dropna(inplace=True)

  # df_containers_sample = df_containers.sample(length, random_state=100, ignore_index=True)
  df_containers_sample = df_containers.sample(length, ignore_index=True)
  df_containers_sample = df_containers_sample[['trade_usd', 'weight_kg']]
  
  df_containers_sample['weight_kg'] = df_containers_sample['weight_kg'].map(lambda x: convert(x)).astype(int)
  
  df_containers_sample.rename(columns={'trade_usd' : 'value', 'weight_kg' : 'weight'}, inplace=True)
  df_containers_sample['weight'] = df_containers_sample['weight'].round()

  return df_containers_sample.to_dict('records')

def convert(x):
  weight = x / 1000
  if (weight < 1):
    return 1
  return weight
