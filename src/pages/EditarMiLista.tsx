import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import handleInputChange from "../components/Form/InputChange"
import "../components/Form/Form.css"
import EditMyList from "../components/Form/EditMyList"

const EditarPendiente = () => {
    const { id } = useParams();
    const idString = id ? id.toString() : ''
    const [titulo, setTitulo] = useState<string>("")
    const [temporadas, setTemporadas] = useState(1)
    const [descripcion, setDescripcion] = useState<string>("")
    const [plataforma, setPlataforma] = useState<string>("")
    const [messageError, setMessageError] = useState<string>("")
    let tokenUser = ''
    let user = ''
    const navigate = useNavigate()
    const isAuthenticated = !!window.localStorage.getItem('user')
    if (!isAuthenticated) {
        return <Navigate to="/" />
    } else {
        const userJSON = window.localStorage.getItem('user')
        const userObject = userJSON ? JSON.parse(userJSON) : null
        tokenUser = userObject ? userObject.token : ''
        user = userObject ? userObject.user.id : ''
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://127.0.0.1:3010/api/v2/mylist/registro/${id}`
                const options = {}
                const response = await fetch(url, options)
                if (response && response.status === 200) {
                    const data = await response.json()
                    setTitulo(data.titulo)
                    setTemporadas(data.temporadas)
                    setDescripcion(data.descripcion)
                    setPlataforma(data.plataforma)
                } else {
                    console.log('Error al consultar')
                }
            } catch (error) {
                console.error('Ha ocurrido un error', error)
            }
        }
        fetchData()
    }, [])
    
    const handleOnClick = async () => {
        if (titulo && temporadas && descripcion && plataforma) {
            try {
                const response = await EditMyList({ titulo, temporadas, descripcion, plataforma, tokenUser, user, idString })
                if (response && response.status === 201) {
                    setMessageError("")
                    navigate('/menu-principal')
                } else {
                    setMessageError("Ocurrió un error al editar. Inténtalo de nuevo más tarde.")
                }
            } catch (error) {
                console.error("Error al editar:", error)
                setMessageError("Ocurrió un error al editar. Inténtalo de nuevo más tarde.")
            }
        } else {
            setMessageError("Por favor, completa todos los campos.")
        }
    }
    const handleRegresarClick = () => {
        navigate('/menu-principal')
    }
    return (
        <>
            <section className="formContainer">
                <h2>Editar pendiente</h2>
                <div>
                    {
                        <div style={{color: 'red'}}>{messageError}</div>
                    }
                </div>
                <span className="inputContainer">
                    <label htmlFor="titulo">Titulo:</label>
                    <input type="text" id="titulo" name="titulo" value={titulo} onChange={handleInputChange(setTitulo)}/>
                </span>
                <span className="inputContainer">
                    <label htmlFor="temporadas">Temporadas:</label>
                    <input type="number" id="temporadas" name="temporadas" value={temporadas} onChange={handleInputChange(setTemporadas)} min={1}/>
                </span>
                <span className="inputContainer">
                    <label htmlFor="descripcion">Descripcion:</label>
                    <input type="text" id="descripcion" name="descripcion" value={descripcion} onChange={handleInputChange(setDescripcion)}/>
                </span>
                <span className="inputContainer">
                    <label htmlFor="plataforma">Plataforma:</label>
                    <input type="text" id="plataforma" name="plataforma" value={plataforma} onChange={handleInputChange(setPlataforma)}/>
                </span>
                <button onClick={handleOnClick}>Guardar</button>
                <button onClick={handleRegresarClick}>Regresar</button>
            </section>
        </>
    )
}
export default EditarPendiente