import React from 'react';
import ColorDropdown from './components/DropDown';


const App: React.FC = () => {
  // Define the color options dynamically
  const colorOptions = [
    { label: 'Red', color: 'Red' },
    { label: 'Blue', color: 'Blue' },
    { label: 'Green', color: 'Green' },
    { label: 'Yellow', color: 'Yellow' },
    { label: 'Purple', color: 'Purple' },
  ];

  const handleColorSelect = (color: string) => {
    console.log('Selected color:', color);
  };

  return (
    <div className="p-6  ">
      <ColorDropdown options={colorOptions} onSelect={handleColorSelect} />
    </div>
  );
};

export default App;
