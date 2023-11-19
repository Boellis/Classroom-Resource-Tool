import React, { useState, useEffect } from 'react';
import './style.css'; // Assuming style.css is in the same directory

function OutputHistory() {
    const [outputHistory, setOutputHistory] = useState([]);

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('outputHistory')) || [];
        setOutputHistory(storedHistory);
    }, []);

    return (
        <div className="container my-4">
            <button className="home-button" onClick={() => window.location.href='index.html'}>Home</button>
            <div className="history-card">
                <h1>Output History</h1>
                <div id="historyContainer" className="history-container">
                    {outputHistory.map((entry, index) => (
                        <div key={index} className="history-entry">
                            {/* Display your history entry here */}
                            {entry}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OutputHistory;
