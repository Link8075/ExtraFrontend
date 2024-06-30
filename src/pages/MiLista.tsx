import { Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import handleInputChange from "../components/Form/InputChange"
import "../components/Form/Form.css"
import MyList from "../components/Form/MyList"

const API_URL = "http://localhost:3010"

const MiLista = () => {
    const navigate = useNavigate()
    const [titulo, setTitulo] = useState<string>("")
    const [temporadas, setTemporadas] = useState(1)
    const [descripcion, setDescripcion] = useState<string>("")
    const [plataforma, setPlataforma] = useState<string>("")
    const [messageError, setMessageError] = useState<string>("")
    let tokenUser = ''
    let user = ''
    
    const isAuthenticated = !!window.localStorage.getItem('user')
    if (!isAuthenticated) {
        return <Navigate to="/" />
    } else {
        const userJSON = window.localStorage.getItem('user')
        const userObject = userJSON ? JSON.parse(userJSON) : null
        tokenUser = userObject ? userObject.token : ''
        user = userObject ? userObject.user.id : ''
    }
    const handleOnClick = async () => {
        if (titulo && temporadas && descripcion && plataforma) {
            try {
                const response = await MyList({ titulo, temporadas, descripcion, plataforma, tokenUser, user, API_URL })
                if (response && response.status === 201) {
                    setMessageError("")
                    navigate('/menu-principal');
                } else {
                    setMessageError("Ocurrió un error al agregar. Inténtalo de nuevo más tarde.")
                }
            } catch (error) {
                console.error("Error al registrar:", error)
                setMessageError("Ocurrió un error al agregar. Inténtalo de nuevo más tarde.")
            }
        } else {
            setMessageError("Por favor, completa todos los campos.");
        }
    }
    const handleRegresarClick = () => {
        navigate('/menu-principal')
    }
    return (
        <>
            <section className="formContainer">
                <h2>Agregar a mi lista</h2>
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
                    <input type="text" id="descripcion" name="descripcion" value={descripcion} onChange={handleInputChange(setDescripcion)} aria-multiline/>
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
export default MiLista