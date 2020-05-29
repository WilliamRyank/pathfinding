import React, { Component }from 'react';
import './App.css';
import Grid from './components/Grid/Grid';
import Header from './components/Header/Header';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      algo: ''
    }
  }

  onSelectAlgo = (algo) => {
    this.setState({
      algo: algo
    });
  }

  render() {
    return (
      <div>
        <Header algo={this.state.algo} onSelectAlgo={this.onSelectAlgo}></Header>
        <Grid algo={this.state.algo}></Grid>
      </div>
    );
  }
}

export default App;
