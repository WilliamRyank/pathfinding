import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';

import Square from './Square/Square';
import { initializeGrid } from './Helper';
import { UNVISITED_SQUARE, VISITED_SQUARE, START_SQUARE, PATH_SQUARE } from './Square/SquareType';
import dfs from '../../Algorithm/DFS';
import bfs from '../../Algorithm/BFS';
import { BFS, DFS } from '../../Algorithm/AlgoType';


const START_ROW = 6;
const START_COL = 10;
const GOAL_ROW = 6;
const GOAL_COL = 30;
const ROW_SIZE = 12;
const COL_SIZE = 40;

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

    let [delayAnimation, visited, path] = [null, null, null];
    
    switch(this.props.algo) {
      case BFS:
        [delayAnimation, visited, path] =  bfs(ROW_SIZE, COL_SIZE);
        break;
      
      case DFS:
        [delayAnimation, visited, path] =  dfs(ROW_SIZE, COL_SIZE);
        break;
      
      default:
    }


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
    const style = {
      textAlign: 'center',
      marginTop: '20px',
      width: '100%'
    }
		return (
			<div>
        <div style={style}>
          <Button 
            disabled={!this.state.isAllowEdit}
            hidden={!this.props.algo} 
            variant="success" 
            onClick={this.visualize}>Visualize {this.props.algo}!
          </Button>
        </div>
        <div style={style} hidden={this.props.algo}>
          Pick an algorithm and visualize it!
        </div>

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
															key={(rowIdx % COL_SIZE)*COL_SIZE + colIdx} 
															id={(rowIdx % COL_SIZE)*COL_SIZE + colIdx} 
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