import { UNVISITED_SQUARE, START_SQUARE, GOAL_SQUARE } from './Square/SquareType';

export const initializeGrid = (startRow, startCol, goalRow, goalCol, rowSize, colSize) => {

  let grid = new Array(rowSize);
  for (let i = 0; i < rowSize; i++)
    grid[i] = new Array(colSize).fill(UNVISITED_SQUARE);

  grid[startRow][startCol] = START_SQUARE;
  grid[goalRow][goalCol] = GOAL_SQUARE;

  return grid;
}
