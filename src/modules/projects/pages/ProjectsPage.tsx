import React from "react";
import Grid from "../components/ProjectGrid";
import Footer from "../../../core/components/footer/Footer";

export const Proyects: React.FC = () => {
    return (
        <>
            <div className="p-8 pt-32">
                <Grid />
                <Footer />
            </div>
        </>
    );
};
