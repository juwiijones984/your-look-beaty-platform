import React, { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useEmergency } from '../contexts/EmergencyContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  enableEmergency?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', enableEmergency = false }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const { activateEmergency } = useEmergency();

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const handlePressStart = () => {
    if (!enableEmergency) return;
    
    setIsPressed(true);
    setProgress(0);

    // Start progress animation
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval.current!);
          return 100;
        }
        return prev + 5; // Complete in 2 seconds (20 intervals * 100ms)
      });
    }, 100);

    // Trigger emergency after 2 seconds
    timerRef.current = setTimeout(() => {
      // Get mock location (in real app, use geolocation API)
      activateEmergency({
        lat: -26.2041,
        lng: 28.0473,
        address: 'Current Location',
      });
      
      // Vibrate if supported
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
      
      resetPress();
    }, 2000);
  };

  const handlePressEnd = () => {
    resetPress();
  };

  const resetPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    setIsPressed(false);
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      resetPress();
    };
  }, []);

  return (
    <div className="relative inline-flex items-center">
      <div
        className="relative"
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        {/* Progress ring */}
        {isPressed && (
          <svg
            className="absolute inset-0 -m-1 pointer-events-none"
            viewBox="0 0 40 40"
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray={`${progress * 1.13} 113`}
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
              className="transition-all duration-100"
            />
          </svg>
        )}

        <img
          src="/your_look_logo.png"
          alt="Your Look Logo"
          className={`${sizeClasses[size]} rounded-lg relative`}
        />
      </div>
    </div>
  );
};
