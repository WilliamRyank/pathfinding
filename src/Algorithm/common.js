import $ from 'jquery';

import Node from '../Node/Node';
import { START_SQUARE, UNVISITED_SQUARE, VISITED_SQUARE, GOAL_SQUARE } from '../components/Grid/Square/SquareType';

export const getStartSquare = (COL_SIZE) => {
  const startSquare = $('.' + START_SQUARE);
  const row = Math.floor(startSquare.attr('id') / COL_SIZE);
  const col = startSquare.attr('id') % COL_SIZE
  const id = row * COL_SIZE + col;
  
  return new Node(row, col, id, null, 0, 0);
};

export const getGoalSquare = (COL_SIZE) => {
  const goalSquare = $('.' + GOAL_SQUARE);
  const row = Math.floor(goalSquare.attr('id') / COL_SIZE);
  const col = goalSquare.attr('id') % COL_SIZE
  const id = row * COL_SIZE + col;
  
  return new Node(row, col, id, null, 0, 0);
};

export const getGoalPosition = (COL_SIZE) => {
  const startSquare = $('.' + GOAL_SQUARE);
  const row = Math.floor(startSquare.attr('id') / COL_SIZE);
  const col = startSquare.attr('id') % COL_SIZE
  
  return [row, col];
};

export const addVisited = (id, counter) => {
	setTimeout(() => {
    $('#' + id).removeClass(UNVISITED_SQUARE);
    
    if ($('#' + id).attr('class') === "") {
      $('#' + id).addClass(VISITED_SQUARE);
    }
	}, Math.floor(counter / 10) * 100);
};

const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

export class PriorityQueue {

  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  peek() {
    return this._heap[top];
  }
  push(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}

