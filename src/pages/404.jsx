// 404.jsx
import React from "react";
import Glitch from "../components/animations/glitchPresentation";
import { WebPlansGrid } from "../components/cards/webPlanCard";
import { PLANS } from '../config/webPlans'; // Ruta corregida

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-8">
            <div className="mb-16">
                <Glitch title="404" subtitle="Página no encontrada" />
            </div>
        </div>
    );
};

export default NotFound;

{/* <div className="min-h-screen flex justify-center items-center">
<Glitch title="404" subtitle="Not Found" />
</div>
) */}