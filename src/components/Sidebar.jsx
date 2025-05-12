import React from 'react';

const CATEGORIES = [
  "Digital Marketing", "Content Marketing", "Social Media Marketing",
  "Email Marketing", "SEO & SEM", "Influencer Marketing",
  "Brand Development", "Market Research"
];

export default function Sidebar({ selected, onSelect }) {
  return (
    <aside className="sidebar">
      <h2>Marketing Advisor</h2>
      <label>Focus area</label>
      <select
        value={selected}
        onChange={e => onSelect(e.target.value)}
      >
        {CATEGORIES.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <hr />
      <button onClick={() => onSelect(selected)}>Refresh Ideas</button>
      <hr />
      <button onClick={() => { localStorage.clear(); window.location.reload(); }}>
        Clear History
      </button>
    </aside>
  );
}

