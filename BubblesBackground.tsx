import React, { useMemo } from 'react';

export default function BubblesBackground() {
  // Generate random dots with different sizes and speeds
  const dots = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: Math.random() * 12 + 4, // 4-16px
      left: Math.random() * 100, // 0-100%
      duration: Math.random() * 15 + 15, // 15-30s
      delay: Math.random() * -30, // Start at different points
      opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4
      color: Math.random() > 0.6 ? 'bg-purple-400' : Math.random() > 0.3 ? 'bg-blue-400' : 'bg-pink-400',
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {dots.map((dot) => {
        return (
          <div
            key={dot.id}
            className={`absolute rounded-full ${dot.color} blur-[1px]`}
            style={{
              width: dot.size,
              height: dot.size,
              left: `${dot.left}%`,
              bottom: '-10%',
              opacity: dot.opacity,
              animation: `floatUp ${dot.duration}s linear ${dot.delay}s infinite`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          33% {
            transform: translateY(-40vh) translateX(30px) rotate(120deg);
          }
          66% {
            transform: translateY(-80vh) translateX(-30px) rotate(240deg);
          }
          100% {
            transform: translateY(-120vh) translateX(0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
