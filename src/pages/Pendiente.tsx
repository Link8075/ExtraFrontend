import { Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import handleInputChange from "../components/Form/InputChange"
import "../components/Form/Form.css"
import List from "../components/Form/List"

const API_URL = "http://localhost:3010"

const Pendiente = () => {
    const navigate = useNavigate()
    const [serie, setSerie] = useState<string>("")
    const [temporada, setTemporada] = useState(1)
    const [capitulo, setCapitulo] = useState(1)
    const [duracion, setDuracion] = useState<string>("")
    const [checkpoint, setCheckpoint] = useState<string>("")
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
        if (serie && temporada && capitulo && duracion && checkpoint) {
            try {
                const response = await List({ serie, temporada, capitulo, duracion, checkpoint, tokenUser, user, API_URL })
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
                <h2>Agregar pendiente</h2>
                <div>
                    {
                        <div style={{color: 'red'}}>{messageError}</div>
                    }
                </div>
                <span className="inputContainer">
                    <label htmlFor="serie">Serie:</label>
                    <input type="text" id="serie" name="serie" value={serie} onChange={handleInputChange(setSerie)}/>
                </span>
                <span className="inputContainer">
                    <label htmlFor="temporada">Temporada:</label>
                    <input type="number" id="temporada" name="temporada" value={temporada} onChange={handleInputChange(setTemporada)} min={1}/>
                </span>
                <span className="inputContainer">
                    <label htmlFor="capitulo">Capitulo:</label>
                    <input type="number" id="capitulo" name="capitulo" value={capitulo} onChange={handleInputChange(setCapitulo)} min={1}/>
                </span>
                <span className="inputContainer">
                    <label htmlFor="duracion">Duracion:</label>
                    <input type="text" id="duracion" name="duracion" value={duracion} onChange={handleInputChange(setDuracion)}/>
                </span>
                <span className="inputContainer">
                    <label htmlFor="checkpoint">Checkpoint:</label>
                    <input type="text" id="checkpoint" name="checkpoint" value={checkpoint} onChange={handleInputChange(setCheckpoint)}/>
                </span>
                <button onClick={handleOnClick}>Guardar</button>
                <button onClick={handleRegresarClick}>Regresar</button>
            </section>
        </>
    )
}
export default Pendiente