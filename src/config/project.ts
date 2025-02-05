import AuthSystem from "../components/demos/authSystem";
import BarberiaPremium from "../components/demos/barberia";
import ColorPaletteGenerator from "../components/demos/colorPalette";
import FutureCart from "../components/demos/futureCart";
import HeadPhones from "../components/demos/headphones";
import NotFound from "../pages/404";

export interface Project {
    id: string;
    content: React.ComponentType;
    //gifSrc: string;       #desuso
    bgProyect: string;
    codeUrl: string;       // URL del repositorio (GitHub, GitLab, etc.)
    demoUrl: string;       // URL del demo o vista en vivo
}

export const projects: Project[] = [
    {
        id: "1",
        content: HeadPhones,
        bgProyect: "/images/bg-proyecto1.jpg",
        codeUrl: "https://github.com/Will855/HeadPhones",
        demoUrl: "https://will855.github.io/HeadPhones/"                
    },
    {//listo
        id: "2",
        content: FutureCart,
        bgProyect: "/images/bg-proyecto2.jpg",
        codeUrl: "https://github.com/Will855/Carrito-de-Compras-JavaScript",
        demoUrl: "https://will855.github.io/Carrito-de-Compras-JavaScript/"
    },
    {
        id: "3",
        content: BarberiaPremium,
        bgProyect: "/images/bg-proyecto2.jpg",//cambiar
        codeUrl: "https://github.com/Will855/Barberia--Agendado-de-citas-",
        demoUrl: "https://will855.github.io/Barberia--Agendado-de-citas-/#servicios"
    },
    {
        id: "4",
        content: AuthSystem,
        bgProyect: "/images/bg-proyecto2.jpg",
        codeUrl: "https://github.com/Will855/formulario",
        demoUrl: "https://will855.github.io/formulario/"
    },
    {
        id: "5",
        content: ColorPaletteGenerator,
        bgProyect: "/images/bg-proyecto2.jpg",
        codeUrl: "https://github.com/Will855/paleta-de-colores",
        demoUrl: "https://will855.github.io/paleta-de-colores/"
    }
];