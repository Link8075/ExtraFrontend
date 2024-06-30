import { useNavigate } from "react-router-dom"
import logIn from "../components/Form/LogIn"
import EffectInput from "../components/Form/EffectInput"
import { useState } from "react"
import handleInputChange from "../components/Form/InputChange"
import "../components/Form/Form.css"

const API_URL = "http://localhost:3010"

const Inicio = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [user, setUser] = useState<any>(null)
    const [messageError, setMessageError] = useState<string>("")
    const handleOnClick = async () => {
        if (email && password) {
            try {
                const response = await logIn({ email, password, API_URL })
                if (response && response.status === 200) {
                    const data = await response.json()
                    setUser(data)
                    setMessageError("")
                    window.localStorage.setItem("user", JSON.stringify(data))
                    console.log(user)
                    navigate('/menu-principal')
                } else {
                    setMessageError("Datos incorrectos")
                }
            } catch (error) {
                console.error("Error al iniciar sesión:", error)
            }
        } else {
            setMessageError("Favor de completar los campos.")
        }
    }
    const handleRegisterClick = () => {
        navigate('/registro')
    }
    return (
        <>
            <EffectInput email={email} setMessageError={setMessageError}/>
            <section className="formContainer">
                <h1>Inicio de sesión</h1>
                <span className="inputContainer">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleInputChange(setEmail)}/>
                </span>
                <span className="inputContainer">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={handleInputChange(setPassword)}/>
                </span>
                    <div>
                    {
                        messageError && <div style={{color: 'red'}}>{messageError}</div>
                    }
                    </div>
                <button onClick={handleOnClick}>Iniciar sesión</button>
                <button onClick={handleRegisterClick}>Registrarse</button>
            </section>
        </>
    )
}
export default Inicio