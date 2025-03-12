// components/EfficiencyCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const cardVariants = {
    offscreen: {
        y: 30,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

const hoverVariants = {
    hover: {
        background: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(16px)",
        scale: 1.03
    }
};

const buttonHover = {
    hover: {
        scale: 1.05,
        transition: {
            type: "spring",
            stiffness: 300
        }
    },
    tap: {
        scale: 0.95
    }
};

/**
 * Componente que muestra los beneficios estratégicos y datos comprobados sobre la eficiencia de tener una página web
 * @component
 * @example
 * return <EfficiencyCard />
 */
export const EfficiencyCard: React.FC = () => {
    return (
        <motion.div
            className="p-6 rounded-xl border border-white/20 flex flex-col justify-between relative overflow-hidden mx-auto"
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
            {/* Efecto de brillo dinámico */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-cyan-300/20 opacity-0"
                animate={{
                    opacity: [0, 0.1, 0],
                    transition: { duration: 2, repeat: Infinity }
                }}
            />

            <div className="relative z-10 space-y-5">
                <motion.h3
                    className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-300 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.02 }}
                >
                    🚀 ¿Sabías que una web puede multiplicar tus ventas?
                </motion.h3>

                <div className="space-y-4">
                    <motion.p
                        className="text-slate-200 leading-relaxed"
                        whileHover={{ x: 5 }}
                    >
                        En la era digital, tu sitio web es el <strong>mejor vendedor 24/7</strong>.
                        No duerme, no cobra comisiones y trabaja para ti mientras focuses en tu negocio.
                    </motion.p>

                    <ul className="space-y-3">
                        {[
                            {
                                stat: "+53% conversiones",
                                source: "Google 2023",
                                description: "Clientes encuentran negocios locales via móvil"
                            },
                            {
                                stat: "30-50% más leads",
                                source: "HubSpot 2023",
                                description: "Webs profesionales generan mayor confianza"
                            },
                            {
                                stat: "400% más conversiones",
                                source: "Forrester",
                                description: "Con diseño UX optimizado"
                            }
                        ].map((item, index) => (
                            <motion.li
                                key={index}
                                className="flex items-start text-slate-100"
                                whileHover={{ x: 8 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <span className="text-green-400 mr-2 mt-1">▸</span>
                                <div>
                                    <span className="font-semibold">{item.stat}</span>
                                    <span className="text-sm text-slate-300"> ({item.source})</span>
                                    <p className="text-sm opacity-80">{item.description}</p>
                                </div>
                            </motion.li>
                        ))}
                    </ul>

                    <motion.div
                        className="border-t border-white/20 pt-4"
                        whileHover={{ scale: 1.01 }}
                    >
                        <p className="text-slate-300 text-sm leading-relaxed">
                            💡 <strong>Casos reales en VE:</strong> Negocios locales han aumentado
                            ventas hasta <span className="text-green-300">40% en 6 meses</span> con
                            estrategias web básicas (Cámara de Comercio Digital 2022)
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    variants={buttonHover}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link
                        to="/contacto"
                        className="block w-full mt-4 bg-gradient-to-r from-green-500 to-cyan-400 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-center"
                    >
                        🚀 Quiero mi ventaja competitiva
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};  