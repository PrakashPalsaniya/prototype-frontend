// src/components/common/Loading.jsx
import React from 'react';

const Loading = ({ message = "Loading...", size = "medium" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8", 
    large: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`${sizeClasses[size]} border-4 border-neutral-200 border-t-primary-600 rounded-full animate-spin`}></div>
      <p className="mt-4 text-neutral-600 animate-pulse-soft">{message}</p>
    </div>
  );
};

export default Loading;
