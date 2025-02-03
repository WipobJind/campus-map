// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // This is crucial!
import App from './App';
import 'leaflet/dist/leaflet.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);