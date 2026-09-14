import React, { useState } from 'react';
import InventoryManager from './components/InventoryManager.jsx'
import CounterGame from './components/CounterGame.jsx'

function App() {
  const [tabActiva, setTabActiva] = useState('inventario');

  return (
    <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'inline-block', padding: '6px 14px', background: '#0284c7', color: '#fff', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '12px' }}>
          MÓDULO 4: ACTIVIDAD 6
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px' }}>
          Hooks Avanzados de React
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '650px', marginBottom: '20px' }}>
          Dominio de <code>useReducer</code> para flujos de estado predecibles, <code>useRef</code> para manipulación limpia del DOM y <code>useCallback</code> para optimización de funciones.
        </p>

        <div style={{ display: 'inline-flex', background: '#1e293b', padding: '4px', borderRadius: '12px', border: '1px solid #334155' }}>
          <button
            onClick={() => setTabActiva('inventario')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              background: tabActiva === 'inventario' ? '#38bdf8' : 'transparent',
              color: tabActiva === 'inventario' ? '#0f172a' : '#94a3b8',
              fontWeight: 700
            }}
          >
            🛒 Gestor de Inventario
          </button>
          <button
            onClick={() => setTabActiva('contador')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              background: tabActiva === 'contador' ? '#38bdf8' : 'transparent',
              color: tabActiva === 'contador' ? '#0f172a' : '#94a3b8',
              fontWeight: 700
            }}
          >
            🕹️ Juego de Contador & Undo
          </button>
        </div>
      </header>

      {tabActiva === 'inventario' ? <InventoryManager /> : <CounterGame />}

      <footer style={{ marginTop: '50px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
        React + Vite + GitHub Pages | useReducer + useRef + useCallback
      </footer>
    </div>
  );
}

export default App;