// /components/ui/input/Input.jsx
import React from 'react';

// Input Component (Text input field)
const Input = ({ value, onChange, placeholder, className, type = 'text', ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export { Input };
