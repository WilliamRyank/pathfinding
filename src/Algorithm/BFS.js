import $ from 'jquery';

import { getStartSquare, addVisited } from './common';
import { GOAL_SQUARE, WALL_SQUARE } from "../Grid/Square/SquareType";

const bfs = (ROW_SIZE, COL_SIZE) => {
	let counter = 0;
	const queue = [];
	const visited = [];
	queue.push(getStartSquare());

	while (queue.length !== 0) {
		counter++; 

    const currSquare = queue.shift();
		const row = currSquare.row;
		const col = currSquare.col;
    const id = row * COL_SIZE + col;

		if ($('#' + id).attr('class') === GOAL_SQUARE) {
			break;
		}
		
		addVisited(id ,counter);
    visited.push(id);

		const neighbour = [
			{row: row - 1, col: col},
			{row: row, col: col - 1},
			{row: row + 1, col: col},
			{row: row, col: col + 1}
		];

		for (let curr of neighbour) {
			let currId = curr.row * COL_SIZE + curr.col;
      if (visited.includes(currId)
          || ($('#' + currId).attr('class') === WALL_SQUARE) 
					|| (curr.row < 0 || curr.row >= ROW_SIZE || curr.col < 0 || curr.col >= COL_SIZE)) {
                continue;
			}
			else {
        queue.push(curr);
        visited.push(currId);
			}
		}
	}
	return [Math.floor(counter / 10) * 50, visited];
};

export default bfs;