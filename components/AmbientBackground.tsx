import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      
      {/* 1. Grain/Noise Texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-40 mix-blend-soft-light z-[5]"></div>

      {/* 2. Grid Shimmer Pattern */}
      <div className="absolute inset-0 bg-grid-pattern z-[1]"></div>

      {/* 3. Soft Animated Gradient Blobs (Parallax Shapes) */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-justo-brown/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-justo-beige/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-justo-brown/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* 4. Particle Drift (Simulated with simple small divs) */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-justo-brown/20 rounded-full animate-drift"></div>
      <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-justo-brown/10 rounded-full animate-drift animation-delay-2000"></div>
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-justo-brown/20 rounded-full animate-drift animation-delay-4000"></div>

      {/* 5. Light Field / Beam (Subtle large gradient wash) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-30 z-[2]"></div>
    </div>
  );
};