import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // <-- Añadir useNavigate
import { projects, Project } from "../../config/project";
import { showInfo, hideInfo } from "../utils/infoHandler";

const CardDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate(); // <-- Hook para navegación interna
    const project = projects.find((p: Project) => p.id === id);

    if (!project) {
        return (
            <div className="error-message text-red-500 text-center p-8">
                ⚠️ Proyecto no encontrado
            </div>
        );
    }
    const ContentComponent = project.content;
    return (
        <>
            <header
                className="header h-[80vh] bg-opacity-85 flex justify-center items-center relative text-white bg-cover bg-center brightness-75"
                style={{ backgroundImage: `url(${project.bgProyect})` }}
            >
                <div className="button flex gap-4">
                    <button
                        className="info-btn border-2 px-6 py-2 font-bold relative hover:bg-white hover:text-black transition-colors"
                        onMouseOver={(e) => showInfo(e.currentTarget, "Este botón te lleva al código del proyecto.")}
                        onMouseOut={hideInfo}
                        onClick={() => window.open(project.codeUrl, "_blank")} 
                    >
                        Código
                    </button>
                    <button
                        className="info-btn border-2 border-white px-6 py-2 font-bold relative hover:bg-white hover:text-black transition-colors"
                        onMouseOver={(e) => showInfo(e.currentTarget, "Este botón te lleva a la vista del proyecto.")}
                        onMouseOut={hideInfo}
                        onClick={() => window.open(project.demoUrl, "_blank")} 
                    >
                        Ver Proyecto
                    </button>
                </div>
            </header>

            <div className="bg-slate-300 md:mx-6">
                <div className="h-auto max-w-6xl mx-auto">

                    <ContentComponent />
                </div>
            </div>
        </>
    );
};

export default CardDetails;