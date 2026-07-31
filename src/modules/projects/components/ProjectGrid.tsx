'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Card from "./ProjectCard";
import { useCards } from "../hooks/useCards";
import { trackSearchExecution } from "../../../core/utils/analytics";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Grid: React.FC = () => {
  const { cards } = useCards();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce de 1000ms para rastrear las búsquedas del usuario en n8n
  useEffect(() => {
    if (!searchQuery.trim()) return;

    const timer = setTimeout(() => {
      trackSearchExecution(searchQuery, selectedCategory);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  const categories = ["Todos", "Frontend", "Backend", "Automatizaciones AI", "Full Stack"];

  // Filter logic
  const filteredCards = cards.filter((card) => {
    const matchesCategory = selectedCategory === "Todos" || card.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesTitle = card.title?.toLowerCase().includes(query);
    const matchesDescription = card.description?.toLowerCase().includes(query);
    const matchesTags = Array.isArray(card.tags) && card.tags.some(tag => tag.toLowerCase().includes(query));

    return matchesCategory && (matchesTitle || matchesDescription || matchesTags);
  });

  useGSAP(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.5)", clearProps: "all" }
      );
    }
  }, [filteredCards]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-8">
      {/* Search & Category Filter Controls */}
      <div className="flex flex-col gap-6 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/10">
        
        {/* Search Input (Glassmorphic) */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título, descripción o etiquetas..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-400
                       focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Categories Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300
                         active:scale-95 border ${
                           selectedCategory === cat
                             ? "bg-gradient-to-r from-blue-600 to-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/25"
                             : "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/10"
                         }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredCards.length === 0 && (
        <div className="text-center py-16 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all">
          <svg className="w-16 h-16 mx-auto text-slate-500 mb-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-slate-400 text-lg font-medium">No se encontraron proyectos</p>
          <p className="text-slate-500 text-sm mt-1">Prueba con otra búsqueda o selecciona una categoría diferente.</p>
        </div>
      )}

      {/* Grid of Projects */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
      >
        {filteredCards.map((card) => (
          <div key={card.id}>
            <Link href={`/page/${card.id}`}>
              <Card
                id={card.id}
                title={card.title}
                description={card.description}
                img={card.img}
                buttonText={card.buttonText}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;