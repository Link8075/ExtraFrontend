const logIn = async ({email, password, API_URL}: {email:string, password:string, API_URL:string}) => {
    try {
        const response = await fetch(`${API_URL}/api/v2/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })
        return response
    } catch(error) {
        console.error(error)
    }
}

export default logIn