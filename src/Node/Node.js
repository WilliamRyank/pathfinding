class Node {
  constructor(row, col, id, parent) {
    this.row = row;
    this.col = col;
    this.id = id;
    this.parent = parent;
  }

  getParent = () => this.parent;

  getRow = () => this.row;

  getCol = () => this.col;

  getId = () => this.id;
}

export default Node;