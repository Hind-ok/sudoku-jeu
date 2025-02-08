// sudokuGeneratorRandom.js
export const generateSudokuGrid = () => {
    const emptyGrid = Array(9)
        .fill(null)
        .map(() => Array(9).fill(0));

    const fillGrid = (grid) => {
        const isSafe = (row, col, num) => {
            for (let x = 0; x < 9; x++) {
                if (grid[row][x] === num || grid[x][col] === num) return false;
            }
            const startRow = row - (row % 3);
            const startCol = col - (col % 3);
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (grid[startRow + i][startCol + j] === num) return false;
                }
            }
            return true;
        };

        const solve = (row, col) => {
            if (row === 8 && col === 9) return true;
            if (col === 9) {
                row++;
                col = 0;
            }
            if (grid[row][col] !== 0) return solve(row, col + 1);

            for (let num = 1; num <= 9; num++) {
                if (isSafe(row, col, num)) {
                    grid[row][col] = num;
                    if (solve(row, col + 1)) return true;
                    grid[row][col] = 0;
                }
            }
            return false;
        };

        solve(0, 0);
    };

    fillGrid(emptyGrid);

    const makeHoles = (grid) => {
        const holes = 30; // Nombre de cases à vider
        let count = 0;
        while (count < holes) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (grid[row][col] !== 0) {
                grid[row][col] = 0;
                count++;
            }
        }
    };

    makeHoles(emptyGrid);

    return emptyGrid;
};
