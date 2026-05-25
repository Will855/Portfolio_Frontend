// NotFoundPage.tsx
import React from "react";
import Glitch from "../../modules/profile/components/GlitchPresentation";

const NotFound: React.FC = () => {
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

