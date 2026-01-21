import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'cream';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  // Added focus-visible styles for accessibility
  const baseStyles = "relative overflow-hidden font-body uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-golden-md font-bold hover:scale-105 active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-justo-brown";
  
  const variants = {
    primary: "bg-justo-dark text-justo-cream shadow-md hover:shadow-justo-brown/40 hover:shadow-xl",
    secondary: "bg-justo-brown text-white hover:bg-justo-dark shadow-md",
    outline: "border border-justo-dark text-justo-dark hover:bg-justo-dark hover:text-justo-cream",
    cream: "bg-justo-cream text-justo-dark hover:bg-white shadow-lg"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`} 
      {...props}
    >
      {/* Beam/Sheen Effect on Hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
      
      {/* Content z-index to stay above sheen */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};