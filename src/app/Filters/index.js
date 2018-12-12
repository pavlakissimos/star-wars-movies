import React from 'react';

const Filters = ({ items, showing, selectedFilter, selectFilter }) => (
  <div className={`dropdown-menu ${showing ? 'show' : ''}`}>
    {items.length &&
      items.map((item, i) => (
        <a
          key={i}
          href="#"
          className={`dropdown-item ${selectedFilter === item ? 'active' : ''}`}
          onClick={() => selectFilter(item)}
        >
          {item}
        </a>
      ))}
    <a href="#" className="dropdown-item" onClick={() => selectFilter('')}>
      Reset
    </a>
  </div>
);

export default Filters;
