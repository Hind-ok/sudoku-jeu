import React from 'react';

import '../styles/Cell.css';

const Cell = ({ value, row, col, onChange, isFixed }) => {
    const handleChange = (e) => {
        const newValue = parseInt(e.target.value) || 0;
        onChange(row, col, newValue);
    };

    return (
        <div className="cell">
            {isFixed ? (
                <span>{value}</span>
            ) : (
                <input
                    type="text"
                    value={value === 0 ? '' : value}
                    onChange={handleChange}
                    maxLength="1"
                />
            )}
        </div>
    );
};

export default Cell;
