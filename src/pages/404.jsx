// 404.jsx
import React from "react";
import Glitch from "../components/animations/glitchPresentation";


const NotFound = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center p-8">
                <div className="mb-16">
                    <Glitch title="404" subtitle="Página no encontrada" />
                </div>
            </div>
        </>
    );
};

export default NotFound;

