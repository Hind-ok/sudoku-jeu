import React from 'react';
import '../styles/SudokuGrid.css';

const SudokuGrid = ({ grid, onCellChange, fixedCells }) => {
    return (
        <div className="sudoku-grid">
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <div className="cell" key={`${rowIndex}-${colIndex}`}>
                        {fixedCells[rowIndex][colIndex] ? (
                            <span>{cell}</span>
                        ) : (
                            <input
                                type="text"
                                maxLength="1"
                                value={cell === 0 ? '' : cell}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value, 10) || 0;
                                    onCellChange(rowIndex, colIndex, value);
                                }}
                            />
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default SudokuGrid;
