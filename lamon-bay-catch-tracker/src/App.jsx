import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CatchForm from './components/CatchForm';
import CatchList from './components/CatchList';
import './App.css';

const INITIAL_CATCHES = [
  {
    id: 101,
    species: 'Kitang (Spotted Scat)',
    weight: 0.65,
    lengthCm: 24,
    rigType: 'Bottom Rig (Patid)',
    bait: 'Chopped Hipon',
    tide: 'High Tide (Taog)',
    kept: true,
    time: '06:15 AM'
  },
  {
    id: 102,
    species: 'Bugaong (Therapon)',
    weight: 0.45,
    lengthCm: 21,
    rigType: 'Double-Hook Tandem Rig',
    bait: 'Chopped Hipon',
    tide: 'High Tide (Taog)',
    kept: true,
    time: '06:50 AM'
  },
  {
    id: 103,
    species: 'Salay-salay (Yellowtail Scad)',
    weight: 0.40,
    lengthCm: 22,
    rigType: 'Double-Hook Tandem Rig',
    bait: 'Squid Strip',
    tide: 'Incoming Tide',
    kept: true,
    time: '07:25 AM'
  },
  {
    id: 104,
    species: 'Asohos (Silver Sillago)',
    weight: 0.30,
    lengthCm: 19,
    rigType: 'DIY Reflective Glow Lure',
    bait: 'Hooked Lure + Hipon Tip',
    tide: 'Low Tide (Kati)',
    kept: true,
    time: '08:10 AM'
  },
  {
    id: 105,
    species: 'Juvenile Bugaong',
    weight: 0.15,
    lengthCm: 12,
    rigType: 'Bottom Rig (Patid)',
    bait: 'Chopped Hipon',
    tide: 'Low Tide (Kati)',
    kept: false,
    time: '08:40 AM'
  }
];

function App() {
  const [catches, setCatches] = useState(() => {
    const saved = localStorage.getItem('lamon_bay_catches_v2');
    return saved ? JSON.parse(saved) : INITIAL_CATCHES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [tideFilter, setTideFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('lamon_bay_catches_v2', JSON.stringify(catches));
  }, [catches]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2800);
  };

  const handleAddCatch = (newCatch) => {
    setCatches((prev) => [newCatch, ...prev]);
    showToast(`Logged ${newCatch.weight.toFixed(2)} kg ${newCatch.species}`);
  };

  const handleDeleteCatch = (id, speciesName) => {
    setCatches((prev) => prev.filter((item) => item.id !== id));
    showToast(`Removed ${speciesName} from log`, 'neutral');
  };

  const handleToggleKept = (id) => {
    setCatches((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, kept: !item.kept } : item
      )
    );
  };

  const handleResetDemo = () => {
    setCatches(INITIAL_CATCHES);
    showToast('Reset to default Lamon Bay demo logs', 'neutral');
  };

  // Calculate Analytics for Header
  const totalWeight = catches.reduce((sum, item) => sum + item.weight, 0);
  const keptWeight = catches
    .filter((item) => item.kept)
    .reduce((sum, item) => sum + item.weight, 0);

  const rigTotals = catches.reduce((acc, item) => {
    if (!acc[item.rigType]) {
      acc[item.rigType] = { count: 0, weight: 0 };
    }
    acc[item.rigType].count += 1;
    acc[item.rigType].weight += item.weight;
    return acc;
  }, {});

  const rigBreakdown = Object.entries(rigTotals)
    .map(([name, stats]) => ({
      name,
      count: stats.count,
      weight: stats.weight,
      share: totalWeight > 0 ? Math.round((stats.weight / totalWeight) * 100) : 0
    }))
    .sort((a, b) => b.weight - a.weight);

  const bestRig = rigBreakdown.length > 0 ? rigBreakdown[0] : null;

  // Filter and Sort Catches for List
  const processedCatches = catches
    .filter((item) => {
      const matchesSearch =
        item.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.rigType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bait.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTide = tideFilter === 'All' || item.tide === tideFilter;
      return matchesSearch && matchesTide;
    })
    .sort((a, b) => {
      if (sortBy === 'heaviest') return b.weight - a.weight;
      if (sortBy === 'length') return b.lengthCm - a.lengthCm;
      return b.id - a.id;
    });

  return (
    <div className="app-shell">
      {toast && (
        <div className={`toast-banner toast-${toast.type}`} role="status">
          <span className="toast-dot" />
          <span>{toast.message}</span>
        </div>
      )}

      <Header
        totalCatches={catches.length}
        totalWeight={totalWeight}
        keptWeight={keptWeight}
        bestRig={bestRig}
        rigBreakdown={rigBreakdown}
        onResetDemo={handleResetDemo}
      />

      <main className="workspace-grid">
        <aside className="form-column">
          <CatchForm onAddCatch={handleAddCatch} />
        </aside>

        <section className="log-column">
          <CatchList
            catches={processedCatches}
            totalCount={catches.length}
            onDeleteCatch={handleDeleteCatch}
            onToggleKept={handleToggleKept}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            tideFilter={tideFilter}
            onTideFilterChange={setTideFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </section>
      </main>
    </div>
  );
}

export default App;