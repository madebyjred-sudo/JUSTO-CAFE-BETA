import React from 'react';

interface CoffeeLoaderProps {
  className?: string;
  color?: string; 
}

export const CoffeeLoader: React.FC<CoffeeLoaderProps> = ({ 
  className = "", 
}) => {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
       <style>
        {`
          @keyframes elegant-pulse {
            0%, 100% { opacity: 0.2; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          // Reduced size to w-1.5 h-1.5 (6px) for subtlety
          className="w-1.5 h-1.5 rounded-full bg-justo-dark"
          style={{
            animation: 'elegant-pulse 1.4s infinite ease-in-out both',
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};