// pages/Home.jsx (considera renombrar el archivo)
import React from "react";
import IonIcon from "@reacticons/ionicons";
import { WebPlansGrid } from "../components/cards/webPlanCard";
import MagneticBtn from "../components/buttons/MagneticBtn";
import Glitch from "../components/animations/glitchPresentation";
import Footer from "../components/footer/footer";
import { EfficiencyCard } from "../components/cards/EfficiencyCard";
import { PLANS } from "../config/webPlans";

/**
 * Página principal que muestra planes de desarrollo web y argumentos de conversión
 * @component
 * @returns {JSX.Element} Componente de página principal
 */
const Home = () => {
    // Componente reutilizable para flechas animadas
    const AnimatedArrow = () => (
        <IonIcon
            name="arrow-down-outline"
            className="text-3xl motion-safe:animate-pulse"
            aria-hidden="true"
        />
    );

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12 mt-24">
            {/* Sección Hero con efecto glitch */}
            <section className="text-center space-y-20">
                <Glitch title="Wilmer Lynch" subtitle="Web Developer" />

                <div className="flex justify-center">
                    <MagneticBtn
                        iconName="person-outline"
                        subtitle="Informacion"
                    />
                </div>
            </section>

            {/* Tarjeta de eficiencia con datos comprobados */}
            <EfficiencyCard />

            {/* Sección de planes profesionales */}
            <section className="w-full max-w-7xl px-4 space-y-8">
                <h2 className="text-2xl text-slate-300 text-center flex items-center justify-center gap-2">
                    <AnimatedArrow />
                    Explora nuestros planes web profesionales
                    <AnimatedArrow />
                </h2>

                <WebPlansGrid plans={PLANS} />
            </section>

            {/* Pie de página */}
            <Footer />
        </div>
    );
};

export default Home;