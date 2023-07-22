import React, { useState } from "react";
import "./MiniNavBar.css";

const MiniNavBar = ({ activeOption, onSelectOption }) => {
    const options = ["Friends", "Pending Requests"];

    return (
        <div className="nav-bar">
            {options.map((option) => (
                <button
                    key={option}
                    className={`nav-option ${option === activeOption ? "active" : ""}`}
                    onClick={() => onSelectOption(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default MiniNavBar;
