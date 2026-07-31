"use client";

import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: boolean;
  animate?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({ 
  label, 
  error, 
  animate = false,
  className = '',
  ...props 
}) => {
  const textareaRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (animate && textareaRef.current) {
      gsap.to(textareaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    }
  }, [animate]);

  return (
    <div 
      ref={textareaRef} 
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
      <textarea
        {...props}
        id={props.id || props.name}
        className={`w-full px-4 py-3 text-white bg-white/5 border-2 rounded-xl backdrop-blur-sm focus:outline-none transition-all duration-300 resize-none ${
          error
            ? 'border-red-500/50 focus:border-red-500'
            : 'border-white/10 hover:border-white/20 focus:border-blue-400/50'
        }`}
      />
    </div>
  );
};
