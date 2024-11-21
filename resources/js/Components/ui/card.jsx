// /components/ui/card/Card.jsx
import React from 'react';

// Card Component
const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

// CardHeader Component
const CardHeader = ({ children, className }) => {
  return (
    <div className={`p-4 border-b ${className}`}>
      {children}
    </div>
  );
};

// CardContent Component
const CardContent = ({ children, className }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

// CardTitle Component
const CardTitle = ({ children, className }) => {
  return (
    <h3 className={`text-xl font-semibold ${className}`}>
      {children}
    </h3>
  );
};

// Export all components
export { Card, CardHeader, CardContent, CardTitle };
