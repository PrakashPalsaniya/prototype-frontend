// src/components/common/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  loading = false, 
  className = '', 
  as = 'button',
  ...props 
}) => {
  const Component = as;
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-200",
    secondary: "bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50 focus:ring-primary-200",
    outline: "border-2 border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 focus:ring-neutral-200",
    ghost: "text-primary-600 hover:bg-primary-50 focus:ring-primary-200",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-200"
  };
  
  const sizes = {
    small: "px-3 py-2 text-sm",
    medium: "px-6 py-3",
    large: "px-8 py-4 text-lg"
  };

  return (
    <Component
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
      )}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </Component>
  );
};

export default Button;
