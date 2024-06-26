# Programacion_Interfaces_Web_P5
## D/Disco 2000

### Introducción

Bienvenido a D/Disco 2000, tu destino definitivo para descubrir y organizar películas fotográficas. Con nuestra herramienta avanzada, diseñada para entusiastas y profesionales del cine analógico, podrás explorar una vasta biblioteca de películas, encontrar las perfectas para tus proyectos y guardarlas de manera eficiente.

Nuestra plataforma, construida con las últimas tecnologías web, te ofrece una experiencia intuitiva y dinámica. Desde filtros avanzados que te permiten seleccionar películas por marca, ISO, formato, y tipo de color, hasta un sistema de gestión de proyectos que organiza tus elecciones favoritas, D/Disco 2000 está aquí para facilitar tu proceso creativo y técnico.

### Fuente de Datos

Se utilizo la API [Film API](https://filmapi.vercel.app/api/films) para obtener la información de todas las películas disponibles en el mercado.

## Funcionalidades de la Aplicación

1. **Filtros de Búsqueda:**
   - Filtrar películas por marca mediante un menú desplegable.
   - Filtrar películas por sensibilidad ISO mediante otro menú desplegable.
   - Seleccionar películas por formato y por color o blanco y negro usando menús desplegables.
   - Buscar películas por nombre mediante un campo de texto.
   - Implementación de una página reactiva sin recargar al aplicar filtros, actualizando el listado en tiempo real.

2. **Detalle de Películas:**
   - Cada película cuenta con una página propia donde se muestran todos sus detalles e imagen.

3. **Gestión de Proyectos:**
   - Posibilidad de añadir películas a proyectos desde el listado principal mediante un modal. 
   - Crear proyectos nuevos y añadir películas seleccionadas desde el modal.
   - Una página aparte para visualizar todos los proyectos con sus películas, la cual se carga desde el servidor utilizando datos almacenados en cookies.

   Además, esta página contará con componentes interactivos que permitirán:
   - Eliminar un proyecto completo o películas individuales de un proyecto específico mediante modales.

## Almacenamiento de Datos

Todos los datos relacionados con los proyectos y selecciones de películas se guardarán en cookies, accesibles tanto desde el cliente como desde el servidor.

