import React from "react";

const Controls = ({ onReset }) => {
    return (
        <div className="controls">
            <button onClick={onReset}>Réinitialiser</button>
        </div>
    );
};

export default Controls;
