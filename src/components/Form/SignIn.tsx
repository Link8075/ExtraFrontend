const SigIn = async ({name, email, password, phoneNumber, API_URL}: {name:string, email:string, password:string, phoneNumber:string, API_URL:string}) => {
    try {
        const response = await fetch(`${API_URL}/api/v2/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password, phoneNumber})
        })
        return response
    } catch(error) {
        console.error(error)
    }
}

export default SigIn