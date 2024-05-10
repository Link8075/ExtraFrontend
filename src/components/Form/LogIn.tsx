const logIn = async ({email, password, API_URL, setUser, setMessageError}: {email:string, password:string, API_URL:string, setUser:any, setMessageError:any}) => {
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
            window.localStorage.setItem("user", JSON.stringify(data))
        }
        else {
            setMessageError("Datos incorrectos")
        }
    } catch(error) {
        console.error(error)
    }
}

export default logIn