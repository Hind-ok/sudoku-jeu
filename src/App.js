import React, { useState } from 'react';
import SudokuGrid from './components/SudokuGrid';
import { initialGrid } from './utils/sudokuGenerator';
import './App.css'; // Assurez-vous d'avoir un fichier CSS global

function App() {
    // État de la grille et du statut de victoire
    const [grid, setGrid] = useState(initialGrid);
    const fixedCells = initialGrid.map(row => row.map(cell => cell !== 0));
    const [isWin, setIsWin] = useState(false);

    // Fonction de changement de valeur de cellule
    const handleCellChange = (row, col, value) => {
        const newGrid = grid.map((r, i) =>
            r.map((cell, j) => (i === row && j === col ? value : cell))
        );
        setGrid(newGrid);
        checkWin(newGrid);
    };

    // Vérifie si le joueur a gagné
    const checkWin = (grid) => {
        const isComplete = grid.every(row => row.every(cell => cell !== 0));
        const isValid = validateSudoku(grid);

        if (isComplete && isValid) {
            setIsWin(true);
        }
    };

    // Valide la grille selon les règles du Sudoku
    const validateSudoku = (grid) => {
        const isUnique = (arr) => {
            const nums = arr.filter(val => val !== 0);
            return new Set(nums).size === nums.length;
        };

        for (const row of grid) {
            if (!isUnique(row)) return false;
        }

        for (let col = 0; col < 9; col++) {
            const column = grid.map(row => row[col]);
            if (!isUnique(column)) return false;
        }

        for (let boxRow = 0; boxRow < 3; boxRow++) {
            for (let boxCol = 0; boxCol < 3; boxCol++) {
                const box = [];
                for (let row = 0; row < 3; row++) {
                    for (let col = 0; col < 3; col++) {
                        box.push(grid[boxRow * 3 + row][boxCol * 3 + col]);
                    }
                }
                if (!isUnique(box)) return false;
            }
        }

        return true;
    };

    // Fonction de réinitialisation
    const handleReset = () => {
        setGrid(initialGrid); // Réinitialiser la grille
        setIsWin(false); // Réinitialiser l'état de la victoire
    };

    return (
        <div className="App">
            <h1>Jeu de Sudoku</h1>
            <SudokuGrid grid={grid} onCellChange={handleCellChange} fixedCells={fixedCells} />
            {isWin && <div className="win-message">🎉 Félicitations ! Vous avez gagné ! 🎉</div>}
            <button onClick={handleReset} className="reset-button">
                Réinitialiser
            </button>
        </div>
    );
}

export default App;
