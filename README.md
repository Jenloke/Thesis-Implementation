# Meta-logistics: a Thesis Implementation

#### Thesis Link: [Enhancing a Metaheuristic Optimization Algorithm for the 0/1 Knapsack Problem](https://github.com/Jenloke/Enhance-MetaHeuristic-Algo)

### 💡 Implementation Description

A mock simulation using the enhanced algorithm as it represents the 0/1 Knapsack Problem, the thesis' result where ships and containers at ports are correlated to produced the most profitable voyage. Upon the selection of the ship, it is to calculate the most optimal containers it should carry through the use of the algorithm. The ship's _Max Cargo Weight or Capacity_ and _Operational Cost_ as well as the container's trade value and weight are the metrics used to represent the 0/1 Knapsack Problem.

### App Screenshot

![Implementation Screenshot](/md_files/screenshot-app.png)

### 💻 Thesis Description

Metaheuristic algorithms (natured inspired algorithms) for the 0/1 Knapsack Problem, a NP hard problem where the goal is to select the most optimal items that satisfies the given knapsack weight from a collection of items based on weight profit ratio, measuring their performance and enhancing the most optimal one based on results.

### 📊 Datasets

- 🚢 Ships Performance Clustering Dataset: Samepling only 5 ships across app runs for variations. [Dataset Link](https://www.kaggle.com/datasets/jeleeladekunlefijabi/ship-performance-clustering-dataset)

- ⚖ Global Commodity Trade Statistics: Sampling only containers that belong only to the Philippines to minimize sampled data for the mock implementation. [Dataset Link](https://www.kaggle.com/datasets/unitednations/global-commodity-trade-statistics)

### 🛠 Technologies Used

#### Frontend

- JavaScript
- React
- Vite
- Axios
- Tailwindcss

#### Backend

- Python
- FastAPI
- NumPy
- Pandas

### 🏃 Running the REPO

1. Clone the repository
2. Navigate to the _api_ folder to create a _Python Env_ to install the backend technologies
3. Run _main.py_, to startup the API
4. Navigate to the _app_ folder and run `npm install` or `npm i` to install frontend tecchnologies
5. Run `npm run dev` to start the frontend of the app
