'use client';

import React from "react";
import Link from "next/link";
import Card from "./ProjectCard";
import { useCards } from "../hooks/useCards";

export const FeaturedProjects: React.FC = () => {
    const { cards, isLoading } = useCards();

    // Ordenar por fecha de actualización (más recientes primero) y tomar los 3 primeros
    const featuredCards = [...cards]
        .sort((a, b) => {
            const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
            const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
            return dateB - dateA;
        })
        .slice(0, 3);

    if (isLoading || featuredCards.length === 0) return null;

    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-16">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-3">
                        Proyectos Recientes
                    </h2>
                    <p className="text-slate-400">Una selección de mi trabajo reciente.</p>
                </div>
                <Link 
                    href="/proyectos" 
                    className="hidden sm:flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors group"
                >
                    Ver todos
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {featuredCards.map((card) => (
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
            
            <div className="mt-8 text-center sm:hidden">
                <Link 
                    href="/proyectos" 
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors group px-6 py-3 bg-blue-500/10 rounded-full"
                >
                    Ver todos los proyectos
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>
        </section>
    );
};
