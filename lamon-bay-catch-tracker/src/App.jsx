import React, { useState } from 'react';
import Header from './components/Header';
import CatchForm from './components/CatchForm';
import CatchList from './components/CatchList';
import './App.css';

const INITIAL_CATCHES = [
  {
    id: 101,
    species: 'Bugaong (Convex-lined Therapon)',
    weight: 0.45,
    rigType: 'Double-Hook Tandem Rig',
    bait: 'Chopped Hipon',
    tide: 'High Tide (Taog)',
    time: '06:15 AM'
  },
  {
    id: 102,
    species: 'Salay-salay (Yellowtail Scad)',
    weight: 0.35,
    rigType: 'Bottom Rig (Patid)',
    bait: 'Chopped Hipon',
    tide: 'Incoming Tide',
    time: '07:05 AM'
  },
  {
    id: 103,
    species: 'Kitang (Spotted Scat)',
    weight: 0.60,
    rigType: 'Bottom Rig (Patid)',
    bait: 'Chopped Hipon',
    tide: 'High Tide (Taog)',
    time: '07:40 AM'
  },
  {
    id: 104,
    species: 'Asohos (Silver Sillago)',
    weight: 0.30,
    rigType: 'DIY Reflective Glow Lure',
    bait: 'Fresh Alamang Paste',
    tide: 'Low Tide (Kati)',
    time: '08:20 AM'
  }
];

function App() {
  const [catches, setCatches] = useState(INITIAL_CATCHES);
  const [filterText, setFilterText] = useState('');

  const handleAddCatch = (newCatch) => {
    setCatches([newCatch, ...catches]);
  };

  const handleDeleteCatch = (id) => {
    setCatches(catches.filter((item) => item.id !== id));
  };

  const filteredCatches = catches.filter(
    (item) =>
      item.species.toLowerCase().includes(filterText.toLowerCase()) ||
      item.rigType.toLowerCase().includes(filterText.toLowerCase())
  );

  const totalWeight = catches.reduce((sum, item) => sum + item.weight, 0);
  const topSpecies = catches.length > 0 ? catches[0].species.split(' ')[0] : 'None';

  return (
    <div className="app-container">
      <Header
        totalCatches={catches.length}
        totalWeight={totalWeight}
        topSpecies={topSpecies}
      />
      <main className="main-content">
        <CatchForm onAddCatch={handleAddCatch} />
        <CatchList
          catches={filteredCatches}
          onDeleteCatch={handleDeleteCatch}
          filterText={filterText}
          onFilterChange={setFilterText}
        />
      </main>
    </div>
  );
}

export default App;