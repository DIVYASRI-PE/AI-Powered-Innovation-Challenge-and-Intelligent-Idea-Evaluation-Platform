import React from 'react';

const Textarea = ({ 
  label, 
  error, 
  rows = 4, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none ${
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-200 focus:border-violet-500 focus:ring-violet-500'
        } focus:outline-none focus:ring-2`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Textarea;
