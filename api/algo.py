import numpy as np

# def hsa(problem, max_weight):
# 	# Problem Parameters
# 	num_items = len(problem)
# 	values = np.array([x['value'] for x in problem]) # Values of items
# 	weights = np.array([x['weight'] if x['weight'] > 0 else 1 for x in problem]) # Weights of items

# 	# HSA Parameters
# 	HMS = 20  # Harmony Memory Size
# 	max_iterations = 100
# 	HMCR = 0.8 # Harmony Memory Consideration Rate
# 	PAR = 0.2 # Pitch Adjustment Rate
# 	PAR_min = PAR
# 	PAR_max = PAR + 0.6

# 	def repair_solution(solution):
# 	# Ensures solution is within the weight constraint.
# 		while np.dot(solution, weights) > max_weight:
# 			idx = np.where(solution == 1)[0]
# 			if len(idx) == 0:
# 				break
# 			worst_idx = idx[np.argmin(values[idx] / weights[idx])]
# 			solution[worst_idx] = 0
# 		return solution

# 	# Generate Initial Harmony Memory (Random Feasible Solutions)
# 	def generate_solution():
# 		solution = np.random.randint(0, 2, num_items)
# 		repair_solution(solution)
# 		return solution

# 	harmony_memory = [generate_solution() for _ in range(HMS)]
# 	harmony_values = [np.dot(solution, values) for solution in harmony_memory]

# 	# Harmony Search Optimization Loop
# 	for itr in range(max_iterations):
# 		# Step 1: Improvise New Harmony
# 		new_harmony = np.zeros(num_items, dtype=int)
# 		for i in range(num_items):
# 			if np.random.rand() < HMCR:  # Memory consideration
# 				new_harmony[i] = np.random.choice([hm[i] for hm in harmony_memory])
# 			else:  # Random selection
# 				new_harmony[i] = np.random.randint(0, 2)

# 			PAR = PAR_min + ((PAR_max - PAR_min) / max_iterations) * (itr/max_iterations)
# 			# Pitch Adjustment (Small Modification)
# 			if np.random.rand() < PAR:
# 				new_harmony[i] = 1 - new_harmony[i]  # Flip bit

# 		# Step 2: Ensure Feasibility
# 		repair_solution(new_harmony)

# 		# Step 3: Evaluate and Update Harmony Memory
# 		new_value = np.dot(new_harmony, values)
# 		min_idx = np.argmin(harmony_values)
# 		if new_value > harmony_values[min_idx]:  # Replace the worst solution
# 			harmony_memory[min_idx] = new_harmony
# 			harmony_values[min_idx] = new_value

# 	# Best Solution Found
# 	best_index = np.argmax(harmony_values)
# 	best_solution = harmony_memory[best_index]
# 	best_value = harmony_values[best_index]

# 	return {
# 		'solValue': best_value.item(),
# 		# 'solWeight': np.dot(harmony_memory[best_index], weights).item(),
# 		'solWeight': np.dot(best_solution, weights).item(),
# 		'solArray': best_solution.tolist(),
# 	}


# def pso(problem, max_weight):
# 	# Problem Parameters
# 	n_items = len(problem)  # Number of items
# 	values = np.array([x['value'] for x in problem]) # Values of items
# 	weights = np.array([x['weight'] if x['weight'] > 0 else 1 for x in problem]) # Weights of items

# 	# PSO Parameters
# 	n_particles = 20
# 	max_iterations = 100
# 	w = 0.7  # Inertia weight
# 	c1, c2 = 1.5, 1.5  # Acceleration coefficients

# 	# Initialize particles
# 	X = np.random.randint(0, 2, (n_particles, n_items)) # Position matrix
# 	V = np.random.uniform(-1, 1, (n_particles, n_items)) # Velocity matrix
	
# 	pBest = X.copy()
# 	pBest_scores = np.array([0 if np.dot(x, weights) > max_weight else np.dot(x, values) for x in X])
	
# 	gBest = pBest[np.argmax(pBest_scores)].copy()
# 	gBest_score = np.max(pBest_scores)

# 	# Velocity to Probability Mapping:
# 	# In continuous PSO, particle velocities represent the step size and direction of movement. In BPSO, however, these velocities need to be converted to probabilities for binary decisions. This is achieved using the sigmoid function:
# 	def sigmoid(x):
# 		return 1 / (1 + np.exp(-x))
	
# 	def repair_solution(solution):
# 		# Ensures solution is within the weight constraint.
# 		while np.dot(solution, weights) > max_weight:
# 			idx = np.where(solution == 1)[0]
# 			if len(idx) == 0:
# 				break
# 			worst_idx = idx[np.argmin(values[idx] / weights[idx])]
# 			solution[worst_idx] = 0
# 		return solution

# 	# PSO Loop
# 	for itr in range(max_iterations):
# 		for i in range(n_particles):
# 			# Update velocity
# 			r1, r2 = np.random.rand(n_items), np.random.rand(n_items)
# 			V[i] = w * V[i] + c1 * r1 * (pBest[i] - X[i]) + c2 * r2 * (gBest - X[i])
			
# 			# Update position using sigmoid function
# 			X[i] = (sigmoid(V[i]) > np.random.rand(n_items)).astype(int)
# 			X[i] = repair_solution(X[i])
			
# 			# Evaluate new solution
# 			fitness = np.dot(X[i], values) if np.dot(X[i], weights) <= max_weight else 0
			
# 			# Update personal best
# 			if fitness > pBest_scores[i]:
# 				pBest[i] = X[i].copy()
# 				pBest_scores[i] = fitness

# 		# Update global best
# 		if np.max(pBest_scores) > gBest_score:
# 			gBest = pBest[np.argmax(pBest_scores)].copy()
# 			gBest_score = np.max(pBest_scores)

# 	# Output best solution
# 	# print("Best value obtained:", gBest_score)
# 	# print("Best selection of items:", gBest)  
	
# 	return {
# 		'solValue': gBest_score.item(),
# 		'solWeight': np.dot(gBest, weights).item(),
# 		'solArray': gBest.tolist(),
# 	}


def epso(problem, max_weight):
	# Problem Parameters
	n_items = len(problem)  # Number of items
	values = np.array([x['value'] for x in problem]) # Values of items
	weights = np.array([x['weight'] if x['weight'] > 0 else 1 for x in problem]) # Weights of items

	# PSO Parameters
	n_particles = 20
	max_iterations = 100
	w = 0.7  # Inertia weight
	c1, c2 = 1.5, 1.5  # Acceleration coefficients

	def repair_solution(solution):
		# Ensures solution is within the weight constraint.
		while np.dot(solution, weights) > max_weight:
			idx = np.where(solution == 1)[0]
			if len(idx) == 0:
				break
			worst_idx = idx[np.argmin(values[idx] / weights[idx])]
			solution[worst_idx] = 0
		return solution

	def greedy_solution(weights, values, capacity):
		# Generates a greedy solution based on value-to-weight ratio
		num_items = len(weights)
		
		# Calculate value-to-weight ratios
		ratios = [(i, values[i] / weights[i]) for i in range(num_items)]
		# Sort by ratio in descending order
		ratios.sort(key=lambda x: x[1], reverse=True)
		
		solution = np.zeros(num_items)
		total_weight = 0
		
		for idx, _ in ratios:
			if total_weight + weights[idx] <= capacity:
				solution[idx] = 1
				total_weight += weights[idx]
		
		return solution
	
	def initialize_particles(weights, values, capacity, n_particles, n_items):
		#Initialize particles using greedy solution with random perturbations
		particles = np.zeros((n_particles, n_items))
		
		# Start with greedy solution
		greedy = greedy_solution(weights, values, capacity)
  
		for i in range(n_particles):
				if i == 0:
					# Keep one pure greedy solution
					particles[i] = greedy
				else:
					# Create perturbations of greedy solution
					particles[i] = greedy.copy()
					
					# Randomly flip some bits (with higher probability for 0s)
					for j in range(n_items):
						if particles[i][j] == 1 and np.random.rand() < 0.2:
							particles[i][j] = 0
						elif particles[i][j] == 0 and np.random.rand() < 0.25:
							particles[i][j] = 1
					
					# Repair if needed
					particles[i] = repair_solution(particles[i])

		return particles

	# Initialize particles
	X = initialize_particles(weights, values, max_weight, n_particles, n_items) # Position matrix
	V = np.random.uniform(-1, 1, (n_particles, n_items)) # Velocity matrix
	
	pBest = X.copy()
	pBest_scores = np.array([0 if np.dot(x, weights) > max_weight else np.dot(x, values) for x in X])
	
	gBest = pBest[np.argmax(pBest_scores)].copy()
	gBest_score = np.max(pBest_scores)

	# Velocity to Probability Mapping:
	# In continuous PSO, particle velocities represent the step size and direction of movement. In BPSO, however, these velocities need to be converted to probabilities for binary decisions. This is achieved using the sigmoid function:
	def sigmoid(x):
		return 1 / (1 + np.exp(-x))

	# PSO Loop
	for itr in range(max_iterations):
		for i in range(n_particles):
			# Update velocity
			r1, r2 = np.random.rand(n_items), np.random.rand(n_items)
			V[i] = w * V[i] + c1 * r1 * (pBest[i] - X[i]) + c2 * r2 * (gBest - X[i])
			
			# Update position using sigmoid function
			X[i] = (sigmoid(V[i]) > np.random.rand(n_items)).astype(int)
			X[i] = repair_solution(X[i])
			
			# Evaluate new solution
			fitness = np.dot(X[i], values) if np.dot(X[i], weights) <= max_weight else 0
			
			# Update personal best
			if fitness > pBest_scores[i]:
				pBest[i] = X[i].copy()
				pBest_scores[i] = fitness

		# Update global best
		if np.max(pBest_scores) > gBest_score:
			gBest = pBest[np.argmax(pBest_scores)].copy()
			gBest_score = np.max(pBest_scores)

	# Output best solution
	# print("Best value obtained:", gBest_score)
	# print("Best selection of items:", gBest)  
	
	return {
		'solValue': gBest_score.item(),
		'solWeight': np.dot(gBest, weights).item(),
		'solArray': gBest.tolist(),
	}