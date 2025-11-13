import { Outlet } from 'react-router-dom'

import { Header } from './components/header.tsx'

export function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}