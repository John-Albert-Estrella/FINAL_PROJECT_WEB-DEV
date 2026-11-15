import React from 'react';
import CatchItem from './CatchItem';

function CatchList({ catches, onDeleteCatch, filterText, onFilterChange }) {
  return (
    <section className="catch-list-section">
      <div className="list-header">
        <h2>Session Catch Log ({catches.length})</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Filter by species or rig..."
          value={filterText}
          onChange={(e) => onFilterChange(e.target.value)}
        />
      </div>

      {catches.length === 0 ? (
        <p className="empty-message">No catches match your filter. Cast your line and log a catch!</p>
      ) : (
        <ul className="catch-list">
          {catches.map((item) => (
            <CatchItem
              key={item.id}
              catchData={item}
              onDelete={onDeleteCatch}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default CatchList;