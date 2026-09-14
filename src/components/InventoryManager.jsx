import React, { useReducer, useState, useRef, useEffect, useCallback } from 'react';
import { inventoryReducer, initialInventory } from '../reducers/inventoryReducer';

function InventoryManager() {
  const [state, dispatch] = useReducer(inventoryReducer, initialInventory);
  const [nombre, setNombre] = useState('');
  const [stock, setStock] = useState(1);
  const [categoria, setCategoria] = useState('Hardware');
  const inputNombreRef = useRef(null);

  useEffect(() => {
    inputNombreRef.current?.focus();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    dispatch({
      type: 'ADD_PRODUCT',
      payload: { id: Date.now(), name: nombre.trim(), stock: Number(stock), category: categoria }
    });
    setNombre('');
    inputNombreRef.current?.focus();
  };

  // useCallback para funciones pasadas a elementos o componentes
  const handleUpdateStock = useCallback((id, newStock) => {
    dispatch({ type: 'UPDATE_STOCK', payload: { id, stock: newStock } });
  }, []);

  const handleRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: id });
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: '20px auto', background: '#1e293b', padding: '24px', borderRadius: '12px' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '16px' }}>📦 Gestor Optimizado con useCallback</h2>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input ref={inputNombreRef} type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Producto" style={{ flex: 2, padding: '8px' }} />
        <input type="number" value={stock} onChange={e => setStock(e.target.value)} min="0" style={{ width: '80px', padding: '8px' }} />
        <button type="submit" style={{ background: '#0284c7', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px' }}>
          Agregar
        </button>
      </form>
      <ul>
        {state.products.map(p => (
          <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #334155', color: '#f8fafc' }}>
            <span>{p.name} - Stock: {p.stock}</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => handleUpdateStock(p.id, p.stock + 1)} style={{ padding: '2px 8px' }}>+1</button>
              <button onClick={() => handleRemove(p.id)} style={{ background: '#ef4444', color: 'white', padding: '2px 8px' }}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryManager;
