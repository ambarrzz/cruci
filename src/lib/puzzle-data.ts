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
  words : [
    { number: 1, clue: 'Criterios que debe cumplir una historia de usuario para ser considerada bien escrita: Independiente, Negociable, Valiosa, Estimable, Pequeña y Testeable.', answer: 'INVEST', orientation: 'across', row: 1, col: 7 },
    { number: 4, clue: 'Necesidades o condiciones que debe cumplir un sistema o producto para satisfacer las expectativas de los usuarios o stakeholders.', answer: 'REQUERIMIENTOS', orientation: 'across', row: 3, col: 1 },
    { number: 5, clue: 'Opinión o evaluación que se da sobre un trabajo realizado, esencial para mejorar iteraciones futuras.', answer: 'FEEDBACK', orientation: 'across', row: 3, col: 8 },
    { number: 7, clue: 'Persona o grupo con interés en el resultado de un proyecto, como clientes, usuarios o patrocinadores.', answer: 'STAKEHOLDER', orientation: 'across', row: 5, col: 0 },
    { number: 9, clue: 'Marco de trabajo ágil para gestionar proyectos complejos, basado en ciclos cortos llamados sprints.', answer: 'SCRUM', orientation: 'across', row: 7, col: 6 },
    { number: 11, clue: 'Modelo de desarrollo de software secuencial donde cada fase debe completarse antes de comenzar la siguiente.', answer: 'WATERFALL', orientation: 'across', row: 9, col: 2 },
    { number: 13, clue: 'Ciclo de trabajo repetitivo en el que se planifica, desarrolla y revisa un conjunto de funcionalidades.', answer: 'ITERACION', orientation: 'across', row: 11, col: 9 },
    { number: 14, clue: 'Proceso de verificar que un sistema funciona correctamente y cumple con los requerimientos definidos.', answer: 'TESTING', orientation: 'across', row: 13, col: 0 },
    { number: 15, clue: 'Evento en Scrum donde el equipo define qué trabajo se realizará en el próximo sprint.', answer: 'PLANNING', orientation: 'across', row: 15, col: 6 },

    { number: 2, clue: 'Funcionalidad o característica del software que aporta valor al usuario final.', answer: 'FEATURE', orientation: 'down', row: 1, col: 10 },
    { number: 3, clue: 'Periodo de tiempo fijo en Scrum (generalmente 1 a 4 semanas) durante el cual se desarrolla un incremento del producto.', answer: 'SPRINT', orientation: 'down', row: 2, col: 5 },
    { number: 6, clue: 'Configuración específica de software y hardware donde se ejecuta una aplicación (ej.: desarrollo, testing, producción).', answer: 'ENOTORNO', orientation: 'down', row: 3, col: 13 },
    { number: 8, clue: 'Etapa donde se define la arquitectura, componentes y estética de la solución antes de su implementación.', answer: 'DISEÑO', orientation: 'down', row: 6, col: 2 },
    { number: 10, clue: 'Fase en la que se escribe el código y se construye el sistema según lo diseñado.', answer: 'IMPLEMENTACION', orientation: 'down', row: 7, col: 8 },
    { number: 12, clue: 'Entorno donde el software ya ha sido liberado y está siendo usado por los usuarios finales.', answer: 'PRODUCCION', orientation: 'down', row: 9, col: 11 },
  ]
};
