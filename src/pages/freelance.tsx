// pages/Home.jsx (considera renombrar el archivo)
import React from "react";
import IonIcon from "@reacticons/ionicons";
import Footer from "../components/footer/footer";
import { EfficiencyCard } from "../components/cards/EfficiencyCard";
import { HeroCard, USPCard, PricingSection } from "../components/cards/PircingCards";

/**
 * Página principal que muestra planes de desarrollo web y argumentos de conversión
 * @component
 * @returns {JSX.Element} Componente de página principal
 */
const Freelance = (): JSX.Element => {
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

            <HeroCard />
            <EfficiencyCard />
            <PricingSection />
            <USPCard />

            {/* Pie de página */}
            <Footer />
        </div>
    );
};

export default Freelance;