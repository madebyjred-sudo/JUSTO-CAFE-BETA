import React, { useState } from 'react';
import { ScaAttributes } from '../types';
import { ChevronDown, Award } from 'lucide-react';
import { ScaChart } from './ScaChart';

interface ScaSheetProps {
  score: number;
  attributes: ScaAttributes;
  isOpen?: boolean;
}

export const ScaSheet: React.FC<ScaSheetProps> = ({ score, attributes }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="w-full border border-justo-brown rounded-lg overflow-hidden bg-[#FDFBF7]">
      {/* Header / Toggle */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-justo-cream/20 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <Award className="text-justo-brown" size={24} />
          <h3 className="font-body font-bold text-xl text-justo-dark uppercase tracking-wide">
            Puntaje SCA ({score})
          </h3>
        </div>
        <ChevronDown 
          className={`text-justo-dark transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          size={20} 
        />
      </button>

      {/* Chart Content */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 flex flex-col items-center">
          <div className="relative w-full max-w-[350px] aspect-square">
            <ScaChart attributes={attributes} size={300} />
          </div>
        </div>
      </div>
    </div>
  );
};
