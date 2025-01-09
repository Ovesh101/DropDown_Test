import React, { useState, useEffect, useRef } from "react";
import { XCircle } from "lucide-react"; // Import the XCircle icon

interface Option {
  label: string;
  color: string;
}

interface ColorDropdownProps {
  options: Option[];
  onSelect: (color: string) => void; 
}

const ColorDropdown: React.FC<ColorDropdownProps> = ({ options, onSelect }) => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null); 

 
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChange = (color: string) => {
    setSearchQuery(color); 
    setSelectedColor(color); 
    onSelect(color); 
    setIsDropdownOpen(false); 
  };

  const handleClearSearch = () => {
    setSearchQuery(""); 
    setSelectedColor("")
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); 
  };

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-[80vw]">
   
      <div className="flex items-center space-x-2 mb-2">
        <input
          type="text"
          placeholder="Search color..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
          onClick={handleToggleDropdown} 
          onKeyDown={(e) => {
           
            if (e.key === "Backspace") {
              setSearchQuery(""); 
              setSelectedColor("")
            }
          }}
          className="px-4 py-2 relative border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {searchQuery && (
          <>
          
            <div className="h-5 w-px absolute right-9 bg-gray-400 mx-4" />{" "}
       
            <button
              onClick={handleClearSearch}
              className="text-gray-500 right-12 absolute"
              aria-label="Clear search"
            >
              <XCircle size={20} />
            </button>
          </>
        )}
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef} 
          className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10"
        >
<ul className="max-h-60 overflow-y-auto">
  {filteredOptions.length === 0 && !selectedColor ? (
    <li className="py-2 px-4 text-gray-500">No results found</li>
  ) : selectedColor ? (
    options.map((option, index) => (
      <li
        key={index}
        onClick={() => handleSelectChange(option.color)} // Select color
        className={`py-2 px-4 cursor-pointer hover:bg-blue-100 ${
          option.color === selectedColor ? "bg-blue-200" : ""
        }`}
      >
        {option.label}
      </li>
    ))
  ) : (
    filteredOptions.map((option, index) => (
      <li
        key={index}
        onClick={() => handleSelectChange(option.color)} // Select color
        className={`py-2 px-4 cursor-pointer hover:bg-blue-100 ${
          option.color === searchQuery ? "bg-blue-200" : ""
        }`}
      >
        {option.label}
      </li>
    ))
  )}
</ul>

        </div>
      )}

    
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default ColorDropdown;
