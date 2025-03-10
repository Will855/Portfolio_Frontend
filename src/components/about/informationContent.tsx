import React from "react";
import { motion } from "framer-motion";
import PrimaryButton from "../buttons/primaryBtn";
import SecondaryButton from "../buttons/secondaryBtn";
export const SkillsSection: React.FC = () => {
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

    return (
        <motion.article className="w-full min-w-0">
            <h2 className="font-semibold text-3xl sm:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-4">
                ¿Quién soy?
            </h2>
            <div className="space-y-4 text-base leading-relaxed opacity-90">
                <p className="text-justify sm:text-left">
                    Desarrollador web full-stack con 3+ años de experiencia construyendo sitios y aplicaciones modernas, escalables y centradas en el usuario.
                </p>
                <motion.div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            className="p-3 bg-white/5 rounded-lg min-w-0 break-words"
                            whileHover={{ scale: 1.03 }}
                        >
                            <h3 className={`font-medium text-${skill.color}-300 mb-1 text-sm md:text-base`}>
                                {skill.title}
                            </h3>
                            <ul className="space-y-1 text-xs md:text-sm">
                                {skill.items.map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        className="truncate"
                                        whileHover={{ x: 5 }}
                                    >
                                        {'name' in item ?
                                            `${item.name}${item.experience ? ` (${item.experience})` : ''}` :
                                            item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.article>
    );
};
export const ProjectsSection: React.FC = () => {
    const projects = [
        {
            title: "🛒 E-commerce de teclados",
            color: "blue",
            details: [
                "Desarrollo con Javascript",
                "Animaciones GSAP ScrollTrigger",
                "Diseño responsive con Tailwind",
                "Optimización Core Web Vitals >90"
            ]
        },
        {
            title: "💈 Sitio para barbería",
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
        <motion.article>
            <h2 className="font-semibold text-3xl sm:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                🌟 Proyectos Destacados
            </h2>
            <motion.ul className="mt-6 space-y-8">
                {projects.map((project, index) => (
                    <motion.li
                        key={index}
                        className="group relative pl-6 border-l-2 border-blue-400/30 hover:border-blue-400 transition-colors"
                        whileHover="hover"
                    >
                        <div className="absolute left-[-9px] top-3 w-4 h-4 bg-blue-400 rounded-full opacity-30 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                        <ul className="space-y-2 text-sm text-slate-300">
                            {project.details.map((detail, idx) => (
                                <motion.li key={idx} whileHover={{ scale: 1.02 }}>
                                    • {detail}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.li>
                ))}
            </motion.ul>
        </motion.article>
    );
}

export const EducationAndCTASection: React.FC = () => {
    return (
        <>
            {/* Education */}
            <motion.article>
                <h2 className="font-semibold text-3xl sm:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                    🎓 Formación
                </h2>
                <motion.div
                    className="p-4 mt-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                >
                    <p className="text-lg font-medium">Ingeniería de Sistemas</p>
                    <p className="text-sm text-slate-300">5to semestre en curso</p>
                    <p className="mt-2 text-slate-300">Especialización en desarrollo web y mejores prácticas de UX</p>
                </motion.div>
            </motion.article>

            {/* Unique Value */}
            <motion.article>
                <h2 className="font-semibold text-3xl sm:text-4xl bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                    🌟 Valor Único
                </h2>
                <motion.div
                    className="p-4 mt-4 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-lg border border-white/10"
                    whileHover={{ scale: 1.02 }}
                >
                    <p className="text-lg font-medium mb-2">Perfeccionismo creativo</p>
                    <p className="text-slate-300">
                        Combino atención al detalle con enfoque estratégico
                    </p>
                    <ul className="mt-2 space-y-2 text-sm">
                        {["Código limpio y mantenible", "Diseños coherentes y accesibles",
                            "Rendimiento optimizado", "Soluciones escalables"].map((item, index) => (
                                <motion.li key={index} whileHover={{ x: 5 }}>
                                    • {item}
                                </motion.li>
                            ))}
                    </ul>
                </motion.div>
            </motion.article>

            {/* Call to Action */}
            <motion.div className="mt-8 flex flex-col sm:flex-row gap-4">
                <PrimaryButton text=" 📩 Contactar ahora" to="contacto" />
                <SecondaryButton text="📂 Ver portafolio completo" to="proyectos" />
            </motion.div>
        </>
    );
};
