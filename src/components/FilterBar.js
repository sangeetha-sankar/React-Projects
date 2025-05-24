// components/FilterBar.jsx
import React from 'react';

function FilterBar({ current, onChange }) {
  const filters = ['All', 'Completed', 'Pending'];

  return (
    <div className="filter-bar">
      {filters.map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={current === f ? 'active' : ''}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
