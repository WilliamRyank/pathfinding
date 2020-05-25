export const initializeGrid = (startRow, startCol, goalRow, goalCol, rowSize, colSize) => {

  let grid = new Array(rowSize);
  for (let i = 0; i < rowSize; i++)
    grid[i] = new Array(colSize).fill('unvisited');

  grid[startRow][startCol] = 'start';
  grid[goalRow][goalCol] = 'goal';

  return grid;
}
