import $ from 'jquery';

import { getStartSquare, addVisited } from './common';
import Node from '../Node/Node';
import { GOAL_SQUARE, WALL_SQUARE, PATH_SQUARE } from '../components/Grid/Square/SquareType';

const bfs = (ROW_SIZE, COL_SIZE) => {
	let counter = 0;
  const queue = [];
  const queueId = []
  const visited = [];
  let path = [];
  queue.push(getStartSquare(COL_SIZE));
  queueId.push(getStartSquare(COL_SIZE).getId());

	while (queue.length !== 0) {
    counter++;

    const currNode = queue.shift();
		const row = currNode.getRow();
		const col = currNode.getCol();
    const id = row * COL_SIZE + col;
    
    if (visited.includes(id)) {
      continue;
    }  

		if ($('#' + id).attr('class') === GOAL_SQUARE) {
      let temp = [];
      let tempCount = counter;
      let addNode = currNode.getParent();

      while (addNode !== null) {
        temp.unshift(addNode);
        addNode = addNode.getParent();
      }

      temp.shift();
      path = temp.slice();

      temp.forEach((node, i) => {
        const id = node.getRow() * COL_SIZE + node.getCol();
        setTimeout(() => {
          $('#' + id).removeClass();
          $('#' + id).addClass(PATH_SQUARE);
        }, Math.floor(tempCount / 10) * 100 + i * 50);
      });

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
          || queueId.includes(currId)
          || ($('#' + currId).attr('class') === WALL_SQUARE) 
					|| (curr.row < 0 || curr.row >= ROW_SIZE || curr.col < 0 || curr.col >= COL_SIZE)) {
                continue;
			}
			else {
        const newNode = new Node(curr.row, curr.col, currId, currNode, 0, 0);
        queue.push(newNode);
        queueId.push(currId);
			}
		}
	}
	return [Math.floor(counter / 10) * 100 + path.length * 50, visited, path];
};

export default bfs;