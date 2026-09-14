# Actividad 6: Hooks Avanzados (useReducer, useRef, useCallback)

## 📌 Descripción del Proyecto
Esta práctica integra dos aplicaciones completas desarrolladas para dominar los hooks de rendimiento y manejo de estado avanzado:
1. **Gestor de Inventario E-Commerce:**
   - Reducer con acciones `ADD_PRODUCT`, `INCREMENT`, `DECREMENT`, `REMOVE`, `CLEAR_ALL` y `SET_SEARCH`.
   - `useRef` para limpiar y enfocar campos automáticamente sin causar re-renders innecesarios.
   - `useCallback` para memorizar funciones despachadoras hacia elementos hijos.
   - Buscador en tiempo real y persistencia en `localStorage`.
2. **Juego de Contador y Registro de Eventos:**
   - Implementación de acción `undo` (deshacer última acción) en el reducer.
   - Entrada personalizada de saltos numéricos y auto-enfoque al cargar.
