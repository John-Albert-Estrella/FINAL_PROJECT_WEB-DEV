import React from 'react';

function Header({ totalCatches, totalWeight, topSpecies }) {
  return (
    <header className="app-header">
      <div className="header-title">
        <h1>Lamon Bay Catch & Rig Tracker</h1>
        <p>Shore Fishing Session Logger & Rig Performance Monitor</p>
      </div>
      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-label">Logged Catches</span>
          <span className="stat-value">{totalCatches}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Weight</span>
          <span className="stat-value">{totalWeight.toFixed(2)} kg</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Latest / Featured</span>
          <span className="stat-value">{topSpecies}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;