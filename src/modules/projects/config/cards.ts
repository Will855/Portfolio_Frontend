export interface CardData {
    id: string;
    title: string;
    description: string;
    img: string;
    buttonText: string;
    codeUrl?: string;
    demoUrl?: string;
    bgImage?: string;
    order?: number;
}

export const cards: CardData[] = [
    {
        id: "1",
        title: "E-Commerce",
        description: "Aplicacion de React con Redux y FakeStore API para crea un E-commerce",
        img: "assets/web7.webp",
        buttonText: "Ver mas...",
        codeUrl: "https://github.com/Will855/fakeStore",
        demoUrl: "https://fakestore-edf2003.web.app/",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 1,
    },
    {
        id: "2",
        title: "FutureCart",
        description: "E-commerce de teclados gaming",
        img: "assets/web2.webp",
        buttonText: "Ver más...",
        codeUrl: "https://github.com/Will855/Carrito-de-Compras-JavaScript",
        demoUrl: "https://will855.github.io/Carrito-de-Compras-JavaScript/",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 2,
    },
    {
        id: "3",
        title: "Barberia",
        description: "Interfaz de reserva - Selección de servicios y barberos.",
        img: "assets/web3.webp",
        buttonText: "Ver más...",
        codeUrl: "https://github.com/Will855/Barberia--Agendado-de-citas-",
        demoUrl: "https://will855.github.io/Barberia--Agendado-de-citas-/#servicios",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 3,
    },
    {
        id: "4",
        title: "Formulario",
        description: "Sistema de autenticación con login y registro",
        img: "assets/web4.webp",
        buttonText: "Ver más...",
        codeUrl: "https://github.com/Will855/formulario",
        demoUrl: "https://will855.github.io/formulario/",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 4,
    },
    {
        id: "5",
        title: "Paleta de colores",
        description: "Aplicacion de react que genera 21 tonalidades de cualquier color",
        img: "assets/web5.webp",
        buttonText: "Ver mas...",
        codeUrl: "https://github.com/Will855/paleta-de-colores",
        demoUrl: "https://will855.github.io/paleta-de-colores/",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 5,
    },
    {
        id: "6",
        title: "CRUD/Rest API",
        description: "CRUD de NodeJS con rest API para login con seguridad hash y manejo de errores",
        img: "assets/web6.webp",
        buttonText: "Ver mas...",
        codeUrl: "https://github.com/Will855/CRUD-NodeJS",
        demoUrl: "/page/6",
        bgImage: "/images/bg-proyecto2.jpg",
        order: 6,
    },
    {
        id: "7",
        title: "HP Headphones",
        description: "Landing Page de Auriculares",
        img: "assets/web1.webp",
        buttonText: "Ver más...",
        codeUrl: "https://github.com/Will855/HeadPhones",
        demoUrl: "https://will855.github.io/HeadPhones/",
        bgImage: "/images/bg-proyecto1.jpg",
        order: 7,
    },
];
