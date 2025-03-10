import React from "react";
import { motion } from "framer-motion";
import WordCloud from '../animations/cloudWords';
import PrimaryButton from "../buttons/primaryBtn";
import SecondaryButton from "../buttons/secondaryBtn";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const cardVariants = {
    hover: { scale: 1.02, transition: { duration: 0.3 } }
};

const InformationContent: React.FC = () => {
    const skills = [
        {
            title: "Tecnologías clave",
            color: "blue",
            items: [
                { name: "React", experience: "3 años" },
                { name: "JavaScript", experience: "4 años" },
                { name: "TypeScript", experience: "2 años" },
                { name: "PHP", experience: "1 año" },
                { name: "SQL", experience: "1 año" }
            ]
        },
        {
            title: "Herramientas",
            color: "purple",
            items: [
                { name: "HTML/CSS" },
                { name: "Tailwind" },
                { name: "GSAP" },
                { name: "Bootstrap" }
            ]
        },
        {
            title: "Enfoque",
            color: "green",
            items: [
                { name: "Optimización SEO" },
                { name: "Diseño UI/UX" },
                { name: "Contenido estratégico" }
            ]
        }
    ];

    const projects = [
        {
            title: "🛒 E-commerce de teclados",
            color: "blue",
            details: [
                "Desarrollo con Javascript",
                "Animaciones GSAP ScrollTrigger",
                "Diseño responsive con Tailwind",
                "Optimización Core Web Vitals ≥90"
            ]
        },
        {
            title: "✂️ Sitio para barbería",
            color: "purple",
            details: [
                "Arquitectura HTML/CSS + Tailwind",
                "Sistema de reservas integrado",
                "Mejora de tasa de conversión en 35%",
                "Diseño mobile-first"
            ]
        }
    ];

    return (
        <motion.section
            className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                className="p-6 sm:p-8 lg:p-10 text-slate-50 flex flex-col gap-8 sm:gap-12 backdrop-blur-lg bg-white/5 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-white/10 transition-all duration-300"
                variants={itemVariants}
            >
                {/* Sección Quién soy */}
                <motion.article variants={itemVariants}>
                    <h2 className="font-semibold text-4xl sm:text-5xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent h-16">
                        ¿Quién soy?
                    </h2>
                    <div className="space-y-6 text-base sm:text-lg leading-relaxed sm:leading-loose opacity-90">
                        <p className="text-justify">
                            Desarrollador web full-stack con 3+ años de experiencia construyendo sitios y aplicaciones modernas, escalables y centradas en el usuario.
                        </p>

                        <motion.div
                            className="grid gap-4 sm:grid-cols-3"
                            variants={containerVariants}
                        >
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    className="p-4 bg-white/5 rounded-lg"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <h3 className={`font-medium text-${skill.color}-300 mb-2`}>{skill.title}</h3>
                                    <ul className="space-y-1 text-sm">
                                        {skill.items.map((item, idx) => (
                                            <motion.li
                                                key={idx}
                                                whileHover={{ x: 5 }}
                                            >
                                                {'name' in item ? `${item.name} (${item.experience})` : item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.article>

                {/* Nube de palabras */}
                <motion.div
                    className="w-full animate-fade-in"
                    variants={itemVariants}
                >
                    <WordCloud />
                </motion.div>

                {/* Proyectos Destacados */}
                <motion.article variants={itemVariants}>
                    <h2 className="font-semibold text-3xl sm:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                        🚀 Proyectos Destacados
                    </h2>

                    <motion.ul
                        className="space-y-8"
                        variants={containerVariants}
                    >
                        {projects.map((project, index) => (
                            <motion.li
                                key={index}
                                className="group relative pl-6 border-l-2 border-blue-400/30 hover:border-blue-400 transition-colors"
                                variants={itemVariants}
                                whileHover="hover"
                            >
                                <div className="absolute left-[-9px] top-3 w-4 h-4 bg-blue-400 rounded-full opacity-30 group-hover:opacity-100 transition-opacity" />
                                <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                                <ul className="space-y-2 text-sm text-slate-300">
                                    {project.details.map((detail, idx) => (
                                        <motion.li
                                            key={idx}
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            • {detail}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.article>

                {/* Formación */}
                <motion.article variants={itemVariants}>
                    <h2 className="font-semibold text-3xl sm:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                        🎓 Formación
                    </h2>
                    <motion.div
                        className="p-4 mt-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <p className="text-lg font-medium">Ingeniería de Sistemas</p>
                        <p className="text-sm text-slate-300">5to semestre en curso</p>
                        <p className="mt-2 text-slate-300">Especialización en desarrollo web y mejores prácticas de UX</p>
                    </motion.div>
                </motion.article>

                {/* Valor diferencial */}
                <motion.article variants={itemVariants}>
                    <h2 className="font-semibold text-3xl sm:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                        💡 Valor único
                    </h2>
                    <motion.div
                        className="p-4 mt-4 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-lg border border-white/10"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <p className="text-lg font-medium mb-2">Perfeccionismo creativo</p>
                        <p className="text-slate-300">
                            Combino atención al detalle con enfoque estratégico
                        </p>
                        <ul className="mt-2 space-y-2 text-sm">
                            {["Código limpio y mantenible", "Diseños coherentes y accesibles",
                                "Rendimiento optimizado", "Soluciones escalables"].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        whileHover={{ x: 5 }}
                                    >
                                        • {item}
                                    </motion.li>
                                ))}
                        </ul>
                    </motion.div>
                </motion.article>

                {/* CTA */}
                <motion.div
                    className="mt-8 flex flex-col sm:flex-row gap-4"
                    variants={itemVariants}
                >
                    <PrimaryButton text=" ✉️ Contactar ahora" to="contacto" />
                    <SecondaryButton text="🖥️ Ver portafolio completo" to="proyectos" />
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default InformationContent;