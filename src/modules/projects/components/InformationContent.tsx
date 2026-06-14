import React from "react";
import { SkillSection } from "./SkillSection";
import { ExpAndTecnologies } from "./ExpAndTecnologies";

export const InformationContent: React.FC = () => {
    return (
        <div className="space-y-12">
            <SkillSection />
            <ExpAndTecnologies />
        </div>
    );
};

export { SkillSection, ExpAndTecnologies };
