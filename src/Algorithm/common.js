import $ from 'jquery';

import Node from '../Node/Node';
import { START_SQUARE, UNVISITED_SQUARE, VISITED_SQUARE } from '../components/Grid/Square/SquareType';

export const getStartSquare = (COL_SIZE) => {
  const startSquare = $('.' + START_SQUARE);
  const row = Math.floor(startSquare.attr('id') / COL_SIZE);
  const col = startSquare.attr('id') % COL_SIZE
  const id = row * COL_SIZE + col;
  
  return new Node(row, col, id, null);
};

export const addVisited = (id, counter) => {
	setTimeout(() => {
		$('#' + id).removeClass(UNVISITED_SQUARE);
		$('#' + id).addClass(VISITED_SQUARE);
	}, Math.floor(counter / 10) * 50);
};