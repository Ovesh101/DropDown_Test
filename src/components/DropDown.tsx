import React, { useState, useEffect, useRef } from "react";
import { XCircle } from "lucide-react"; // Import the XCircle icon

interface Option {
  label: string;
  color: string;
}

interface ColorDropdownProps {
  options: Option[];
  onSelect: (color: string) => void; // Callback function to handle color selection
}

const ColorDropdown: React.FC<ColorDropdownProps> = ({ options, onSelect }) => {
  const [selectedColor, setSelectedColor] = useState<string>(""); // Store selected color
  const [searchQuery, setSearchQuery] = useState<string>(""); // Store search query
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // Dropdown open state

  const dropdownRef = useRef<HTMLDivElement>(null); // Reference for dropdown container

  // Filter options based on search query
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChange = (color: string) => {
    setSearchQuery(color); // Set search query to the selected color
    setSelectedColor(color); // Set selected color for display in input field
    onSelect(color); // Notify parent of the selected color
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const handleClearSearch = () => {
    setSearchQuery(""); // Clear search query
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle dropdown open/close
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false); // Close dropdown if clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-[80vw]">
      {/* Search Input with Clear Button */}
      <div className="flex items-center space-x-2 mb-2">
        <input
          type="text"
          placeholder="Search color..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Updates search query
          onClick={handleToggleDropdown} // Toggle dropdown on input click
          onKeyDown={(e) => {
            // Check if the key pressed is 'Backspace'
            if (e.key === "Backspace") {
              setSearchQuery(""); // Clear the search query immediately
            }
          }}
          className="px-4 py-2 relative border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {searchQuery && (
          <>
            {/* Vertical Line */}
            <div className="h-5 w-px absolute right-9 bg-gray-400 mx-4" />{" "}
            {/* Small vertical line */}
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

      {/* Dropdown - Select with Options */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef} // Attach ref to dropdown container
          className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10"
        >
          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <li className="py-2 px-4 text-gray-500">No results found</li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectChange(option.color)} // Select color
                  className={`py-2 px-4 cursor-pointer hover:bg-blue-100 ${
                    option.color === searchQuery ? "bg-blue-200" : ""
                  }`} // Highlight selected color
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Dropdown Arrow Icon */}
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
