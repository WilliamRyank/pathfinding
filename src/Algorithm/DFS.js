import $ from 'jquery';

import { START_SQUARE, GOAL_SQUARE, VISITED_SQUARE, WALL_SQUARE, UNVISITED_SQUARE } from "../Grid/Square/SquareType";

const dfs = (ROW_SIZE, COL_SIZE) => {
	let counter = 0;
	const stack = [];
	const visited = [];
	stack.push(getStartSquare());

	while (stack.length !== 0) {
		counter++; 

		const currSquare = stack.pop();
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
				stack.push(curr);
			}
		}
	}
	return [counter * 20, visited];
};

const getStartSquare = () => {
	const startSquare = $('.' + START_SQUARE);
	
	return {
		row: Math.floor(startSquare.attr('id') / 40),
		col: startSquare.attr('id') % 40
	};
};

const addVisited = (id, counter) => {
	setTimeout(() => {
		$('#' + id).removeClass(UNVISITED_SQUARE);
		$('#' + id).addClass(VISITED_SQUARE);
	}, counter * 20);
};

export default dfs;