// types/webPlans.ts
/**
 * Interfaz que define la estructura de un plan de página web
 * @interface WebPlan
 * @property {string} header - Título del plan
 * @property {string} subtitle - Breve descripción del plan
 * @property {string[]} features - Lista de características/beneficios
 * @property {number} price - Precio del plan en dólares
 */
export interface WebPlan {
    header: string;
    subtitle: string;
    features: string[];
    price: number;
}

//planes web competitivos en Venezuela
export const PLANS: WebPlan[] = [
    {
        header: "🚀 Básico Emprendedor",
        subtitle: "Presencia online esencial para startups y profesionales",
        features: [
            "1 página principal + 4 secciones",
            "Hosting + dominio (.com.ve) 1 año GRATIS",
            "Diseño 100% mobile-first",
            "SEO básico integrado",
            "Formulario de contacto",
            "Soporte técnico 3 meses"
        ],
        price: 120
    },
    {
        header: "💼 Avanzado PYME",
        subtitle: "Solución completa para pequeñas y medianas empresas",
        features: [
            "Hasta 8 páginas personalizadas",
            "Tienda online básica (hasta 15 productos)",
            "Integración redes sociales",
            "SSL Certificado incluido",
            "Backups semanales",
            "Soporte prioritario 6 meses"
        ],
        price: 280
    },
    {
        header: "🏆 Premium Corporativo",
        subtitle: "Potente solución para empresas establecidas",
        features: [
            "Web app personalizada",
            "Carrito de compras avanzado",
            "CMS administrativo",
            "Analítica de datos integrada",
            "Marketing automation básico",
            "Soporte 24/7 + mantenimiento anual"
        ],
        price: 550
    },
    {
        header: "✨ Solución a Medida",
        subtitle: "Desarrollo personalizado para necesidades específicas",
        features: [
            "Arquitectura escalable",
            "Integración con APIs externas",
            "Diseño UX premium",
            "SEO técnico avanzado",
            "Sistema de reservas/pagos",
            "Garantía de rendimiento"
        ],
        price: 850
    }
];