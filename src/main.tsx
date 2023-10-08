import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ComparePlanets } from './pages/ComparePlanets'
import { MakePlanet } from './pages/MakePlanet'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MakePlanet />
  </React.StrictMode>,
)
