import React, { Component } from 'react';

import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { BFS, DFS } from '../../Algorithm/AlgoType';

class Header extends Component {

  render() {
    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href=".">Pathfinding Visualizer</Navbar.Brand>
          <Nav className="mr-auto">
            <NavDropdown title={'Algorithm'} id="collasible-nav-dropdown">
              <NavDropdown.Item onSelect={() => this.props.onSelectAlgo(DFS)}>DFS</NavDropdown.Item>
              <NavDropdown.Item onSelect={() => this.props.onSelectAlgo(BFS)}>BFS</NavDropdown.Item>
            </NavDropdown>
          </Nav>
      </Navbar>
    );
  }
}

export default Header;
