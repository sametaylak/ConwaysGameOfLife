/* GAME RULES
** 1- Any live cell with fewer than two live neighbours dies (referred to as underpopulation or exposure[1]).
** 2- Any live cell with more than three live neighbours dies (referred to as overpopulation or overcrowding).
** 3- Any live cell with two or three live neighbours lives, unchanged, to the next generation.
** 4- Any dead cell with exactly three live neighbours will come to life.
**
** LINK: http://www.conwaylife.com/wiki/Conway%27s_Game_of_Life
*/

window.onload = () => {
  let canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let context = canvas.getContext('2d');

  let gridSize = 20;
  let numberOfColumn = Math.floor(canvas.height / gridSize);
  let numberOfRow = Math.floor(canvas.width / gridSize);

  let grid = new Array(numberOfRow).fill(null)
    .map(_ => new Array(numberOfColumn).fill(null)
      .map(_ => Math.floor(Math.random() * 2)));

  function findLivingNeighbors (r, c) {
    let numberOfLivingNeighbors = 0;
    for (var row = Math.max(0, r - 1); row <= Math.min(r + 1, numberOfRow - 1); row++) 
      for (var column = Math.max(0, c - 1); column <= Math.min(c + 1, numberOfColumn - 1); column++) {
        if (row !== r || column !== c) {
          if (grid[row][column]) numberOfLivingNeighbors++;
        }
      }

    return numberOfLivingNeighbors;
  }

  function calculate () {
    let newGrid = grid.map(arr => [...arr]);
    for (let row = 0; row < numberOfRow; row++)
      for (let column = 0; column < numberOfColumn; column++) {
        let livingNeighbors = findLivingNeighbors(row, column);

        if (grid[row][column] === 1 && livingNeighbors < 2)
          newGrid[row][column] = 0;

        else if (grid[row][column] === 1 && livingNeighbors > 3)
          newGrid[row][column] = 0;

        else if (grid[row][column] === 0 && livingNeighbors === 3)
          newGrid[row][column] = 1;
      }
    return newGrid;
  }

  function draw () {
    for (let row = 0; row < numberOfRow; row++)
      for (let column = 0; column < numberOfColumn; column++) {
        context.beginPath();
        context.rect(row * gridSize, column * gridSize, gridSize, gridSize);
        context.fillStyle = grid[row][column] ? '#000000' : '#ffffff';
        context.fill();
      }
  }

  update ();
  function update() {
    grid = calculate();
    draw();
    requestAnimationFrame(update);
  }
}