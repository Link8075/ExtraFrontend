import { useNavigate } from "react-router-dom"
import EffectInput from "../components/Form/EffectInput"
import { useState } from "react"
import handleInputChange from "../components/Form/InputChange"
import "../components/Form/Form.css"
import SigIn from "../components/Form/SignIn"

const API_URL = "http://localhost:3010"

const Registro = () => {
    const navigate = useNavigate()
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [messageError, setMessageError] = useState<string>("")
    
    const handleOnClick = async () => {
        if (name && email && password && phoneNumber) {
            try {
                const response = await SigIn({ name, email, password, phoneNumber, API_URL })
                if (response && response.status === 201) {
                    setMessageError("")
                    navigate('/')
                } else {
                    setMessageError("Ocurrió un error al registrarlo. Inténtalo de nuevo más tarde.")
                }
            } catch (error) {
                console.error("Error al registrarlo:", error)
                setMessageError("Ocurrió un error al registrarlo. Inténtalo de nuevo más tarde.")
            }
        } else {
            setMessageError("Por favor, complete los campos.")
        }
    }
    
    const handleRegisterClick = () => {
        navigate('/')
    }
    return (
        <>
            <EffectInput email={email} setMessageError={setMessageError}/>
            <section className="formContainer">
                <h1>Registrarse</h1>
                <div>
                    {
                        <div style={{color: 'red'}}>{messageError}</div>
                    }
                </div>
                <span className="inputContainer">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={handleInputChange(setName)}/>
                </span>
                <span className="inputContainer">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleInputChange(setEmail)}/>
                </span>
                <span className="inputContainer">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={handleInputChange(setPassword)}/>
                </span>
                <span className="inputContainer">
                    <label htmlFor="phoneNumber">Phone:</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={handleInputChange(setPhoneNumber)}/>
                </span>
                <button onClick={handleOnClick}>Registrar</button>
                <button onClick={handleRegisterClick}>Regresar</button>
            </section>
        </>
    )
}
export default Registro