# Portfolio Personal - React + Vite

## 🚀 Descripción
Este es un portfolio personal desarrollado con React y Vite, que muestra una colección de proyectos y demos interactivos. El proyecto implementa una arquitectura moderna y modular, utilizando las mejores prácticas de desarrollo web.

## 🛠️ Tecnologías Principales
- React 18
- TypeScript
- Vite
- Tailwind CSS
- GSAP (Animaciones)
- Firebase (Configuración)

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── cards/         # Componentes de tarjetas reutilizables
│   ├── demos/         # Demos interactivos de proyectos
│   └── utils/         # Componentes utilitarios
├── config/            # Configuraciones y constantes
├── hook/              # Custom hooks
├── services/          # Servicios y APIs
├── types/             # Definiciones de tipos TypeScript
└── utils/             # Utilidades generales
```

## 🎯 Características Principales

### Demos Interactivos
- Sistema de autenticación
- E-commerce con carrito de compras
- Generador de paleta de colores
- Sistema CRUD con Node.js
- Tienda de auriculares
- Sistema de barbería premium
- Carrito de compras futurista

### Componentes Reutilizables
- Tarjetas de proyectos
- Tarjetas de precios
- Tarjetas de eficiencia
- Tarjetas de guía de sección
- Tarjetas de planes web

## 🚀 Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias:
```bash
pnpm install
```

3. Iniciar el servidor de desarrollo:
```bash
pnpm dev
```

## 📝 Guía de Uso

### Creación de Nuevos Demos
1. Crear un nuevo archivo en `src/components/demos/`
2. Implementar el componente siguiendo el patrón de los demos existentes
3. Agregar la configuración en `src/config/project.ts`

### Uso de Componentes de Tarjetas
Los componentes de tarjetas están diseñados para ser reutilizables y personalizables. Cada tarjeta acepta props específicas que pueden ser configuradas según las necesidades.

## 🔧 Configuración

### Firebase
El proyecto utiliza Firebase para algunas funcionalidades. Configura tus credenciales en `src/config/firebase.js`.

### Animaciones
Las animaciones están manejadas por GSAP y pueden ser configuradas en `src/components/utils/cardAnimations.ts`.

## 🤝 Contribuciones
Las contribuciones son bienvenidas. Por favor, asegúrate de:
1. Hacer fork del proyecto
2. Crear una rama para tu feature
3. Hacer commit de tus cambios
4. Hacer push a la rama
5. Abrir un Pull Request

## 📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👤 Autor
Will855

## 🙏 Agradecimientos
- React Team
- Vite Team
- Tailwind CSS Team
- GSAP Team
