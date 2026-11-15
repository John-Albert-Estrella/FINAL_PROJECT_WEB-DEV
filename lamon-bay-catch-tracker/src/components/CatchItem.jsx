import React from 'react';

function CatchItem({ catchData, onDelete, onToggleKept }) {
  return (
    <li className={`catch-row ${!catchData.kept ? 'catch-row-released' : ''}`}>
      <div className="catch-row-main">
        <div className="catch-row-top">
          <span className="catch-species">{catchData.species}</span>
          <span className="catch-time">{catchData.time}</span>
        </div>

        <div className="catch-specs">
          <span className="spec-primary">{catchData.rigType}</span>
          <span className="spec-dot">•</span>
          <span>{catchData.bait}</span>
          <span className="spec-dot">•</span>
          <span>{catchData.tide}</span>
        </div>
      </div>

      <div className="catch-row-right">
        <div className="catch-measurements">
          <strong className="catch-weight">
            {catchData.weight.toFixed(2)} <small>kg</small>
          </strong>
          <span className="catch-length">{catchData.lengthCm} cm</span>
        </div>

        <div className="catch-actions">
          <button
            type="button"
            className={`status-toggle ${catchData.kept ? 'status-kept' : 'status-released'}`}
            onClick={() => onToggleKept(catchData.id)}
            title="Click to toggle Kept vs Released"
          >
            {catchData.kept ? 'Kept' : 'Released'}
          </button>

          <button
            type="button"
            className="btn-icon-remove"
            onClick={() => onDelete(catchData.id, catchData.species)}
            aria-label={`Remove ${catchData.species}`}
            title="Delete log entry"
          >
            ✕
          </button>
        </div>
      </div>
    </li>
  );
}

export default CatchItem;