import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './styles/index.css'
import { Home } from './pages/home.tsx'
import { Cart } from './pages/cart.tsx'
import { Success } from './pages/success.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/order/:orderId/success',
        element: <Success />,
      },
    ],
  },
])


createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
