
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-4',
  };

  return (
    <div
      className={`${sizeClasses[size]} border-white dark:border-gray-900 border-t-primary-500 dark:border-t-primary-400 rounded-full animate-spin`}
      role="status"
    >
      <span className="sr-only">Đang tải...</span>
    </div>
  );
};
   