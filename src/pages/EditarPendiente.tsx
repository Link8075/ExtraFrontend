import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import handleInputChange from "../components/Form/InputChange"
import "../components/Form/Form.css"
import Edit from "../components/Form/Edit"

const EditarPendiente = () => {
    const { id } = useParams();
    const idString = id ? id.toString() : ''
    const [serie, setSerie] = useState<string>('')
    const [temporada, setTemporada] = useState(1)
    const [capitulo, setCapitulo] = useState(1)
    const [duracion, setDuracion] = useState<string>('')
    const [checkpoint, setCheckpoint] = useState<string>('')
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
                const url = `http://127.0.0.1:3010/api/v2/watches/registro/${id}`
                const options = {}
                const response = await fetch(url, options)
                if (response && response.status === 200) {
                    const data = await response.json()
                    setSerie(data.serie)
                    setTemporada(data.temporada)
                    setCapitulo(data.capitulo)
                    setDuracion(data.duracion)
                    setCheckpoint(data.checkpoint)
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
        if (serie && temporada && capitulo && duracion && checkpoint) {
            try {
                const response = await Edit({ serie, temporada, capitulo, duracion, checkpoint, tokenUser, user, idString })
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
export default EditarPendiente