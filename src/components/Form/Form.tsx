import "./Form.css"
import { useState } from "react"
import Data from "./Data"
import EffectStorage from "./EffectStorage"
import EffectInput from "./EffectInput"
import handleInputChange from "./InputChange"
import logIn from "./LogIn"

const API_URL = "http://localhost:3010"

function Form () {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [user, setUser] = useState<any>(null)
    const [messageError, setMessageError] = useState<string>("")
    
    const handleOnClick = () => {
        logIn({email, password, API_URL, setUser, setMessageError})
    }
    
    return (
        <>
            <EffectStorage setUser={setUser}/>
            <EffectInput email={email} setMessageError={setMessageError}/>
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