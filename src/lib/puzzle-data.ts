export type Word = {
  number: number;
  clue: string;
  answer: string;
  orientation: 'across' | 'down';
  row: number;
  col: number;
};

export const puzzleData = {
  gridSize: 20,
  keyWord: 'MERLIN',
  words: [
    // ACROSS
    { number: 1, clue: 'Metodología ágil para gestión de proyectos.', answer: 'SCRUM', orientation: 'across', row: 1, col: 7 },
    { number: 4, clue: 'Sistema de control de versiones distribuido.', answer: 'GIT', orientation: 'across', row: 3, col: 1 },
    { number: 5, clue: 'Ciclo de desarrollo corto y de tiempo fijo en Scrum.', answer: 'SPRINT', orientation: 'across', row: 3, col: 8 },
    { number: 7, clue: 'Plano o especificación para la construcción de una aplicación.', answer: 'DISEÑO', orientation: 'across', row: 5, col: 0 },
    { number: 9, clue: 'Instrucciones que un ordenador puede ejecutar.', answer: 'CODIGO', orientation: 'across', row: 7, col: 6 },
    { number: 11, clue: 'Formato ligero de intercambio de datos, legible por humanos.', answer: 'JSON', orientation: 'across', row: 9, col: 2 },
    { number: 13, clue: 'Transferir e instalar software a un entorno de producción.', answer: 'DEPLOY', orientation: 'across', row: 11, col: 9 },
    { number: 14, clue: 'Lista de tareas pendientes priorizadas en metodologías ágiles.', answer: 'BACKLOG', orientation: 'across', row: 13, col: 0 },
    { number: 15, clue: 'Punto en el código para inspeccionar el estado del programa.', answer: 'BREAKPOINT', orientation: 'across', row: 15, col: 6 },
    { number: 16, clue: 'Lenguaje de marcado estándar para documentos diseñados para mostrarse en un navegador web.', answer: 'HTML', orientation: 'across', row: 5, col: 14 },
    { number: 17, clue: 'Framework de JavaScript para construir interfaces de usuario.', answer: 'REACT', orientation: 'across', row: 7, col: 14 },
    { number: 18, clue: 'Colección de datos organizados.', answer: 'DATABASE', orientation: 'across', row: 9, col: 12 },
    { number: 19, clue: 'Dirección única para un recurso en la web.', answer: 'URL', orientation: 'across', row: 1, col: 0 },
    { number: 20, clue: 'Un error en un programa de computadora.', answer: 'BUG', orientation: 'across', row: 17, col: 0 },
    { number: 21, clue: 'Contenedor para agrupar variables y funciones.', answer: 'NAMESPACE', orientation: 'across', row: 19, col: 6 },
    
    // DOWN
    { number: 2, clue: 'Interfaz de Programación de Aplicaciones.', answer: 'API', orientation: 'down', row: 1, col: 10 },
    { number: 3, clue: 'Guardar cambios de forma permanente en un repositorio de control de versiones.', answer: 'COMMIT', orientation: 'down', row: 2, col: 5 },
    { number: 6, clue: 'Proceso de encontrar y corregir errores de programación.', answer: 'DEBUG', orientation: 'down', row: 3, col: 13 },
    { number: 8, clue: 'Plantilla para crear objetos en Programación Orientada a Objetos.', answer: 'CLASE', orientation: 'down', row: 6, col: 2 },
    { number: 10, clue: 'Entidad con estado y comportamiento en POO.', answer: 'OBJETO', orientation: 'down', row: 7, col: 8 },
    { number: 12, clue: 'Metodología visual para gestionar el flujo de trabajo.', answer: 'KANBAN', orientation: 'down', row: 9, col: 11 },
    { number: 22, clue: 'Parte de la aplicación con la que el usuario interactúa directamente.', answer: 'FRONTEND', orientation: 'down', row: 11, col: 4 },
    { number: 23, clue: 'Lógica del servidor y la base de datos de una aplicación.', answer: 'BACKEND', orientation: 'down', row: 11, col: 16 },
    { number: 24, clue: 'Pruebas que verifican partes individuales del código.', answer: 'UNITARIAS', orientation: 'down', row: 1, col: 18 },
    { number: 25, clue: 'Conjunto de reglas para que las computadoras se comuniquen entre sí.', answer: 'PROTOCOLO', orientation: 'down', row: 11, col: 0 },
  ]
};
