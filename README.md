# Pathfinding Visualizer

I built this pathfinding visualizer to try to make use the algorithms that I learnt in my university for practical purpose, and I think visualizing such algorithm is cool. The algorithms that I implemented includes:

<strong>A* Search</strong>: pathfinding algorithm which make use of heuristics in order for the search to explore more "promising" nodes that is nearer to the goal node. Will result in optimal shortest path

**Greedy Best-first Search** : similar to A* Search, however this algorithm does not take into order the actual cost of reaching a certain node, only the heuristic cost, which might lead to a non optimal solution.

**Bi-Directional Search Algorithm**: search algorithm that start from both start and goal node simultaneously and terminates once the two paths intersect, this has better time complexity as compared to single search algorithm. I implemented Breadth-first Search Bi-Directional search algorithm. It is optimal if both search algorithm used are BFS.

**Breath-first Search**: search algorithm that explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. Shortest path is guaranteed in non weighted graph.

**Depth-first Search**: search algorithm that explores as far as possible along each branch before backtracking. Shortest path is not guaranteed.
