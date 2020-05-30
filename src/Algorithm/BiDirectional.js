import $ from 'jquery';

import { getStartSquare, getGoalSquare, addVisited } from './common';
import Node from '../Node/Node';
import { WALL_SQUARE, PATH_SQUARE } from '../components/Grid/Square/SquareType';

const biDirectional = (ROW_SIZE, COL_SIZE) => {
	let counter = 0;
  const queueStart = [];
  const queueGoal = [];
  const queueStartId = [];
  const queueGoalId = [];
  const visitedStart = {};
  const visitedGoal = {};
  let path = [];

  queueStart.push(getStartSquare(COL_SIZE));
  queueGoal.push(getGoalSquare(COL_SIZE));
  queueStartId.push(getStartSquare(COL_SIZE).getId());
  queueGoalId.push(getStartSquare(COL_SIZE).getId());

	while (queueStart.length !== 0 || queueGoal.length !== 0) {
    let isStart = true;
    counter++; 
    
    let currNode;
    if (queueStart.length !== 0 && (counter % 2 === 1 || queueGoal.length === 0)) {
      currNode = queueStart.shift();
    } else {
      isStart = false;
      currNode = queueGoal.shift();
    }

		const row = currNode.getRow();
		const col = currNode.getCol();
    const id = row * COL_SIZE + col;
    console.log(id, visitedStart, visitedGoal);
    
    if (isStart && (id in visitedGoal)) {
      let temp = [];
      let tempCount = counter;
      let addNode = currNode.getParent();

      while (addNode !== null) {
        temp.unshift(addNode);
        addNode = addNode.getParent();
      }

      temp.shift();
      // path = temp.slice();

      addNode = visitedGoal[id];

      while (addNode !== null) {
        temp.push(addNode);
        addNode = addNode.getParent();
      }

      temp.pop();

      path = temp.slice();

      temp.forEach((node, i) => {
        const id = node.getRow() * COL_SIZE + node.getCol();
        setTimeout(() => {
          $('#' + id).removeClass();
          $('#' + id).addClass(PATH_SQUARE);
        }, Math.floor(tempCount / 10) * 100 + i * 50);
      });

      break;
    } else if (!isStart && (id in visitedStart)) {
      let temp = [];
      let tempCount = counter;
      let addNode = visitedStart[id];

      while (addNode !== null) {
        temp.unshift(addNode);
        addNode = addNode.getParent();
      }

      temp.shift();

      addNode = currNode;

      while (addNode !== null) {
        temp.push(addNode);
        addNode = addNode.getParent();
      }

      delete temp.pop();

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
    
    if (isStart) {
      visitedStart[id] = currNode;
    } else if (!isStart){
      visitedGoal[id] = currNode;
    }

		const neighbour = [
			{row: row - 1, col: col},
			{row: row, col: col - 1},
			{row: row + 1, col: col},
			{row: row, col: col + 1}
		];

		for (let curr of neighbour) {
      let currId = curr.row * COL_SIZE + curr.col;
      if ((isStart && queueStartId.includes(currId))
          || (!isStart && queueGoalId.includes(currId))
          || ($('#' + currId).attr('class') === WALL_SQUARE) 
					|| (curr.row < 0 || curr.row >= ROW_SIZE || curr.col < 0 || curr.col >= COL_SIZE)) {
                continue;
			}
			else {
        const newNode = new Node(curr.row, curr.col, currId, currNode, 0, 0);
        if (isStart) {
          queueStart.push(newNode);
          queueStartId.push(currId);
        } else {
          queueGoal.push(newNode);
          queueGoalId.push(currId);
        }
			}
		}
  }
  const visited = [];
  for (const id in visitedStart) {
    if (parseInt(id) === getStartSquare(COL_SIZE).getId()) {
      continue;
    }
    visited.push(id);
  }

  for (const id in visitedGoal) {
    if (parseInt(id) === getGoalSquare(COL_SIZE).getId()) {
      continue;
    }

    visited.push(id);
  }

	return [Math.floor(counter / 10) * 100 + path.length * 50, visited, path];
};

export default biDirectional;