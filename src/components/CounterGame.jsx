import React, { useReducer, useRef, useCallback, useEffect, useState } from 'react';
import './Inventory.css';

const initialState = { count: 0, history: [] };

function counterReducer(state, action) {
  switch (action.type) {
    case "increment": {
      const step = action.step || 1;
      const newCount = state.count + step;
      return {
        count: newCount,
        history: [`+${step} (Nuevo valor: ${newCount})`, ...state.history.slice(0, 19)]
      };
    }
    case "decrement": {
      const step = action.step || 1;
      const newCount = state.count - step;
      return {
        count: newCount,
        history: [`-${step} (Nuevo valor: ${newCount})`, ...state.history.slice(0, 19)]
      };
    }
    case "undo": {
      if (state.history.length === 0) return state;
      const lastEntry = state.history[0];
      const match = lastEntry.match(/([+-]\d+)/);
      const delta = match ? parseInt(match[0], 10) : 0;
      return {
        count: state.count - delta,
        history: state.history.slice(1)
      };
    }
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function CounterGame() {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const [paso, setPaso] = useState(1);
  const incrementBtnRef = useRef(null);

  useEffect(() => {
    // Enfocar botón automáticamente al montar (useRef)
    incrementBtnRef.current?.focus();
  }, []);

  const handleIncrement = useCallback(() => {
    dispatch({ type: "increment", step: Number(paso) || 1 });
  }, [paso]);

  const handleDecrement = useCallback(() => {
    dispatch({ type: "decrement", step: Number(paso) || 1 });
  }, [paso]);

  const handleUndo = useCallback(() => {
    dispatch({ type: "undo" });
  }, []);

  return (
    <div className="counter-game-card">
      <h2 style={{ fontSize: '1.6rem', color: '#38bdf8', marginBottom: '8px' }}>
        🕹️ Contador y Registro de Eventos
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '20px' }}>
        Opción secundaria del taller con <code>useReducer</code>, <code>useRef</code>, <code>useCallback</code> y botón Deshacer (Undo).
      </p>

      <div style={{ fontSize: '3rem', fontWeight: 800, color: '#f8fafc', marginBottom: '16px' }}>
        {state.count}
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '18px', alignItems: 'center' }}>
        <label style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Incremento por paso:</label>
        <input
          type="number"
          value={paso}
          onChange={(e) => setPaso(Math.max(1, parseInt(e.target.value, 10) || 1))}
          style={{ width: '70px', textAlign: 'center' }}
          min="1"
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
        <button
          ref={incrementBtnRef}
          onClick={handleIncrement}
          style={{ background: '#10b981', color: 'white', padding: '10px 18px', fontSize: '1.1rem' }}
        >
          +{paso}
        </button>
        <button
          onClick={handleDecrement}
          style={{ background: '#ef4444', color: 'white', padding: '10px 18px', fontSize: '1.1rem' }}
        >
          -{paso}
        </button>
        <button
          onClick={handleUndo}
          disabled={state.history.length === 0}
          style={{ background: '#f59e0b', color: '#0f172a', padding: '10px 18px' }}
        >
          ↩ Deshacer
        </button>
        <button
          onClick={() => dispatch({ type: "reset" })}
          style={{ background: '#334155', color: '#f8fafc', padding: '10px 18px' }}
        >
          Reset
        </button>
      </div>

      <h4 style={{ textAlign: 'left', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px' }}>
        Historial de cambios:
      </h4>
      <ul style={{ listStyle: 'none', textAlign: 'left', background: '#0f172a', borderRadius: '8px', padding: '12px', border: '1px solid #334155', maxHeight: '150px', overflowY: 'auto' }}>
        {state.history.length === 0 ? (
          <li style={{ color: '#64748b', fontSize: '0.85rem' }}>No hay acciones registradas.</li>
        ) : (
          state.history.map((entry, idx) => (
            <li key={idx} style={{ fontSize: '0.85rem', color: '#7dd3fc', padding: '2px 0' }}>
              • {entry}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default CounterGame;