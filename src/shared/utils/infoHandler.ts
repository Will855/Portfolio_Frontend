// Función para mostrar la tarjeta de información contextual
export const showInfo = (button: HTMLElement, info: string) => {
    const infoCard = document.getElementById("infoCard") as HTMLElement;
    const infoText = document.getElementById("infoText") as HTMLElement;
    infoText.textContent = info;

    const rect = button.getBoundingClientRect();
    infoCard.style.display = "block";
    infoCard.style.top = `${rect.top - infoCard.offsetHeight - 20}px`;
    infoCard.style.left = `${rect.left + rect.width / 2 - infoCard.offsetWidth / 2}px`;
};

// Función para ocultar la tarjeta de información contextual
export const hideInfo = () => {
    const infoCard = document.getElementById("infoCard") as HTMLElement;
    infoCard.style.display = "none";
};