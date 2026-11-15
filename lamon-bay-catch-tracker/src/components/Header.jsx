import React from 'react';

function Header({
  totalCatches,
  totalWeight,
  keptWeight,
  bestRig,
  rigBreakdown,
  onResetDemo
}) {
  const avgWeight = totalCatches > 0 ? totalWeight / totalCatches : 0;

  return (
    <header className="hero-panel">
      <div className="hero-top">
        <div className="brand-block">
          <p className="eyebrow">LAMON BAY SHORE TELEMETRY • CALAUAG, QUEZON</p>
          <h1>Shore Rig &amp; Catch Analytics</h1>
          <p className="subtitle">
            Compare patid, tandem rigs, and DIY glow lures across tide cycles to maximize harvest weight.
          </p>
        </div>

        <button
          type="button"
          className="btn-ghost"
          onClick={onResetDemo}
          title="Restore initial sample logs"
        >
          Reset Sample Data
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card metric-card-featured">
          <span className="metric-title">Top Performing Rig</span>
          <strong className="metric-primary">
            {bestRig ? bestRig.name : 'No catches logged'}
          </strong>
          <span className="metric-Context">
            {bestRig
              ? `${bestRig.weight.toFixed(2)} kg across ${bestRig.count} catches (${bestRig.share}% of total yield)`
              : 'Log your first catch below to calculate rig efficiency'}
          </span>
        </div>

        <div className="metric-card">
          <span className="metric-title">Total Session Yield</span>
          <strong className="metric-number">{totalWeight.toFixed(2)} kg</strong>
          <span className="metric-Context">
            {keptWeight.toFixed(2)} kg kept in cooler • {totalCatches} total fish
          </span>
        </div>

        <div className="metric-card">
          <span className="metric-title">Average Catch Size</span>
          <strong className="metric-number">{avgWeight.toFixed(2)} kg</strong>
          <span className="metric-Context">
            Target threshold: 0.35 kg per strike
          </span>
        </div>
      </div>

      {rigBreakdown.length > 0 && (
        <div className="rig-bars-panel">
          <div className="rig-bars-header">
            <span>Yield Distribution by Rig Setup</span>
            <span>Share of Total Weight</span>
          </div>
          <div className="rig-bars-list">
            {rigBreakdown.map((rig) => (
              <div key={rig.name} className="rig-bar-row">
                <div className="rig-bar-meta">
                  <span className="rig-bar-name">{rig.name}</span>
                  <span className="rig-bar-stats">
                    {rig.weight.toFixed(2)} kg ({rig.count}) • {rig.share}%
                  </span>
                </div>
                <div className="rig-bar-track">
                  <div
                    className="rig-bar-fill"
                    style={{ width: `${Math.max(rig.share, 6)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;