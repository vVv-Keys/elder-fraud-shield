import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  highContrast?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...', 
  highContrast = false 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin ${
        highContrast ? 'text-blue-400' : 'text-blue-600'
      }`} />
      {text && (
        <p className={`text-sm font-medium ${
          highContrast ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;