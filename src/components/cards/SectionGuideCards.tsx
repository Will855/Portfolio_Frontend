// components/cards/SectionGuideCards.tsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";

const cardVariants = {
    offscreen: { y: 20, opacity: 0 },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", bounce: 0.4, duration: 0.6 }
    }
};

const hoverEffect = {
    hover: {
        scale: 1.02,
        background: "rgba(255, 255, 255, 0.08)",
        transition: { type: "spring", stiffness: 300 }
    }
};

export const SectionGuideCards: React.FC = () => {
    const sections = [
        {
            title: "🚀 Proyectos",
            description: "Descubre mis trabajos realizados y casos de éxito",
            icon: "code-slash-outline",
            path: "/proyectos",
            color: "from-purple-400 to-blue-400"
        },
        {
            title: "📌 Información",
            description: "Conoce más sobre mi enfoque y metodología de trabajo",
            icon: "person-circle-outline",
            path: "/informacion",
            color: "from-green-400 to-cyan-400"
        },
        {
            title: "📬 Contacto",
            description: "Escríbeme directamente para consultas específicas",
            icon: "chatbubbles-outline",
            path: "/contacto",
            color: "from-pink-400 to-red-400"
        },
        {
            title: "💡 Quiero mi Web",
            description: "Inicia tu proyecto digital con soluciones a medida",
            icon: "rocket-outline",
            path: "/quiero-web",
            color: "from-orange-400 to-yellow-400"
        }
    ];

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
            {sections.map((section, index) => (
                <motion.div
                    key={index}
                    className="p-6 rounded-xl border border-white/20 bg-gradient-to-br backdrop-blur-lg"
                    variants={cardVariants}
                    initial="offscreen"
                    whileInView="onscreen"
                    whileHover="hover"
                    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                    style={{ background: "rgba(255, 255, 255, 0.05)" }}
                >
                    <div className={`bg-gradient-to-r ${section.color} w-fit p-3 rounded-lg mb-4`}>
                        <IonIcon name={section.icon} className="text-2xl text-white" />
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-white">
                        {section.title}
                    </h3>

                    <p className="text-slate-300 text-sm mb-6">
                        {section.description}
                    </p>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to={section.path}
                            className={`inline-block w-full text-center py-2 px-4 rounded-lg transition-all 
                bg-gradient-to-r ${section.color} text-white hover:opacity-90`}
                        >
                            Explorar
                        </Link>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};