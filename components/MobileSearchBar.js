'use client';
import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function MobileSearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  const toggleSearch = () => setIsOpen(!isOpen);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="position-relative d-flex align-items-center">
      {/* Search / Close Icon Button */}
      <button
        className="btn btn-outline-secondary border-0 p-2"
        onClick={toggleSearch}
        aria-label={isOpen ? 'Close search' : 'Open search'}
      >
        <i
          className={`bi ${isOpen ? 'bi-x-lg' : 'bi-search'}`}
          style={{ fontSize: '1.3rem' }}
        ></i>
      </button>

      {/* Search Input - appears only when isOpen */}
      {isOpen && (
        <div className="position-absolute top-100 start-0 w-100 mt-2 px-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            autoFocus
          />
        </div>
      )}
    </div>
  );
}
