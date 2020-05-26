import React, { Component } from 'react';
import $ from 'jquery';

import { START_SQUARE, GOAL_SQUARE, UNVISITED_SQUARE, WALL_SQUARE } from './SquareType';

class Square extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currState: this.props.grid[this.props.row][this.props.col], //Initial State
			prevState: UNVISITED_SQUARE
		}
	}

	onMouseDown = (event) => {
		if (!event || event.button === 0) { //Only allow left click
			switch(this.state.currState) {
				case UNVISITED_SQUARE:
					this.setState({
						currState: WALL_SQUARE,
						prevState: UNVISITED_SQUARE
					});
					break;
				case WALL_SQUARE:
					this.setState({
						currState: UNVISITED_SQUARE,
						prevState: WALL_SQUARE
					});
					break;
				case START_SQUARE:
				case GOAL_SQUARE:
					if (!this.props.isMouseClicked) { //Not allowed to move special squares if currently creating walls
						if (event.target.className !== this.state.currState) {
							this.setState({
								currState: UNVISITED_SQUARE
							});
							break;
						}
						this.props.selectSpecial(this.state.currState, this.props.row, this.props.col);
					} 
					break;
				default:
			}
		}
	}

	onMouseOver = (event) => {
		if ((event.target.className !== this.state.currState)
					&& (this.state.currState === GOAL_SQUARE || this.state.currState === START_SQUARE)) { //Preventing unmatched class name with curr state caused by moving special squares
			if (this.props.specialType) {
				this.props.moveSpecial(this.props.row, this.props.col);
				$(event.target).addClass(this.props.specialType);
			} else {
				this.setState({
					currState: event.target.className
				});
			}
		}

		if (this.props.isMouseClicked) {
			if (this.props.isSpecialClicked && !this.isConflictingSquares(this.props.specialType)) {
				if (this.state.currState === GOAL_SQUARE || this.state.currState === START_SQUARE) {
					this.setState({
						currState: this.props.specialType,
						prevState: UNVISITED_SQUARE
					});
				} else {
					this.setState({
						prevState: this.state.currState,
						currState: this.props.specialType,
					});
					this.props.moveSpecial(this.props.row, this.props.col);
				}
			} else {
				this.onMouseDown();
			}
		}
	}

	onMouseLeave = (event) =>{
		if (this.props.isSpecialClicked 
					&& (!this.isConflictingSquares(this.props.specialType))
					&& (!this.isConflictingSquares(event.relatedTarget.className))) {
			this.setState({
				currState: this.state.prevState,
			});
		}	
	}

	isConflictingSquares = (state) => {
		return (this.state.currState === GOAL_SQUARE && state === START_SQUARE)
			|| (this.state.currState === START_SQUARE && state === GOAL_SQUARE);
	}

	componentDidUpdate = () => { //Update the state of this square to the whole grid
		this.props.grid[this.props.row][this.props.col] = this.state.currState;

		// console.log(this.props.grid); //FOR DEBUGGING
	}

	render() {
		return (
			<td className={this.state.currState} 
					onMouseDown={this.onMouseDown}
					onMouseOver={this.onMouseOver}
					onMouseLeave={this.onMouseLeave}
					id={this.props.id} />
		)
	}
}

export default Square;