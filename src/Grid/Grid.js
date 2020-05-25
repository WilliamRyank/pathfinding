import React, { Component } from 'react';

import Square from './Square/Square';
import { initializeGrid } from './Helper';

class Grid extends Component {
	constructor(props) {
		super(props);

		this.state = {
			grid: initializeGrid(7, 10, 7, 30, 14, 40),
			isMouseClicked: false,
			isSpecialClicked: false,
			specialType: '' //Moving starting/target square
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
			specialType: ''
		});
	}

	selectSpecial = (type) => {
		this.setState({
			isSpecialClicked: true,
			specialType: type
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
														isSpecialClicked={this.state.isSpecialClicked}
														specialType={this.state.specialType}	
														selectSpecial={this.selectSpecial} 
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