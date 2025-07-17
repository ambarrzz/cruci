export type Word = {
  number: number;
  clue: string;
  answer: string;
  orientation: 'across' | 'down';
  row: number;
  col: number;
};

export const puzzleData = {
  gridSize: 15,
  keyWord: 'AGILIDAD',
  words: [
    // ACROSS
    { number: 1, clue: 'Metodología ágil para gestión de proyectos.', answer: 'SCRUM', orientation: 'across', row: 1, col: 6 },
    { number: 4, clue: 'Sistema de control de versiones.', answer: 'GIT', orientation: 'across', row: 3, col: 1 },
    { number: 5, clue: 'Ciclo de desarrollo corto en Scrum.', answer: 'SPRINT', orientation: 'across', row: 3, col: 7 },
    { number: 7, clue: 'Plano o especificación para la construcción de una aplicación.', answer: 'DISEÑO', orientation: 'across', row: 5, col: 0 },
    { number: 9, clue: 'Instrucciones que un ordenador puede ejecutar.', answer: 'CODIGO', orientation: 'across', row: 7, col: 5 },
    { number: 11, clue: 'Formato ligero de intercambio de datos.', answer: 'JSON', orientation: 'across', row: 9, col: 2 },
    { number: 13, clue: 'Transferir software a un entorno de producción.', answer: 'DEPLOY', orientation: 'across', row: 11, col: 8 },
    { number: 14, clue: 'Lista de tareas pendientes en metodologías ágiles.', answer: 'BACKLOG', orientation: 'across', row: 13, col: 0 },

    // DOWN
    { number: 2, clue: 'Interfaz de Programación de Aplicaciones.', answer: 'API', orientation: 'down', row: 1, col: 9 },
    { number: 3, clue: 'Guardar cambios en un repositorio.', answer: 'COMMIT', orientation: 'down', row: 2, col: 4 },
    { number: 6, clue: 'Proceso de encontrar y corregir errores.', answer: 'DEBUG', orientation: 'down', row: 3, col: 12 },
    { number: 8, clue: 'Plantilla para crear objetos en POO.', answer: 'CLASE', orientation: 'down', row: 6, col: 2 },
    { number: 10, clue: 'Entidad con estado y comportamiento en POO.', answer: 'OBJETO', orientation: 'down', row: 7, col: 7 },
    { number: 12, clue: 'Metodología visual para gestionar el trabajo.', answer: 'KANBAN', orientation: 'down', row: 9, col: 9 },
  ]
};
