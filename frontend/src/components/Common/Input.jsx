import React from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const Input = ({ 
  label, 
  error, 
  icon: Icon, 
  type = 'text', 
  className = '', 
  showPasswordToggle = false,
  ...props 
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password') 
    : type;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={inputType}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
            error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-200 focus:border-violet-500 focus:ring-violet-500'
          } focus:outline-none focus:ring-2 ${Icon ? 'pl-10' : ''} ${
            showPasswordToggle ? 'pr-10' : ''
          }`}
          {...props}
        />
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center mt-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
