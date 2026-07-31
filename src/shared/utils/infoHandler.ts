function getOrCreateInfoCard(): { infoCard: HTMLElement; infoText: HTMLElement } | null {
    if (typeof window === 'undefined') return null;

    let infoCard = document.getElementById("infoCard");
    let infoText = document.getElementById("infoText");

    if (!infoCard) {
        infoCard = document.createElement("div");
        infoCard.id = "infoCard";
        infoCard.className = "fixed hidden z-50 px-4 py-2 text-xs font-medium text-white bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl pointer-events-none transition-opacity duration-200";
        
        infoText = document.createElement("span");
        infoText.id = "infoText";
        infoCard.appendChild(infoText);
        
        document.body.appendChild(infoCard);
    } else if (!infoText) {
        infoText = document.createElement("span");
        infoText.id = "infoText";
        infoCard.appendChild(infoText);
    }

    return { infoCard: infoCard as HTMLElement, infoText: infoText as HTMLElement };
}

// Función para mostrar la tarjeta de información contextual
export const showInfo = (button: HTMLElement, info: string) => {
    const elements = getOrCreateInfoCard();
    if (!elements) return;
    const { infoCard, infoText } = elements;

    infoText.textContent = info;

    const rect = button.getBoundingClientRect();
    infoCard.style.display = "block";
    infoCard.style.position = "fixed";
    infoCard.style.top = `${Math.max(10, rect.top - infoCard.offsetHeight - 10)}px`;
    infoCard.style.left = `${Math.max(10, rect.left + rect.width / 2 - infoCard.offsetWidth / 2)}px`;
};

// Función para ocultar la tarjeta de información contextual
export const hideInfo = () => {
    if (typeof window === 'undefined') return;
    const infoCard = document.getElementById("infoCard");
    if (infoCard) {
        infoCard.style.display = "none";
    }
};