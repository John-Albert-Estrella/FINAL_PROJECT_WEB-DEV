import React, { useState } from 'react';

const QUICK_SPECIES = [
  'Bugaong (Therapon)',
  'Salay-salay (Scad)',
  'Kitang (Spotted Scat)',
  'Asohos (Sillago)',
  'Banak (Mullet)'
];

function CatchForm({ onAddCatch }) {
  const [species, setSpecies] = useState('');
  const [weight, setWeight] = useState('');
  const [lengthCm, setLengthCm] = useState('');
  const [rigType, setRigType] = useState('Bottom Rig (Patid)');
  const [bait, setBait] = useState('Chopped Hipon');
  const [tide, setTide] = useState('High Tide (Taog)');
  const [kept, setKept] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!species.trim() || !weight || parseFloat(weight) <= 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newCatch = {
        id: Date.now(),
        species: species.trim(),
        weight: parseFloat(weight),
        lengthCm: lengthCm ? parseInt(lengthCm, 10) : 18,
        rigType,
        bait: bait.trim() || 'Chopped Hipon',
        tide,
        kept,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      onAddCatch(newCatch);
      setSpecies('');
      setWeight('');
      setLengthCm('');
      setIsSubmitting(false);
    }, 260);
  };

  return (
    <form className="surface-card form-panel" onSubmit={handleSubmit}>
      <div className="panel-header">
        <h2>Record Strike</h2>
        <span className="panel-subtitle">Log catch details immediately after landing</span>
      </div>

      <div className="field-group">
        <label htmlFor="species">Target Species</label>
        <div className="quick-chips" role="group" aria-label="Quick select fish species">
          {QUICK_SPECIES.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip-btn ${species === item ? 'chip-active' : ''}`}
              onClick={() => setSpecies(item)}
            >
              {item.split(' ')[0]}
            </button>
          ))}
        </div>
        <input
          id="species"
          type="text"
          placeholder="Or type custom species..."
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          required
        />
      </div>

      <div className="split-fields">
        <div className="field-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            id="weight"
            type="number"
            step="0.05"
            min="0.05"
            max="25"
            placeholder="0.45"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="lengthCm">Length (cm)</label>
          <input
            id="lengthCm"
            type="number"
            min="5"
            max="150"
            placeholder="22"
            value={lengthCm}
            onChange={(e) => setLengthCm(e.target.value)}
          />
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="rigType">Rig Configuration</label>
        <select
          id="rigType"
          value={rigType}
          onChange={(e) => setRigType(e.target.value)}
        >
          <option value="Bottom Rig (Patid)">Bottom Rig (Patid)</option>
          <option value="Double-Hook Tandem Rig">Double-Hook Tandem Rig</option>
          <option value="DIY Reflective Glow Lure">DIY Reflective Glow Lure</option>
          <option value="Float Rig (Palutang)">Float Rig (Palutang)</option>
        </select>
      </div>

      <div className="split-fields">
        <div className="field-group">
          <label htmlFor="bait">Bait / Lure</label>
          <input
            id="bait"
            type="text"
            placeholder="Chopped Hipon"
            value={bait}
            onChange={(e) => setBait(e.target.value)}
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="tide">Tide Phase</label>
          <select
            id="tide"
            value={tide}
            onChange={(e) => setTide(e.target.value)}
          >
            <option value="High Tide (Taog)">High Tide (Taog)</option>
            <option value="Incoming Tide">Incoming Tide</option>
            <option value="Low Tide (Kati)">Low Tide (Kati)</option>
          </select>
        </div>
      </div>

      <label className="checkbox-row" htmlFor="keptToggle">
        <input
          id="keptToggle"
          type="checkbox"
          checked={kept}
          onChange={(e) => setKept(e.target.checked)}
        />
        <span>Kept in cooler (uncheck if catch-and-release)</span>
      </label>

      <button
        type="submit"
        className="btn-cta"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving to Session Log...' : 'Log Catch to Telemetry'}
      </button>
    </form>
  );
}

export default CatchForm;