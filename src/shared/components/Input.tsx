// Importación de React
"use client";
import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  animate?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  animate = false,
  className = '',
  ...props 
}) => {
  const inputRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (animate && inputRef.current) {
      gsap.to(inputRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    }
  }, [animate]);

  return (
    <div 
      ref={inputRef} 
      className={`form-item relative ${animate ? 'opacity-0 translate-y-5' : ''} ${className}`}
    >
      <label
        htmlFor={props.id || props.name}
        className={`block mb-2 font-medium transition-colors duration-300 origin-left ${
          error ? 'text-red-400' : 'text-slate-200'
        }`}
      >
        {label}
      </label>
      <div className="relative transform-gpu">
        <input
          {...props}
          id={props.id || props.name}
          className={`w-full px-4 py-3 text-white bg-white/5 border-2 rounded-xl backdrop-blur-sm focus:outline-none transition-all duration-300 ${
            error
              ? 'border-red-500/50 focus:border-red-500'
              : 'border-white/10 hover:border-white/20 focus:border-blue-400/50'
          }`}
        />
        {!error && (
          <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 w-0" />
        )}
      </div>
    </div>
  );
};