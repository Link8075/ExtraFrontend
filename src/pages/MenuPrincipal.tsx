import { Link, Navigate, useNavigate } from 'react-router-dom'
import Data from '../components/Form/Data'
import DataMyList from '../components/Form/DataMyList'

const MenuPrincipal = () => {
    const navigate = useNavigate()
    let user = ''
    
    const isAuthenticated = !!window.localStorage.getItem('user')
    if (!isAuthenticated) {
        return <Navigate to="/" />
    } else {
        const userJSON = window.localStorage.getItem('user')
        const userObject = userJSON ? JSON.parse(userJSON) : null
        user = userObject ? userObject.user.id : ''
    }
    
    const handleLogout = () => {
        window.localStorage.removeItem('user')
        navigate('/')
    }
    return (
        <>
            <section>
                <h1>Menú principal</h1>
                <div id="navegador">
                    <ul>
                        <li><Link to='/pendiente'>Agregar pendiente</Link></li>
                        <li><Link to='/milista'>Agregar recomendación</Link></li>
                        <li><button onClick={handleLogout}>Cerrar sesión</button></li>
                    </ul>
                </div>
            </section>
            <h2>Pendientes</h2>
            <div className="card">
                <Data user={user} />
            </div>
            <h2>Mi lista</h2>
            <div className="card">
                <DataMyList user={user} />
            </div>
        </>
    )
}

export default MenuPrincipal