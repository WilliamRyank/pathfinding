import React, { Component }from 'react';

class Square extends Component {
	constructor(props) {
		super(props);
		this.state = {
			state: 'unvisited'
		}
	}

	onMouseDown = () => {
		if (this.state.state === 'unvisited') {
			this.props.grid[this.props.row][this.props.col] = 'wall';
			this.setState({
				state: 'wall',
			});
		} else if (this.state.state === 'wall') {
			this.props.grid[this.props.row][this.props.col] = 'unvisited';
			this.setState({
				state: 'unvisited',
			});
		}
	}

	onMouseOver = () => {
		if (this.props.isMouseClicked) {
			this.onMouseDown();
		}
	}

	render() {
		return (
			<td className={this.state.state} 
					onMouseDown={this.onMouseDown}
					onMouseOver={this.onMouseOver}/>
		)
	}
}

export default Square;