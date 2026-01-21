import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

interface LottiePlayerProps {
  src: string;
  className?: string;
  loop?: boolean;
}

export const LottiePlayer: React.FC<LottiePlayerProps> = ({ src, className, loop = true }) => {
  const [animationData, setAnimationData] = useState<any>(null);
  const [error, setError] = useState(false);
  // Track loading specifically to show placeholder
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setError(false);
    setIsLoading(true);
    
    fetch(src)
      .then(async res => {
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        const text = await res.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            throw new Error("Invalid JSON");
        }
      })
      .then(data => {
        if (isMounted) {
            setAnimationData(data);
            setIsLoading(false);
        }
      })
      .catch(err => {
        // Log warning instead of error to not clutter console for intended fallbacks
        console.warn("Warning loading lottie:", err);
        if (isMounted) {
            setError(true);
            setIsLoading(false);
        }
      });
      
    return () => { isMounted = false; };
  }, [src]);

  if (error) {
    // Fallback static icon if lottie fails
    return (
        <div className={`${className} flex items-center justify-center opacity-50`}>
             <div className="w-8 h-8 rounded-full border-2 border-justo-brown/20 border-t-justo-brown animate-spin"></div>
        </div>
    );
  }

  // Show a subtle placeholder while the JSON downloads so the space isn't empty
  if (isLoading || !animationData) {
      return (
        <div className={`${className} flex items-center justify-center`}>
            {/* Minimalist loader matching brand colors */}
            <div className="flex space-x-1">
                <div className="w-2 h-2 bg-justo-brown rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-justo-brown rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-justo-brown rounded-full animate-bounce"></div>
            </div>
        </div>
      );
  }

  return <Lottie animationData={animationData} loop={loop} className={className} />;
};