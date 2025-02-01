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
        description: "E-commerce de audifonos",
        img: "assets/web1.png", // Nombre correcto
        buttonText: "Ver más.." // Nueva prop requerida
    },
    {
        id: "2",
        title: "Proyecto 2",
        description: "E-commerce de teclados gaming",
        img: "assets/web2.png", // Nombre correcto
        buttonText: "Ver más.." // Nueva prop requerida
    },
    {
        id: "3",
        title: "Proyecto 3",
        description: "Proximamente...",
        img: "assets/web3.png", // Nombre correcto
        buttonText: "Ver más..." // Nueva prop requerida
    },
    {
        id: "4",
        title: "Proyecto 4",
        description: "Proximamente..",
        img: "assets/web4.png", // Nombre correcto
        buttonText: "Ver más..." // Nueva prop requerida
    },
    {
        id: "5",
        title: "Proyecto 5",
        description: "No disponible",
        img: "assets/web5.png", // Nombre correcto
        buttonText: "No disponible" // Nueva prop requerida
    },
    //...
];