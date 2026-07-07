import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  className = '', 
  icon: Icon,
  iconPosition = 'left',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-500/30',
    secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300',
    danger: 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:shadow-lg hover:shadow-red-500/30',
    success: 'bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-lg hover:shadow-emerald-500/30',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    outline: 'bg-transparent border-2 border-violet-600 text-violet-600 hover:bg-violet-50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const baseClasses = 'font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </button>
  );
};

export default Button;
