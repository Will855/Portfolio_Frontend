// pages/Home.jsx (considera renombrar el archivo)
import React from "react";
import IonIcon from "@reacticons/ionicons";
import { WebPlansGrid } from "../components/cards/webPlanCard";
import MagneticBtn from "../components/buttons/MagneticBtn";
import Glitch from "../components/animations/glitchPresentation";
import Footer from "../components/footer/footer";
import { EfficiencyCard } from "../components/cards/EfficiencyCard";
import { PLANS } from "../config/webPlans";
import { WebSalesCards } from "../components/cards/WebSalesCards";
import { SectionGuideCards } from "../components/cards/SectionGuideCards";
import { motion } from "framer-motion";


/**
 * Página principal que muestra planes de desarrollo web y argumentos de conversión
 * @component
 * @returns {JSX.Element} Componente de página principal
 */
const Home = () => {
    // Componente reutilizable para flechas animadas
    // const AnimatedArrow = () => (
    //     <IonIcon
    //         name="arrow-down-outline"
    //         className="text-3xl motion-safe:animate-pulse"
    //         aria-hidden="true"
    //     />
    // );

    return (
        <div className="min-h-screen flex flex-col items-center p-8 space-y-20 mt-24">
            {/* Sección Hero principal */}
            <section className="text-center space-y-16 w-full max-w-6xl">
                <Glitch title="Wilmer Lynch" subtitle="Web Developer" />
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                </motion.div>
            </section>
    
            {/* Guía de navegación entre secciones */}
            <section className="w-full max-w-7xl px-4 space-y-8">
                <h2 className="text-2xl text-slate-300 text-center mb-12">
                    ¿Qué necesitas hoy?
                </h2>
                <SectionGuideCards />
            </section>
    
            {/* Tarjetas de venta estratégica */}
            <WebSalesCards/>
    
            {/* Pie de página */}
            <Footer />
        </div>
    );
};

export default Home;