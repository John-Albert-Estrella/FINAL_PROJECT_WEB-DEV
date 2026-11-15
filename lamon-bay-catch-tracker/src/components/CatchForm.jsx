import React, { useState } from 'react';

function CatchForm({ onAddCatch }) {
  const [species, setSpecies] = useState('');
  const [weight, setWeight] = useState('');
  const [rigType, setRigType] = useState('Bottom Rig (Patid)');
  const [bait, setBait] = useState('Chopped Hipon');
  const [tide, setTide] = useState('High Tide (Taog)');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!species.trim() || !weight || parseFloat(weight) <= 0) return;

    const newCatch = {
      id: Date.now(),
      species: species.trim(),
      weight: parseFloat(weight),
      rigType,
      bait,
      tide,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onAddCatch(newCatch);
    setSpecies('');
    setWeight('');
  };

  return (
    <form className="catch-form" onSubmit={handleSubmit}>
      <h2>Log New Catch</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="species">Fish Species</label>
          <input
            id="species"
            type="text"
            placeholder="e.g., Bugaong, Salay-salay, Kitang"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input
            id="weight"
            type="number"
            step="0.05"
            min="0.05"
            placeholder="e.g., 0.45"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rigType">Rig Setup</label>
          <select id="rigType" value={rigType} onChange={(e) => setRigType(e.target.value)}>
            <option value="Bottom Rig (Patid)">Bottom Rig (Patid)</option>
            <option value="Double-Hook Tandem Rig">Double-Hook Tandem Rig</option>
            <option value="DIY Reflective Glow Lure">DIY Reflective Glow Lure</option>
            <option value="Float Rig (Palutang)">Float Rig (Palutang)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bait">Bait Used</label>
          <input
            id="bait"
            type="text"
            placeholder="e.g., Chopped Hipon, Squid Strip"
            value={bait}
            onChange={(e) => setBait(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tide">Tide Condition</label>
          <select id="tide" value={tide} onChange={(e) => setTide(e.target.value)}>
            <option value="High Tide (Taog)">High Tide (Taog)</option>
            <option value="Incoming Tide">Incoming Tide</option>
            <option value="Low Tide (Kati)">Low Tide (Kati)</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn-submit">+ Add Catch to Log</button>
    </form>
  );
}

export default CatchForm;