import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ComparePlanets } from './pages/ComparePlanets'
import { MakePlanet } from './pages/MakePlanet'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { PlanetReport } from './pages/PlanetReport'
import { AppProvider } from './context/AppContext'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MakePlanet />} />
      <Route path="/report" element={<PlanetReport />} />
      <Route path="/compare" element={<ComparePlanets />} />
    </Route>,
  ),
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>,
)
