// EcommercePage.tsx
import React from "react";

/**
 * Página principal de presentación del E-commerce
 * @returns {JSX.Element} Componente con información detallada del proyecto
 */
const EcommercePage: React.FC = () => {
    return (
        <div className="bg-white p-4 sm:p-6 md:p-12 font-sans">
            {/* Encabezado principal */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                FakeStore
            </h2>

            {/* Descripción del proyecto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                <div className="space-y-4 border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Qué es</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        Plataforma de comercio electrónico de última generación con gestión inteligente de inventario,
                        carrito persistente, análisis en tiempo real y flujo de compra optimizado para máxima conversión.
                    </p>
                </div>

                <div className="space-y-4 border-l-4 border-gray-500 pl-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Diferenciales</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm sm:text-base">
                        <li>Carrito multi-sesión con persistencia local</li>
                        <li>Actualización en tiempo real de stock y precios</li>
                        {/* <li>Sistema de recomendaciones basado en IA</li>
                        <li>Checkout en 3 pasos optimizado</li>
                        <li>Integración con múltiples pasarelas de pago</li> */}
                    </ul>
                </div>
            </div>

            {/* Tecnologías principales */}
            <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Stack Tecnológico
                </h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    {['React', 'Redux Toolkit', 'Tailwind CSS', 'FakeStore API', 'LocalStorage', 'React Router'].map((tech) => (
                        <TechBadge key={tech} tech={tech} />
                    ))}
                </div>
            </div>

            {/* Diagrama de flujo de datos */}
            <DataFlowSection />

            {/* Sección de lógica del carrito */}
            <div className="border-t pt-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Lógica del Carrito
                </h2>
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 overflow-x-auto">
                    <CartReducerCodeSample />
                </div>
            </div>

            {/* Casos de uso y optimizaciones */}
            <div className="border-t pt-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
                    Arquitectura y Optimizaciones
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FeatureList
                        title="Funcionalidades Clave"
                        items={[
                            'Gestión de estado global con Redux',
                            'Persistencia de carrito en localStorage',
                            'Validación en tiempo real de formularios',
                            'Sistema de búsqueda filtrada',
                            'Integración con API externa'
                        ]}
                        borderColor="border-blue-300"
                    />
                    <FeatureList
                        title="Optimizaciones"
                        items={[
                            'Memoización de selectores',
                            'Lazy loading de imágenes',
                            'Code splitting de rutas',
                            'Cache de solicitudes API',
                            'Compresión de assets'
                        ]}
                        borderColor="border-green-300"
                    />
                </div>
            </div>
        </div>
    );
};

interface TechBadgeProps {
    tech: string;
}

/**
 * Componente para mostrar badges de tecnologías
 * @param {TechBadgeProps} props - Propiedades del componente
 */
const TechBadge: React.FC<TechBadgeProps> = ({ tech }) => {
    const colorClasses: { [key: string]: string } = {
        React: 'bg-blue-100 text-blue-800',
        'Redux Toolkit': 'bg-purple-100 text-purple-800',
        'Tailwind CSS': 'bg-cyan-100 text-cyan-800',
        'FakeStore API': 'bg-green-100 text-green-800',
        LocalStorage: 'bg-orange-100 text-orange-800',
        'React Router': 'bg-red-100 text-red-800'
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs sm:text-sm ${colorClasses[tech]}`}>
            {tech}
        </span>
    );
};

/**
 * Sección que muestra el flujo de datos de la aplicación
 * @returns {JSX.Element} Componente con diagrama de flujo
 */
const DataFlowSection: React.FC = () => (
    <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center md:text-left">
            Flujo de Datos
        </h2>
        <pre className="bg-gray-800 p-4 rounded-lg text-gray-100 text-xs sm:text-sm overflow-x-auto">
            <code>
                {`graph LR
  A[FakeStore API] -->|Fetch| B(Productos)
  B --> C{Redux Store}
  C -->|Persist| D[(localStorage)]
  C -->|Update| E[UI Components]
  E -->|User Actions| C
  D -->|Hydrate| C`}
            </code>
        </pre>
    </div>
);

/**
 * Muestra un fragmento del código del reducer del carrito
 * @returns {JSX.Element} Componente con código de ejemplo
 */
const CartReducerCodeSample: React.FC = () => (
    <pre className="bg-gray-800 text-gray-100 text-xs sm:text-sm p-2 rounded-lg overflow-x-auto">
        <code>
            {`// Redux slice para gestión del carrito
const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [] },
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            existingItem 
                ? existingItem.quantity += 1
                : state.items.push({ ...action.payload, quantity: 1 });
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        }
    }
});

// Selectores memoizados
export const selectTotalItems = createSelector(
    [state => state.cart.items],
    items => items.reduce((total, item) => total + item.quantity, 0)
);`}
        </code>
    </pre>
);

interface FeatureListProps {
    title: string;
    items: string[];
    borderColor: string;
}

/**
 * Componente para listar características/optimizaciones
 * @param {FeatureListProps} props - Propiedades del componente
 */
const FeatureList: React.FC<FeatureListProps> = ({ title, items, borderColor }) => (
    <div className="space-y-2">
        <h4 className="font-semibold text-gray-700">{title}</h4>
        <ul className={`list-disc pl-6 text-gray-600 text-sm border-l-4 ${borderColor}`}>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    </div>
);

export default EcommercePage;