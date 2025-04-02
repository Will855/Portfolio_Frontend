// components/PricingCards.tsx
import React from "react";
import { motion } from "framer-motion";
import { cardVariants, hoverVariants, buttonHover } from "./EfficiencyCard";
import { trackPlanInteraction, trackButtonClick } from '../../utils/analytics';

export const HeroCard: React.FC = () => (
    <motion.div
        className="p-8 rounded-xl border border-white/20 relative overflow-hidden"
        style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)"
        }}
        variants={cardVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
    >
        <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-400/20 opacity-0"
            animate={{
                opacity: [0, 0.1, 0],
                transition: { duration: 2, repeat: Infinity }
            }}
        />

        <div className="relative z-10 space-y-8 text-center">
            <div className="space-y-6">
                <motion.h1
                    className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.02 }}
                >
                    Transformo Tus Ideas en Webs Rápidas, Seguras y <em>Google-Friendly</em> 🚀
                </motion.h1>

                <motion.p
                    className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto"
                    whileHover={{ x: 5 }}
                >
                    No solo creo páginas web: diseño herramientas digitales que <strong>aumentan tu visibilidad</strong>,
                    atraen clientes y funcionan como una máquina de ventas 24/7.
                </motion.p>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {[
                    "/assets/video.gif",
                    "/assets/video2.gif",
                    "/assets/video3.gif"
                ].map((gif, index) => (
                    <motion.div
                        key={index}
                        className="rounded-lg overflow-hidden border border-white/20"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <img
                            src={gif}
                            alt="Demo de funcionalidad"
                            className="w-full h-48 object-cover"
                            loading="lazy"
                        />
                    </motion.div>
                ))}
            </motion.div>

            <motion.p
                className="text-sm text-slate-400 italic pt-4"
                whileHover={{ scale: 1.01 }}
            >
                Demostración real de webs creadas recientemente
            </motion.p>
        </div>
    </motion.div>
);
export const USPCard: React.FC = () => (
    <motion.div
        className="p-6 rounded-xl border border-white/20"
        style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)"
        }}
        variants={cardVariants}
    >
        <div className="space-y-6">
            <motion.h3
                className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-300 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
            >
                ¿Por Qué Mi Método Funciona?
            </motion.h3>

            <ul className="space-y-4">
                {[
                    "🚀 Tecnología de Alto Rendimiento: React + TypeScript para webs ultrarrápidas y seguras",
                    "🔍 SEO Desde el Día 1: Optimización técnica y de contenido integrada",
                    "🎯 Diseño Centrado en Humanos: Interfaces intuitivas que guían a la acción",
                    "💸 Transparencia Total: 40% inicio - 40% prototipo - 20% finalización"
                ].map((item, index) => (
                    <motion.li
                        key={index}
                        className="flex items-start text-slate-100"
                        whileHover={{ x: 8 }}
                    >
                        <span className="text-purple-400 mr-2">▸</span>
                        <span className="opacity-90">{item}</span>
                    </motion.li>
                ))}
            </ul>
        </div>
    </motion.div>
);

const PlanCard: React.FC<{ plan: any }> = ({ plan }) => {
    const handlePlanClick = () => {
        trackPlanInteraction(plan.title, 'Plan Click');
        trackButtonClick('Plan CTA', plan.title);
    };

    return (
        <motion.div
            className="p-6 rounded-xl border border-white/20 h-full"
            style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(12px)"
            }}
            variants={cardVariants}
            whileHover="hover"
        >
            <div className="space-y-5">
                <div className="flex justify-between items-start">
                    <motion.h3
                        className="text-xl font-bold bg-gradient-to-r from-green-400 to-cyan-300 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.02 }}
                    >
                        {plan.title}
                    </motion.h3>
                    <span className="text-xs bg-green-900/30 px-2 py-1 rounded-full">{plan.tag}</span>
                </div>

                <motion.p className="text-slate-300 font-semibold" whileHover={{ x: 5 }}>
                    {plan.subtitle}
                </motion.p>

                <ul className="space-y-3">
                    {plan.benefits.map((benefit: string, index: number) => (
                        <motion.li
                            key={index}
                            className="flex items-start text-slate-100 text-sm"
                            whileHover={{ x: 5 }}
                        >
                            <span className="text-green-400 mr-2">▸</span>
                            {benefit}
                        </motion.li>
                    ))}
                </ul>

                <motion.div variants={buttonHover} whileHover="hover" whileTap="tap">
                    <a href="https://wa.me/+584265940917" target="blank" onClick={handlePlanClick}>
                        <button className="w-full bg-gradient-to-r from-green-500 to-cyan-400 text-white px-4 py-3 rounded-lg hover:opacity-90 transition-opacity">
                            {plan.cta}
                        </button>
                    </a>
                </motion.div>
            </div>
        </motion.div>
    );
};

export const PricingSection: React.FC = () => {
    const plans = [
        {
            title: "🚀 Landing Page",
            tag: "Más Popular",
            subtitle: "Tu Tarjeta de Presente Digital en 2 Semanas",
            benefits: [
                "Dominio + Hosting Premium GRATIS 1er año",
                "Diseño Mobile-First que triplica el engagement",
                "SEO Básico garantizado en 30 días",
                "Diseño intuitivo con animaciones ligeras"
            ],
            cta: "Empezar Mi Proyecto"
        },
        {
            title: "📈 Growth Booster",
            tag: "Recomendado",
            subtitle: "Web + Tienda Online = Clientes 24/7",
            benefits: [
                "Tienda online con pasarela de pagos en 4 semanas",
                "Certificado SSL incluido + Backups semanales",
                "React + TypeScript: 30% más rápido que la competencia",
                "Mantenimiento gratis el primer mes!",
                "Google Analytics Integrado"
            ],
            cta: "Impulsar Mis Ventas"
        },
        {
            title: "🏆 Enterprise Custom",
            tag: "Premium",
            subtitle: "Tu Operación Digital en Piloto Automático",
            benefits: [
                "Web App + Panel de control integrado",
                "Analítica en tiempo real + Mantenimiento anual",
                "Soporte prioritario 24/7",
                "Google Analytics Integrado"
            ],
            cta: "Automatizar Mi Negocio"
        }
    ];

    return (
        <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
                <PlanCard key={index} plan={plan} />
            ))}
        </div>
    );
};