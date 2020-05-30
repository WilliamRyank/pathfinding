import React from 'react';

import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { BFS, DFS, ASTAR, GREEDY, BIDIRECTIONAL } from '../../Algorithm/AlgoType';

const Header = (props) => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href=".">Pathfinding Visualizer</Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title={'Algorithm'} id="collasible-nav-dropdown">
            <NavDropdown.Item onSelect={() => props.onSelectAlgo(ASTAR)}>{ASTAR}</NavDropdown.Item>
            <NavDropdown.Item onSelect={() => props.onSelectAlgo(GREEDY)}>{GREEDY}</NavDropdown.Item>
            <NavDropdown.Item onSelect={() => props.onSelectAlgo(BIDIRECTIONAL)}>{BIDIRECTIONAL}</NavDropdown.Item>
            <NavDropdown.Item onSelect={() => props.onSelectAlgo(BFS)}>{BFS}</NavDropdown.Item>
            <NavDropdown.Item onSelect={() => props.onSelectAlgo(DFS)}>{DFS}</NavDropdown.Item>
          </NavDropdown>
        </Nav>
    </Navbar>
  );
}

export default Header;
