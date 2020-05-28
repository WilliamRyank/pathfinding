import $ from 'jquery';

import { START_SQUARE, UNVISITED_SQUARE, VISITED_SQUARE } from '../Grid/Square/SquareType';

export const getStartSquare = () => {
	const startSquare = $('.' + START_SQUARE);
	
	return {
		row: Math.floor(startSquare.attr('id') / 40),
		col: startSquare.attr('id') % 40
	};
};

export const addVisited = (id, counter) => {
	setTimeout(() => {
		$('#' + id).removeClass(UNVISITED_SQUARE);
		$('#' + id).addClass(VISITED_SQUARE);
	}, Math.floor(counter / 10) * 50);
};