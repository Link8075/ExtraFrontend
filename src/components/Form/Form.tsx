import "./Form.css"
import { useState, useEffect } from "react"
import Data from "./Data"

const loginData = {
      email: "vnavarro@ceti.mx",
      password: "123456",
};

function Form () {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showData, setShowData] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>("");
    
    useEffect(() => {
        if (email.includes(" ")) {
            setMessageError("El correo no puede incluir espacios")
        } else {
            setMessageError("")
        }
    }, [email])

    const handleInputChange = (stateUpdate: any) => {
        return (event: { target: { value: any } }) => {
            stateUpdate(event.target.value)
        }
    }
    
    const handleOnClick = () => {
        if (showData) {
            setEmail("")
            setPassword("")
            setShowData(false)
            setMessageError("")
        }
        else if (email === loginData.email && password === loginData.password) {
            alert("Ingresó correctamente")
            setShowData(true)
            setMessageError("")
        }
        else if (!(email === loginData.email)) {
            setMessageError("Correo incorrecto")
            setShowData(false)
        }
        else if (!(password === loginData.password)) {
            setMessageError("Contraseña incorrecta")
            setShowData(false)
        }
    }
    return (
        <>
            <Data email={email} password={password} showData={showData}/>
            <section className="formContainer">
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
                <button onClick={handleOnClick}>
                    {
                        showData ? "Volver" : "Ingresar"
                    }
                </button>
            </section>
        </>
    )
}

export default Form