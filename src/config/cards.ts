// config/cards.ts
export interface CardData {
    id: string;
    title: string;
    description: string;
    img: string; // Cambiar de imgSrc a img
    buttonText: string; // Agregar nueva propiedad
}

export const cards: CardData[] = [
    {
        id: "1",
        title: "Proyecto 1",
        description: "Descripción...",
        img: "public/assets/web1.png", // Nombre correcto
        buttonText: "Ver más" // Nueva prop requerida
    },
    {
        id: "2",
        title: "Proyecto 1",
        description: "Descripción...",
        img: "assets/web2.png", // Nombre correcto
        buttonText: "Ver más" // Nueva prop requerida
    },
    {
        id: "3",
        title: "Proyecto 1",
        description: "Descripción...",
        img: "public/assets/web3.png", // Nombre correcto
        buttonText: "Ver más" // Nueva prop requerida
    },
    {
        id: "4",
        title: "Proyecto 1",
        description: "Descripción...",
        img: "public/assets/web4.png", // Nombre correcto
        buttonText: "Ver más" // Nueva prop requerida
    },
    {
        id: "5",
        title: "Proyecto 1",
        description: "Descripción...",
        img: "public/assets/web5.png", // Nombre correcto
        buttonText: "Ver más" // Nueva prop requerida
    },
    //...
];