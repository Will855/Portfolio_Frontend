import React from 'react';

export const HeroCTA: React.FC = () => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
            <a 
                href="/proyectos" 
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_rgba(37,99,235,0.7)] transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
            >
                Ver Proyectos
            </a>
            <a 
                href="/contacto" 
                className="px-8 py-3 bg-transparent border-2 border-slate-400 hover:border-slate-200 text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-300 w-full sm:w-auto"
            >
                Contáctame
            </a>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};
