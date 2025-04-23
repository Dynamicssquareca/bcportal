// components/DropdownComponent.js
import React, { useState ,useEffect  } from 'react';

const DropdownComponent = ({ id, label, items }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  // Function to close the dropdown on outside click
  const handleOutsideClick = (event) => {
    if (dropdownOpen && !event.target.closest('.dropdown')) {
      setDropdownOpen(false);
    }
  };

  // Add event listener to handle outside click
//   useEffect(() => {
//     document.addEventListener('click', handleOutsideClick);
//     return () => {
//       document.removeEventListener('click', handleOutsideClick);
//     };
//   }, [dropdownOpen]);

  return (
    <div className="dropdown">
      <li className="dropdown-toggle" onClick={toggle}>
        {label}
      </li>
      {dropdownOpen && (
        <div className="dropdown-menu" aria-labelledby={id}>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
