# Shop Chaqchao

Este es un proyecto de comercio electrónico desarrollado con [Next.js](https://nextjs.org) para Chaqchao, una tienda especializada en productos artesanales y talleres.

## Características Principales

- 🛍️ **Catálogo de Productos**: Visualización y gestión de productos artesanales
- 🛒 **Carrito de Compras**: Sistema de carrito interactivo con gestión de cantidades
- 👤 **Gestión de Cuenta**: Sistema de autenticación y gestión de perfil de usuario
- 📅 **Talleres**: Sistema de reserva y gestión de talleres
- 🌐 **Internacionalización**: Soporte multiidioma con next-intl
- 🎨 **UI Moderna**: Interfaz de usuario moderna y responsiva
- 🚀 **Optimización**: Optimización de imágenes y rendimiento

## Tecnologías Principales

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Redux Toolkit
- next-intl
- Cloudflare R2 (Almacenamiento de imágenes)

## Comenzando

Primero, instala las dependencias:

```bash
npm install
# o
yarn install
# o
pnpm install
```

Luego, ejecuta el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

## Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_API_URL=tu_url_api
NEXT_PUBLIC_CLOUDFLARE_URL=tu_url_cloudflare
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia el servidor de producción
- `npm run lint`: Ejecuta el linter
- `npm run format`: Formatea el código con Prettier

## Estructura del Proyecto

```
src/
├── app/                 # Rutas y páginas de la aplicación
├── components/         # Componentes reutilizables
├── hooks/             # Hooks personalizados
├── lib/               # Utilidades y configuraciones
├── redux/             # Estado global con Redux
└── types/             # Definiciones de tipos TypeScript
```

## Contribuir

Las contribuciones son bienvenidas. Por favor, asegúrate de:

1. Hacer fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
