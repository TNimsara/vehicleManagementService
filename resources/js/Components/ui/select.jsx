// /components/ui/select/Select.jsx
import React, { useState } from 'react';

// Select Component (Wrapper for Select functionality)
const Select = ({ children, className }) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};

// SelectTrigger Component (Button to trigger the dropdown)
const SelectTrigger = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white border border-gray-300 rounded-md p-2 w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </button>
  );
};

// SelectContent Component (Container for the dropdown options)
const SelectContent = ({ children, className }) => {
  return (
    <div className={`absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full ${className}`}>
      {children}
    </div>
  );
};

// SelectItem Component (Individual Option inside the dropdown)
const SelectItem = ({ children, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${className}`}
    >
      {children}
    </div>
  );
};

// SelectValue Component (Shows the selected value)
const SelectValue = ({ value, className }) => {
  return (
    <div className={`p-2 text-gray-700 ${className}`}>
      {value}
    </div>
  );
};

// Export all components
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
