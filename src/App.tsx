import './App.css'
import { Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import MenuPrincipal from './pages/MenuPrincipal'
import Registro from './pages/Registro'
import Pendiente from './pages/Pendiente'
import EditarPendiente from './pages/EditarPendiente'
import MiLista from './pages/MiLista'
import EditarMiLista from './pages/EditarMiLista'

function App() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Inicio/>}/>
        <Route path='/registro' element={<Registro/>}/>
        <Route path='/menu-principal' element={<MenuPrincipal/>}/>
        <Route path='/pendiente' element={<Pendiente/>}/>
        <Route path='/editarPendiente/:id' element={<EditarPendiente />} />
        <Route path='/milista' element={<MiLista/>}/>
        <Route path='/editarMiLista/:id' element={<EditarMiLista />} />
      </Routes>
    </main>
  )
}

export default App