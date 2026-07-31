"use client";

import React, { useState, KeyboardEvent } from 'react';

interface TagInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const TagInput: React.FC<TagInputProps> = ({ value, onChange, placeholder, className }) => {
  const [inputValue, setInputValue] = useState('');
  
  // Convert comma separated string to array for rendering
  const tags = value ? value.split(',').map(t => t.trim()).filter(Boolean) : [];

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.includes(',')) {
      // If they pasted a comma separated list
      const newTags = val.split(',').map(t => t.trim()).filter(Boolean);
      const combined = [...tags, ...newTags];
      const uniqueTags = Array.from(new Set(combined));
      onChange(uniqueTags.join(', '));
      setInputValue('');
    } else {
      setInputValue(val);
    }
  };

  const addTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !tags.includes(newTag)) {
      const newTags = [...tags, newTag];
      onChange(newTags.join(', '));
    }
    setInputValue('');
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    onChange(newTags.join(', '));
  };

  return (
    <div className={`flex flex-wrap gap-2 px-3 py-2 items-center rounded-xl bg-white/5 border border-white/10 transition-all focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20 ${className || ''}`}>
      {tags.map((tag, index) => (
        <span 
          key={index} 
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-md"
        >
          {tag}
          <button 
            type="button" 
            onClick={() => removeTag(index)}
            className="text-blue-400 hover:text-white focus:outline-none flex items-center justify-center rounded-full w-4 h-4 hover:bg-blue-500/20 transition-colors"
            aria-label="Remove tag"
          >
            &times;
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none min-w-[120px] text-sm"
      />
    </div>
  );
};
