import React, { Component } from 'react';
import $ from 'jquery';

import Square from './Square/Square';
import { initializeGrid } from './Helper';
import { UNVISITED_SQUARE, WALL_SQUARE } from './Square/SquareType';

class Grid extends Component {
	constructor(props) {
		super(props);

		this.state = {
			grid: initializeGrid(7, 10, 7, 30, 14, 40),
			isMouseClicked: false,
			isSpecialClicked: false,
			specialType: '', //Moving starting/target square
			specialRow: 0,
			specialCol: 0
		}
	}

	onMouseDown = () => {
		this.setState({
			isMouseClicked: true
		});
	}

	onMouseUp = () => {
		this.setState({
			isMouseClicked: false,
			isSpecialClicked: false,
			specialType: '',
			specialRow: 0,
			specialCol: 0
		});
	}

	selectSpecial = (type, row, col) => {
		this.setState({
			isSpecialClicked: true,
			specialType: type,
			specialRow: row,
			specialCol: col
		});
	}

	moveSpecial = (row, col) => { // Logic when moving special squares 
		let id = this.state.specialRow * 40 + this.state.specialCol;
		$('#' + id).removeClass(this.state.specialType);
		if (!$('#' + id).attr('class')) {
			$('#' + id).addClass(UNVISITED_SQUARE);
		}
		this.setState({
			specialRow: row,
			specialCol: col
		});
	}

	visualize = () => {

		let grid = this.state.grid;
		let counter = 0;
		console.log(grid);
		const queue = [];
		const visited = [];
		queue.push({
			row: Math.floor($('.start').attr('id') / 40),
			col: $('.start').attr('id') % 40
		})

		while (queue.length !== 0) {
			let temp = queue.pop();
			let row = temp.row;
			let col = temp.col;
			let id = row * 40 + col;
			counter++;

			if ($('#' + id).attr('class') === 'goal') {
				break;
			}

			this.add(id ,counter);
			console.log(row, col);

			visited.push(id);

			let n1 = {};
			let n2 = {};
			let n3 = {};
			let n4 = {};
			const neighbour = [];

			n1['row'] = row + 1;
			n1['col'] = col;
			n2['row'] = row - 1;
			n2['col'] = col;
			n3['row'] = row;
			n3['col'] = col + 1;
			n4['row'] = row;
			n4['col'] = col - 1;

			neighbour.push(n2);
			neighbour.push(n4);
			neighbour.push(n1);
			neighbour.push(n3);

			for (let n of neighbour) {
				let id = n.row * 40 + n.col;
				if (visited.includes(id) || ($('#' + id).attr('class') === WALL_SQUARE) || (n.row < 0 || n.row > 13 || n.col < 0 || n.col > 39)) {
					continue;
				}
				else {
					queue.push(n);
				}
			}

		}

		
	}

	add = (id, counter) => {
		setTimeout(function(){$('#' + id).addClass('visited'); console.log(id)}, counter * 20);
	};

	render() {
		return (
			<div>
				<button onClick={this.visualize}>Visualize</button>
				<table onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
				<tbody>
				{
					this.state.grid.map((row, rowIdx) => {
						return (
							<tr key={rowIdx}>
								{row.map((square, colIdx) => {
									return <Square 
														row={rowIdx}
														col={colIdx}
														key={(rowIdx % 40)*40 + colIdx} 
														id={(rowIdx % 40)*40 + colIdx} 
														isMouseClicked={this.state.isMouseClicked}
														isSpecialClicked={this.state.isSpecialClicked}
														specialType={this.state.specialType}	
														selectSpecial={this.selectSpecial}
														moveSpecial={this.moveSpecial}  
														grid={this.state.grid} />
								})}
							</tr>
						)})
				}
				</tbody>
				</table>
			</div>
		)
	}
}

export default Grid;