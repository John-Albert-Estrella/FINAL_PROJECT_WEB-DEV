import React from 'react';
import CatchItem from './CatchItem';

const TIDE_FILTERS = [
  'All',
  'High Tide (Taog)',
  'Incoming Tide',
  'Low Tide (Kati)'
];

function CatchList({
  catches,
  totalCount,
  onDeleteCatch,
  onToggleKept,
  searchQuery,
  onSearchChange,
  tideFilter,
  onTideFilterChange,
  sortBy,
  onSortChange
}) {
  return (
    <div className="surface-card log-panel">
      <div className="log-toolbar">
        <div className="log-title-row">
          <div>
            <h2>Session Telemetry Log</h2>
            <span className="panel-subtitle">
              Showing {catches.length} of {totalCount} recorded strikes
            </span>
          </div>

          <div className="toolbar-controls">
            <input
              type="search"
              className="search-field"
              placeholder="Search species, rig, or bait..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Filter catches"
            />

            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort catches"
            >
              <option value="newest">Latest First</option>
              <option value="heaviest">Heaviest Weight</option>
              <option value="length">Longest (cm)</option>
            </select>
          </div>
        </div>

        <div className="tide-pills" role="tablist" aria-label="Filter by tide condition">
          {TIDE_FILTERS.map((tide) => (
            <button
              key={tide}
              type="button"
              className={`tide-pill ${tideFilter === tide ? 'tide-pill-active' : ''}`}
              onClick={() => onTideFilterChange(tide)}
            >
              {tide === 'All' ? 'All Tides' : tide.split(' ')[0] + ' Tide'}
            </button>
          ))}
        </div>
      </div>

      {catches.length === 0 ? (
        <div className="empty-state">
          <p className="empty-headline">No catches match your current filter</p>
          <p className="empty-subtext">
            Try switching the tide filter to &ldquo;All Tides&rdquo; or record a new strike on the left.
          </p>
        </div>
      ) : (
        <ul className="catch-feed">
          {catches.map((item) => (
            <CatchItem
              key={item.id}
              catchData={item}
              onDelete={onDeleteCatch}
              onToggleKept={onToggleKept}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default CatchList;