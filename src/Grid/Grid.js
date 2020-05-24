import React, { Component } from 'react';

import Square from './Square/Square';

class Grid extends Component {
	constructor(props) {
		super(props);

		let grid = new Array(14);
		for (let i = 0; i < 14; i++)
			grid[i] = new Array(40).fill('unvisited');

		this.state = {
			grid: grid,
			isMouseClicked: false
		}
	}

	onMouseDown = () => {
		this.setState({
			isMouseClicked: true
		});
	}

	onMouseUp = () => {
		this.setState({
			isMouseClicked: false
		});
	}

	render() {
		return (
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
														key={rowIdx % 40 + colIdx} 
														id={rowIdx % 40 + colIdx} 
														isMouseClicked={this.state.isMouseClicked}
														grid={this.state.grid} />
								})}
							</tr>
						)})
				}
				</tbody>
			</table>
		)
	}
}

export default Grid;