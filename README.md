# NgPasteles

Sistema de gestión de pedidos de pasteles desarrollado con Angular 20.

## Descripción

NgPasteles es una aplicación web para administrar clientes, pasteles y pedidos de una pastelería. Utiliza arquitectura modular con feature modules, signal stores para manejo de estado, y PrimeNG para componentes UI.

## Tecnologías

- Angular 20
- TypeScript
- NgRx Signals para manejo de estado
- PrimeNG para componentes UI
- SCSS para estilos
- Arquitectura modular (feature-based)

## Requisitos previos

- Node.js (versión 18 o superior)
- npm o yarn
- Backend API corriendo en `http://localhost:5095`

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Instalar dependencias
npm install
```

## Configuración

Crear archivo `.env` en la raíz del proyecto:

```
API_URL=http://localhost:5095/api
```

## Servidor de desarrollo

Para iniciar el servidor de desarrollo:

```bash
ng serve
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cuando modifiques archivos.

## Estructura del proyecto

```
src/app/
├── core/                    # Servicios core, guards, interceptors
│   ├── guards/
│   ├── interceptors/
│   ├── models/
│   └── services/
├── features/                # Módulos de funcionalidades
│   ├── clientes/
│   │   ├── data-access/    # Store, API, modelos
│   │   ├── feature/        # Páginas/containers
│   │   └── ui/             # Componentes presentacionales
│   ├── pasteles/
│   └── pedidos/
├── layout/                  # Componentes de layout
└── shared/                  # Componentes compartidos
    ├── components/
    ├── directives/
    ├── pipes/
    └── validators/
```

## Características

- Gestión de clientes (CRUD)
- Catálogo de pasteles
- Sistema de pedidos
- Paginación y búsqueda
- Manejo de errores con mensajes amigables
- Confirmaciones para acciones destructivas
- Diseño responsive

## Generación de código

Para generar componentes:

```bash
# Componente
ng g component features/nombre-feature/ui/nombre-componente

# Servicio
ng g service features/nombre-feature/data-access/services/nombre-servicio

# Interfaz/modelo
ng g interface features/nombre-feature/data-access/models/nombre-modelo
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Manejo de errores

La aplicación incluye manejo de errores para:
- Servidor no disponible: "El servidor no está disponible. Se recuperará pronto."
- Errores de API con mensajes específicos
- Validaciones de formularios

## Recursos adicionales

- [Angular CLI](https://angular.dev/tools/cli)
- [NgRx Signals](https://ngrx.io/guide/signals)
- [PrimeNG](https://primeng.org/)

## Licencia

Este proyecto es privado.
