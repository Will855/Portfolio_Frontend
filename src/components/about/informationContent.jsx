import React from "react";
import WordCloud from '../animations/cloudWords';
import SecondaryButton from "../buttons/secondaryBtn";
import PrimaryButton from "../buttons/primaryBtn";

const InformationContent = () => {
    return (
        <section className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-4xl">
            <div className="p-6 sm:p-8 lg:p-10 text-slate-50 flex flex-col gap-8 sm:gap-12 backdrop-blur-lg bg-white/5 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-white/10">
                
                {/* Sección Quién soy */}
                <article className="space-y-4 sm:space-y-6">
                    <h2 className="font-semibold text-4xl sm:text-5xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent h-16">
                        ¿Quién soy?
                    </h2>
                    <div className="space-y-6 text-base sm:text-lg leading-relaxed sm:leading-loose opacity-90">
                        <p className="text-justify">
                            Desarrollador web full-stack con 3+ años de experiencia construyendo sitios y aplicaciones modernas, escalables y centradas en el usuario.
                        </p>
                        
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="p-4 bg-white/5 rounded-lg">
                                <h3 className="font-medium text-blue-300 mb-2">Tecnologías clave</h3>
                                <ul className="space-y-1 text-sm">
                                    <li>React (3 años)</li>
                                    <li>JavaScript (4 años)</li>
                                    <li>TypeScript (2 años)</li>
                                    <li>PHP (1 año)</li>
                                    <li>SQL (1 año)</li>
                                </ul>
                            </div>
                            
                            <div className="p-4 bg-white/5 rounded-lg">
                                <h3 className="font-medium text-purple-300 mb-2">Herramientas</h3>
                                <ul className="space-y-1 text-sm">
                                    <li>HTML/CSS</li>
                                    <li>Tailwind</li>
                                    <li>GSAP</li>
                                    <li>Bootstrap</li>
                                </ul>
                            </div>
                            
                            <div className="p-4 bg-white/5 rounded-lg">
                                <h3 className="font-medium text-green-300 mb-2">Enfoque</h3>
                                <ul className="space-y-1 text-sm">
                                    <li>Optimización SEO</li>
                                    <li>Diseño UI/UX</li>
                                    <li>Contenido estratégico</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Nube de palabras */}
                <div className=" w-full animate-fade-in">
                    <WordCloud />
                </div>

                {/* Proyectos Destacados */}
                <article className="space-y-6">
                    <h2 className="font-semibold text-3xl sm:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                        🚀 Proyectos Destacados
                    </h2>
                    
                    <ul className="space-y-8">
                        <li className="group relative pl-6 border-l-2 border-blue-400/30 hover:border-blue-400 transition-colors">
                            <div className="absolute left-[-9px] top-3 w-4 h-4 bg-blue-400 rounded-full opacity-30 group-hover:opacity-100 transition-opacity"/>
                            <h3 className="text-xl font-medium mb-2">🛒 E-commerce de teclados</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>• Desarrollo con Javascript</li>
                                <li>• Animaciones GSAP ScrollTrigger</li>
                                <li>• Diseño responsive con Tailwind</li>
                                <li>• Optimización Core Web Vitals ≥90</li>
                            </ul>
                        </li>
                        
                        <li className="group relative pl-6 border-l-2 border-purple-400/30 hover:border-purple-400 transition-colors">
                            <div className="absolute left-[-9px] top-3 w-4 h-4 bg-purple-400 rounded-full opacity-30 group-hover:opacity-100 transition-opacity"/>
                            <h3 className="text-xl font-medium mb-2">✂️ Sitio para barbería</h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>• Arquitectura HTML/CSS + Tailwind</li>
                                <li>• Sistema de reservas integrado</li>
                                <li>• Mejora de tasa de conversión en 35%</li>
                                <li>• Diseño mobile-first</li>
                            </ul>
                        </li>
                    </ul>
                </article>

                {/* Formación */}
                <article className="space-y-4">
                    <h2 className="font-semibold text-3xl sm:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                        🎓 Formación
                    </h2>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                        <p className="text-lg font-medium">Ingeniería de Sistemas</p>
                        <p className="text-sm text-slate-300">5to semestre en curso</p>
                        <p className="mt-2 text-slate-300">Especialización en desarrollo web y mejores prácticas de UX</p>
                    </div>
                </article>

                {/* Valor diferencial */}
                <article className="space-y-4">
                    <h2 className="font-semibold text-3xl sm:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                        💡 Valor único
                    </h2>
                    <div className="p-4 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-lg border border-white/10">
                        <p className="text-lg font-medium mb-2">Perfeccionismo creativo</p>
                        <p className="text-slate-300">
                            Combino atención al detalle con enfoque estratégico 
                        </p>
                        <ul className="mt-2 space-y-2 text-sm">
                            <li>• Código limpio y mantenible</li>
                            <li>• Diseños coherentes y accesibles</li>
                            <li>• Rendimiento optimizado</li>
                            <li>• Soluciones escalables</li>
                        </ul>
                    </div>
                </article>

                {/* CTA */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <PrimaryButton text=" ✉️ Contactar ahora" to="contacto"/>
                    <SecondaryButton text="🖥️ Ver portafolio completo" to="proyectos"/>
                </div>
            </div>
        </section>
    );
};

export default InformationContent;