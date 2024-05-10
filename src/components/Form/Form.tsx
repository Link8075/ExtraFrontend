import "./Form.css"
import { useState, useEffect } from "react"
import Data from "./Data"

const API_URL = "http://localhost:3010"

// const loginData = {
//       email: "vnavarro@ceti.mx",
//       password: "123456",
// }

function Form () {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // const [showData, setShowData] = useState<boolean>(false)
    const [user, setUser] = useState<any>(null)
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
        logIn({email, password})
        // if (email === loginData.email && password === loginData.password) {
        //     alert("Ingresó correctamente")
        //     setMessageError("")
        //     setShowData(true)
        // }
        // else if (!(email === loginData.email)) {
        //     setMessageError("Correo incorrecto")
        //     setShowData(false)
        // }
        // else if (!(password === loginData.password)) {
        //     setMessageError("Contraseña incorrecta")
        //     setShowData(false)
        // }
    }
    
    const logIn = async ({email, password}: {email:string, password:string}) => {
        try {
            const response = await fetch(`${API_URL}/api/v2/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            })
            if (response.status === 200) {
                const data = await response.json()
                setUser(data)
                setMessageError("")
                console.log(data)
                // setShowData(true)
            }
            else {
                setMessageError("Datos incorrectos")
                // setShowData(false)
            }
        } catch(error) {
            console.error(error)
        }
    }
    
    return (
        <>
            <Data user={user}/>
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
                <button onClick={handleOnClick}>Iniciar sesion</button>
            </section>
        </>
    )
}

export default Form