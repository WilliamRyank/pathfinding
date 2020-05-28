import React, { Component } from 'react';
import $ from 'jquery';

import Square from './Square/Square';
import { initializeGrid } from './Helper';
import { UNVISITED_SQUARE, VISITED_SQUARE, START_SQUARE, PATH_SQUARE } from './Square/SquareType';
import dfs from '../../Algorithm/DFS';
import bfs from '../../Algorithm/BFS';


const START_ROW = 7;
const START_COL = 10;
const GOAL_ROW = 7;
const GOAL_COL = 30;
const ROW_SIZE = 14;
const COL_SIZE = 40

class Grid extends Component {
	constructor(props) {
		super(props);

		this.state = {
			grid: initializeGrid(START_ROW, START_COL, GOAL_ROW, GOAL_COL, ROW_SIZE, COL_SIZE),
			isAllowEdit: true,
			isMouseClicked: false,
			isSpecialClicked: false,
			specialType: '', //Moving starting/target square
			specialRow: 0,
			specialCol: 0,
      prevVisited: [],
      prevPath: []
		}
	}

	onMouseDown = () => {
		this.resetGrid();
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
		let id = this.getId(this.state.specialRow, this.state.specialCol);
		let elRef = $('#' + id);

		elRef.removeClass(this.state.specialType);
		if (!elRef.attr('class')) {
			elRef.addClass(UNVISITED_SQUARE);
		}
		
		this.setState({
			specialRow: row,
			specialCol: col
		});
	}

	getId = (row, col) => row * COL_SIZE + col;

	visualize = () => {
		this.resetGrid();
		this.setState({
			isAllowEdit: false,
		});

		const [delayAnimation, visited, path] =  dfs(ROW_SIZE, COL_SIZE);

		setTimeout(() => {
			this.setState({
				isAllowEdit: true,
        prevVisited: visited,
        prevPath: path
			});
		}, delayAnimation);
	}

	resetGrid = () => {
    const startSquare = $('.' + START_SQUARE);
    startSquare.removeClass();
    startSquare.addClass(START_SQUARE);
    for (const square of this.state.prevVisited) {
      $('#' + square).removeClass(VISITED_SQUARE);
    }
    for (const square of this.state.prevPath) {
      $('#' + square.getId()).removeClass(PATH_SQUARE);
    }
	}

	render() {
		return (
			<div>
				<button onClick={this.visualize} disabled={!this.state.isAllowEdit}>Visualize</button>
				<table 
					onMouseDown={this.state.isAllowEdit ? this.onMouseDown: null} 
					onMouseUp={this.state.isAllowEdit ? this.onMouseUp: null}>
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
															isAllowEdit={this.state.isAllowEdit}
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