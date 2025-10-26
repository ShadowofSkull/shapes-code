'use client';

import React from 'react';
import { colorMap } from '@/lib/utils';

interface ShapeDisplayProps {
  shape: string;
  color: string;
  size?: number;
}

export default function ShapeDisplay({ shape, color, size = 80 }: ShapeDisplayProps) {
  const shapeStyle: React.CSSProperties = {
    color: colorMap[color],
    width: size,
    height: size,
  };

  const renderShape = () => {
    switch (shape) {
      case 'circle':
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="45" fill="currentColor" />
          </svg>
        );
      case 'square':
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <rect x="10" y="10" width="80" height="80" fill="currentColor" />
          </svg>
        );
      case 'triangle':
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <polygon points="50,5 95,95 5,95" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  return <div style={shapeStyle}>{renderShape()}</div>;
}