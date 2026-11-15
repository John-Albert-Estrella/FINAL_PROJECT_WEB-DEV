import React from 'react';

function CatchItem({ catchData, onDelete }) {
  return (
    <li className="catch-card">
      <div className="catch-info">
        <div className="catch-primary">
          <span className="species-name">{catchData.species}</span>
          <span className="weight-badge">{catchData.weight.toFixed(2)} kg</span>
        </div>
        <div className="catch-details">
          <span><strong>Rig:</strong> {catchData.rigType}</span>
          <span><strong>Bait:</strong> {catchData.bait}</span>
          <span><strong>Tide:</strong> {catchData.tide}</span>
          <span><strong>Time:</strong> {catchData.time}</span>
        </div>
      </div>
      <button
        className="btn-delete"
        onClick={() => onDelete(catchData.id)}
        title="Remove entry"
      >
        Remove
      </button>
    </li>
  );
}

export default CatchItem;