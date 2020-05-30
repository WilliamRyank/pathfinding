import React from 'react';

const Info = () => {
  return (
    <ul>
      <li>
        <div id="startNode" className="info"/>
        Start Node
      </li>
      <li>
        <div id="goalNode" className="info"/>
        Goal Node
      </li>
      <li>
        <div id="unvisitedNode" className="info"/>
        Unvisited Node
      </li>
      <li>
        <div id="visitedNode" className="info"/>
        Visited Node
      </li>
      <li>
        <div id="pathNode" className="info"/>
        Path Node
      </li>
      <li>
        <div id="wallNode" className="info"/>
        Wall Node
      </li>
    </ul>
  )
}

export default Info;