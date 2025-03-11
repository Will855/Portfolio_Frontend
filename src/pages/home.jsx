// 404.jsx
import React from "react";
import Glitch from "../components/animations/glitchPresentation";
import { WebPlansGrid } from "../components/cards/webPlanCard";
import MagneticBtn from "../components/buttons/MagneticBtn";
import { PLANS } from '../config/webPlans';
import IonIcon from '@reacticons/ionicons';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12 mt-24">
            {/* Sección superior con error 404 */}
            <div className="text-center space-y-20">
                <Glitch title="Wilmer Lynch" subtitle="Web Developer" />

                <MagneticBtn iconName="help-outline" subtitle="Quien Soy?" />

            </div>

            {/* Sección de planes con espaciado adecuado */}
            <div className="w-full max-w-7xl px-4">
                <h2 className="text-2xl text-slate-300 mb-8 text-center mt-auto">
                    <IonIcon
                        name="arrow-down-outline"
                        className="text-3xl motion-safe:animate-pulse"
                        aria-hidden="true"
                    />
                    Explora nuestros planes web profesionales <IonIcon
                        name="arrow-down-outline"
                        className="text-3xl motion-safe:animate-pulse"
                        aria-hidden="true"
                    />

                </h2>

                <WebPlansGrid plans={PLANS} />
            </div>
        </div>
    );
};

export default Home;



