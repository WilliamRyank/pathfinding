class Node {
  constructor(row, col, id, parent, actualCost, heuristicCost) {
    this.row = row;
    this.col = col;
    this.id = id;
    this.parent = parent;
    this.actualCost = actualCost;
    this.heuristicCost = heuristicCost;
  }

  getParent = () => this.parent;

  getRow = () => this.row;

  getCol = () => this.col;

  getId = () => this.id;

  getActualCost = () => this.actualCost;

  getTotalCost = () => this.heuristicCost + this.actualCost;
}

export default Node;