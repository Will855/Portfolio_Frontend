// components/WebSalesCards.tsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const cardVariants = {
    offscreen: { y: 30, opacity: 0 },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", bounce: 0.4, duration: 0.8 }
    }
};

const hoverEffects = {
    hover: {
        background: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(16px)",
        scale: 1.03
    }
};

const SocialLinks = () => (
    <div className="flex justify-center space-x-4 mt-6">
        <a href="https://www.linkedin.com/in/wilmer-lynch/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 text-slate-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
        </a>
        <a href="https://wa.me/+584265940917" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 text-slate-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" /></svg>
        </a>
        <a href="https://www.instagram.com/techno__monster/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 text-slate-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
        </a>
    </div>
);

export const WebSalesCards: React.FC = () => {
    const cardsData = [
        {
            title: "🌐 Tu Escaparate Digital 24/7",
            content: [
                "Una web profesional es tu mejor vendedor automático:",
                "Atrae clientes mientras duermes",
                "Muestra tus productos/servicios de forma impactante",
                "Genera credibilidad inmediata",
                "7 días de soporte gratis post-entrega: si algo no funciona, ¡lo arreglo!"
            ],
            stats: [
                { metric: "85%", source: "Nielsen", detail: "de usuarios investigan online antes de comprar" },
                { metric: "7x", source: "Stanford", detail: "más probable que contacten negocios con web profesional" }
            ],
            cta: "💻 ¡Quiero mi escaparate digital!"
        },
        {
            title: "📈 Resultados Comprobados",
            content: [
                "Optimización basada en datos:",
                "Diseño conversional probado",
                "Técnicas de SEO actualizadas",
                "Analítica integrada para mejoras continuas"
            ],
            stats: [
                { metric: "+120%", source: "Forrester", detail: "en tráfico cualificado con SEO técnico" },
                { metric: "68%", source: "Adobe", detail: "mejora en engagement con diseño UX" }
            ],
            cta: "📊 ¡Maximiza tus resultados!"
        },
        {
            title: "🚀 Oferta de Lanzamiento",
            content: [
                "Paquetes especiales incluyen:",
                "Diseño web premium + hosting 1 año",
                "Capacitación en gestión de contenidos",
                "SEO básico incluido"
            ],
            stats: [
                { metric: "40%", source: "Clientes", detail: "de descuento en primer mes" },
                { metric: "15 días", source: "Garantía", detail: "de satisfacción o devolución" }
            ],
            cta: "🎯 ¡Quiero empezar ahora!"
        }
    ];

    return (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {cardsData.map((card, index) => (
                <motion.div
                    key={index}
                    className="p-6 rounded-xl border border-white/20 flex flex-col justify-between relative overflow-hidden"
                    style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)"
                    }}
                    initial="offscreen"
                    whileInView="onscreen"
                    whileHover="hover"
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    variants={cardVariants}
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-300/20 opacity-0"
                        animate={{
                            opacity: [0, 0.1, 0],
                            transition: { duration: 2, repeat: Infinity }
                        }}
                    />

                    <div className="relative z-10 space-y-5">
                        <motion.h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                            {card.title}
                        </motion.h3>

                        <div className="space-y-4">
                            <ul className="space-y-3">
                                {card.content.map((item, i) => (
                                    <motion.li key={i} className="text-slate-200 flex items-start">
                                        <span className="text-blue-400 mr-2">•</span>
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="grid gap-3">
                                {card.stats.map((stat, i) => (
                                    <motion.div key={i} className="p-3 rounded-lg bg-black/20">
                                        <div className="font-bold text-xl text-blue-300">{stat.metric}</div>
                                        <div className="text-sm text-slate-300">{stat.detail}</div>
                                        <div className="text-xs text-slate-200 opacity-70 mt-1">{stat.source}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/planes"
                                className="block w-full bg-gradient-to-r from-blue-500 to-purple-400 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-center"
                            >
                                {card.cta}
                            </Link>
                        </motion.div>

                        <SocialLinks />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};