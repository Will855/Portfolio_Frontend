import React from "react";
import Grid from "../components/ProjectGrid";
import Footer from "../../../core/components/footer/Footer";

export const Proyects: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12">
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-8">
                <main className="w-full">
                    <Grid />
                </main>
            </div>

            <div className="mt-16 w-full">
                <Footer />
            </div>
        </div>
    );
};
