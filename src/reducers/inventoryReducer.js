/**
 * Reducer para la gestión de inventario de e-commerce
 * Maneja acciones predecibles y de estado complejo con useReducer.
 */
export const initialInventoryState = {
  products: [
    { id: 1, name: "Teclado Mecánico RGB", category: "Periféricos", quantity: 12, price: 85 },
    { id: 2, name: "Mouse Inalámbrico Pro", category: "Periféricos", quantity: 24, price: 49 },
    { id: 3, name: "Monitor 27'' 144Hz", category: "Pantallas", quantity: 8, price: 280 }
  ],
  searchTerm: ""
};

export function inventoryReducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [
          ...state.products,
          {
            id: Date.now(),
            name: action.name,
            category: action.category || "General",
            quantity: action.quantity || 1,
            price: action.price || 10
          }
        ]
      };

    case "INCREMENT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      };

    case "DECREMENT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
        )
      };

    case "REMOVE":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.id)
      };

    case "CLEAR_ALL":
      return {
        ...state,
        products: []
      };

    case "SET_SEARCH":
      return {
        ...state,
        searchTerm: action.term
      };

    case "RESTORE_SAVED":
      return {
        ...state,
        products: action.products
      };

    default:
      return state;
  }
}