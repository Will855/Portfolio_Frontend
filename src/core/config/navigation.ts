// Configuración centralizada de navegación para cumplir el principio Open/Closed
// Si agregas nuevas rutas en la base de datos, solo necesitas registrarlas aquí
// sin tener que modificar los componentes de la interfaz (DockMobileNav, NavMenu).

export const NAV_ICONS: Record<string, string> = {
    inicio: 'home-outline',
    proyectos: 'code-slash-outline',
    perfil: 'person-outline',
    'sobre mi': 'person-outline',
    contacto: 'mail-outline',
    blog: 'document-text-outline',
    servicios: 'briefcase-outline',
    notas: 'book-outline',
    apuntes: 'book-outline'
};

export const DEFAULT_NAV_ICON = 'compass-outline';

export function getNavMetadata(itemName: string) {
    const normalized = itemName.toLowerCase();
    const href = `/${normalized.replace(/\s+/g, '-')}`; // Ej: "Sobre Mi" -> "/sobre-mi"
    const icon = NAV_ICONS[normalized] || DEFAULT_NAV_ICON;
    
    return {
        label: itemName,
        href,
        icon,
        normalized
    };
}
