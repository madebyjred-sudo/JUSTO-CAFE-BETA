import React from 'react';
import { ScaAttributes } from '../types';

interface ScaChartProps {
  attributes: ScaAttributes;
  size?: number;
}

export const ScaChart: React.FC<ScaChartProps> = ({ attributes, size = 300 }) => {
  // Constants for chart
  const SIZE = size;
  const CENTER = SIZE / 2;
  const RADIUS = (SIZE / 3) * 0.95; // Adjusted radius to fit labels
  const MAX_VALUE = 10;
  
  // Attributes in clockwise order matching the standard SCA sheet
  // Order: Fragrance/Aroma, Flavor, Aftertaste, Acidity, Body, Balance, Uniformity, Clean Cup, Sweetness, Overall
  const attributeKeys: (keyof ScaAttributes)[] = [
    'fragrance',
    'flavor',
    'aftertaste',
    'acidity',
    'body',
    'balance',
    'uniformity',
    'cleanCup',
    'sweetness',
    'overall'
  ];

  const labels = {
    fragrance: 'Fragancia',
    flavor: 'Sabor',
    aftertaste: 'Residual',
    acidity: 'Acidez',
    body: 'Cuerpo',
    balance: 'Balance',
    uniformity: 'Uniformidad',
    cleanCup: 'Taza Limpia',
    sweetness: 'Dulzura',
    overall: 'Puntaje Catador'
  };

  // Helper to get coordinates for a point on the radar
  const getCoordinates = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = (value / MAX_VALUE) * RADIUS;
    const x = CENTER + r * Math.cos(angle);
    const y = CENTER + r * Math.sin(angle);
    return { x, y };
  };

  // Generate path points
  const points = attributeKeys.map((key, i) => {
    const value = attributes[key];
    const { x, y } = getCoordinates(value, i, attributeKeys.length);
    return `${x},${y}`;
  }).join(' ');

  // Generate grid levels (2, 4, 6, 8, 10)
  const gridLevels = [2, 4, 6, 8, 10];

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full drop-shadow-sm">
      {/* Background Grid */}
      {gridLevels.map((level) => (
        <g key={level}>
          <path
            d={attributeKeys.map((_, i) => {
              const { x, y } = getCoordinates(level, i, attributeKeys.length);
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ') + ' Z'}
            fill="none"
            stroke="#EBE5D9"
            strokeWidth="1"
            className="transition-all duration-300"
          />
          {/* Axis Labels (numbers) */}
          <text
            x={CENTER}
            y={CENTER - (level / MAX_VALUE) * RADIUS - 5}
            textAnchor="middle"
            className="text-[8px] fill-justo-dark/30 font-sans"
          >
            {level}
          </text>
        </g>
      ))}

      {/* Axis Lines */}
      {attributeKeys.map((_, i) => {
        const { x, y } = getCoordinates(MAX_VALUE, i, attributeKeys.length);
        return (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke="#EBE5D9"
            strokeWidth="1"
          />
        );
      })}

      {/* Data Path (Area) */}
      <path
        d={`M ${points} Z`}
        fill="rgba(196, 164, 132, 0.2)" // Light Justo Brown
        stroke="#C4A484" // Justo Brown
        strokeWidth="2"
        className="drop-shadow-md"
      />

      {/* Data Points (Dots) */}
      {attributeKeys.map((key, i) => {
        const value = attributes[key];
        const { x, y } = getCoordinates(value, i, attributeKeys.length);
        return (
          <circle
            key={key}
            cx={x}
            cy={y}
            r="4"
            fill="#FDFBF7" // Light Background
            stroke="#2C2420" // Justo Dark
            strokeWidth="2"
            className="hover:scale-125 transition-transform duration-200 cursor-pointer"
          >
            <title>{`${labels[key]}: ${value}`}</title>
          </circle>
        );
      })}

      {/* Labels */}
      {attributeKeys.map((key, i) => {
        const { x, y } = getCoordinates(MAX_VALUE + 1.8, i, attributeKeys.length);
        
        // Adjust anchor based on position to prevent overlap
        let textAnchor = "middle";
        if (x < CENTER - 10) textAnchor = "end";
        if (x > CENTER + 10) textAnchor = "start";

        // Adjust baseline
        let dominantBaseline = "middle";
        if (y < CENTER - 10) dominantBaseline = "auto";
        if (y > CENTER + 10) dominantBaseline = "hanging";

        return (
          <text
            key={`label-${i}`}
            x={x}
            y={y}
            textAnchor={textAnchor}
            dominantBaseline={dominantBaseline}
            className="text-[10px] fill-justo-dark/70 font-body uppercase tracking-wider font-bold"
          >
            {labels[key]}
          </text>
        );
      })}
    </svg>
  );
};
