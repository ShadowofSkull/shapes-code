'use client';

import React from 'react';
import { colorMap } from '@/lib/utils';

interface FloatingShapeProps {
  shape: string;
  color: string;
  size: number;
  opacity: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
}

const FloatingShape: React.FC<FloatingShapeProps> = ({
  shape,
  color,
  size,
  opacity,
  top,
  left,
  duration,
  delay,
}) => {
  const shapeStyle: React.CSSProperties = {
    position: 'absolute',
    top,
    left,
    width: size,
    height: size,
    opacity,
    animation: `float ${duration}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    color: colorMap[color],
  };

  const renderShape = () => {
    switch (shape) {
      case 'circle':
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </svg>
        );
      case 'square':
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <rect x="15" y="15" width="70" height="70" fill="currentColor" />
          </svg>
        );
      case 'triangle':
        return (
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <polygon points="50,10 90,90 10,90" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  return <div style={shapeStyle}>{renderShape()}</div>;
};

export default function FloatingBackground() {
  const shapes: FloatingShapeProps[] = [
    // Far layer (small, faded)
    { shape: 'circle', color: 'red', size: 30, opacity: 0.2, top: '10%', left: '15%', duration: 25, delay: 0 },
    { shape: 'square', color: 'blue', size: 25, opacity: 0.2, top: '20%', left: '75%', duration: 22, delay: 2 },
    { shape: 'triangle', color: 'yellow', size: 28, opacity: 0.2, top: '5%', left: '50%', duration: 24, delay: 4 },
    { shape: 'circle', color: 'green', size: 32, opacity: 0.2, top: '15%', left: '85%', duration: 26, delay: 1 },
    // Mid layer (medium)
    { shape: 'square', color: 'yellow', size: 50, opacity: 0.3, top: '35%', left: '20%', duration: 18, delay: 3 },
    { shape: 'triangle', color: 'red', size: 55, opacity: 0.3, top: '40%', left: '70%', duration: 20, delay: 1 },
    { shape: 'circle', color: 'blue', size: 45, opacity: 0.3, top: '50%', left: '45%', duration: 19, delay: 5 },
    { shape: 'square', color: 'green', size: 52, opacity: 0.3, top: '60%', left: '10%', duration: 21, delay: 2 },
    // Near layer (large, more transparent)
    { shape: 'triangle', color: 'blue', size: 90, opacity: 0.15, top: '70%', left: '65%', duration: 15, delay: 0 },
    { shape: 'circle', color: 'yellow', size: 100, opacity: 0.15, top: '75%', left: '25%', duration: 16, delay: 4 },
    { shape: 'square', color: 'red', size: 85, opacity: 0.15, top: '80%', left: '80%', duration: 14, delay: 2 },
    { shape: 'triangle', color: 'green', size: 95, opacity: 0.15, top: '85%', left: '5%', duration: 17, delay: 3 },
  ];
  
  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-15px) rotate(3deg) scale(1.02);
          }
          50% {
            transform: translateY(-25px) rotate(-2deg) scale(0.98);
          }
          75% {
            transform: translateY(-10px) rotate(4deg) scale(1.01);
          }
        }
      `}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-gradient-to-br from-yellow-50 to-orange-50">
        {shapes.map((props, index) => (
          <FloatingShape key={index} {...props} />
        ))}
      </div>
    </>
  );
}