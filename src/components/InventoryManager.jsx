import React, { useReducer, useRef, useCallback, useEffect } from 'react';
import { inventoryReducer, initialInventoryState } from '../reducers/inventoryReducer';
import './Inventory.css';

/**
 * Gestor de Inventario con Hooks Avanzados:
 * 1. useReducer: Control centralizado de acciones del catálogo.
 * 2. useRef: Enfoque y limpieza del formulario sin re-renders adicionales.
 * 3. useCallback: Memorización de despachadores para evitar crear nuevas referencias de función en cada render.
 */
function InventoryManager() {
  const [state, dispatch] = useReducer(inventoryReducer, initialInventoryState);

  // useRef para manipular directamente los inputs del formulario
  const nameInputRef = useRef(null);
  const categoryRef = useRef(null);
  const quantityRef = useRef(null);
  const priceRef = useRef(null);
  const searchInputRef = useRef(null);

  // Persistencia con localStorage al montar y actualizar
  useEffect(() => {
    const saved = localStorage.getItem("inventario_ecommerce_react");
    if (saved) {
      try {
        dispatch({ type: "RESTORE_SAVED", products: JSON.parse(saved) });
      } catch (err) {
        console.error("Error al cargar inventario:", err);
      }
    }
    // Enfocar automáticamente el input al cargar la vista
    nameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("inventario_ecommerce_react", JSON.stringify(state.products));
  }, [state.products]);

  // useCallback para optimizar callbacks y no recrear funciones en cada render
  const handleAddProduct = useCallback((e) => {
    e.preventDefault();
    const name = nameInputRef.current.value.trim();
    const category = categoryRef.current.value;
    const quantity = parseInt(quantityRef.current.value, 10) || 1;
    const price = parseFloat(priceRef.current.value) || 10;

    if (!name) {
      alert("Por favor ingresa un nombre para el producto.");
      nameInputRef.current.focus();
      return;
    }

    dispatch({
      type: "ADD_PRODUCT",
      name,
      category,
      quantity,
      price
    });

    // Limpiar campos usando useRef
    nameInputRef.current.value = "";
    quantityRef.current.value = "1";
    priceRef.current.value = "";
    nameInputRef.current.focus();
  }, []);

  const handleIncrement = useCallback((id) => {
    dispatch({ type: "INCREMENT", id });
  }, []);

  const handleDecrement = useCallback((id) => {
    dispatch({ type: "DECREMENT", id });
  }, []);

  const handleRemove = useCallback((id) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  const handleClear = useCallback(() => {
    if (window.confirm("¿Seguro que deseas vaciar todo el inventario?")) {
      dispatch({ type: "CLEAR_ALL" });
    }
  }, []);

  // Filtrado reactivo por término de búsqueda
  const productosFiltrados = state.products.filter((p) =>
    p.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(state.searchTerm.toLowerCase())
  );

  const valorTotalInventario = state.products.reduce(
    (total, p) => total + p.quantity * p.price,
    0
  );

  return (
    <div className="inventario-card">
      <h2 style={{ fontSize: '1.7rem', color: '#38bdf8', marginBottom: '8px' }}>
        📦 Gestor de Inventario E-Commerce
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '22px' }}>
        Implementación con <code>useReducer</code>, <code>useRef</code> y <code>useCallback</code>.
      </p>

      <form onSubmit={handleAddProduct} className="inv-form">
        <input
          ref={nameInputRef}
          type="text"
          placeholder="Nombre del producto"
        />
        <select ref={categoryRef}>
          <option value="Periféricos">Periféricos</option>
          <option value="Pantallas">Pantallas</option>
          <option value="Componentes">Componentes</option>
          <option value="Audio">Audio</option>
          <option value="Accesorios">Accesorios</option>
        </select>
        <input
          ref={quantityRef}
          type="number"
          defaultValue={1}
          min={1}
          placeholder="Cantidad"
        />
        <input
          ref={priceRef}
          type="number"
          step="0.01"
          placeholder="Precio ($)"
        />
        <button type="submit" className="btn-add-prod">
          + Agregar
        </button>
      </form>

      <div className="inv-tools-bar">
        <input
          ref={searchInputRef}
          type="text"
          className="inv-search"
          placeholder="🔍 Buscar por nombre o categoría..."
          value={state.searchTerm}
          onChange={(e) => dispatch({ type: "SET_SEARCH", term: e.target.value })}
        />
        {state.products.length > 0 && (
          <button
            onClick={handleClear}
            style={{ background: 'transparent', color: '#f87171', fontSize: '0.85rem', textDecoration: 'underline' }}
          >
            Vaciar inventario
          </button>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontSize: '0.85rem', color: '#cbd5e1' }}>
        <span>Artículos registrados: <strong>{state.products.length}</strong></span>
        <span>Valoración total: <strong style={{ color: '#10b981' }}>${valorTotalInventario.toLocaleString()} USD</strong></span>
      </div>

      <ul style={{ listStyle: 'none' }}>
        {productosFiltrados.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '30px 0' }}>
            No se encontraron productos en el inventario.
          </p>
        ) : (
          productosFiltrados.map((prod) => (
            <li key={prod.id} className="prod-item">
              <div className="prod-info">
                <strong style={{ fontSize: '1rem', color: '#f8fafc' }}>{prod.name}</strong>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {prod.category} • ${prod.price} c/u • Subtotal: ${(prod.quantity * prod.price).toFixed(2)}
                </span>
              </div>

              <div className="prod-actions">
                <button
                  className="btn-qty"
                  onClick={() => handleDecrement(prod.id)}
                  title="Restar cantidad"
                >
                  -
                </button>
                <span style={{ minWidth: '36px', textAlign: 'center', fontWeight: 700, color: '#38bdf8' }}>
                  {prod.quantity}
                </span>
                <button
                  className="btn-qty"
                  onClick={() => handleIncrement(prod.id)}
                  title="Sumar cantidad"
                >
                  +
                </button>
                <button
                  className="btn-del-prod"
                  onClick={() => handleRemove(prod.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default InventoryManager;