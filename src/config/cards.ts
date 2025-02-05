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
        title: "HP Headphones",
        description: "Landing Page de Auriculares",
        img: "assets/web1.png", 
        buttonText: "Ver más..." 
    },
    {
        id: "2",
        title: "FutureCart",
        description: "E-commerce de teclados gaming",
        img: "assets/web2.png", 
        buttonText: "Ver más..." 
    },
    {
        id: "3",
        title: "Barberia",
        description: "Interfaz de reserva - Selección de servicios y barberos.",
        img: "assets/web3.png", 
        buttonText: "Ver más..." 
    },
    {
        id: "4",
        title: "Formulario",
        description: "Sistema de autenticación con login y registro",
        img: "assets/web4.png", 
        buttonText: "Ver más..." 
    },
    {
        id: "5",
        title: "Paleta de colores",
        description: "Aplicacion de react que genera 21 tonalidades de cualquier color",
        img: "assets/web5.png", 
        buttonText: "Ver mas..." 
    },
    //...
];