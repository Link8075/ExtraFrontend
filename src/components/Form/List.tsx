const List = async ({serie, temporada, capitulo, duracion, checkpoint, tokenUser, user, API_URL}: {serie:string, temporada:number, capitulo:number, duracion:string, checkpoint:string, tokenUser:string, user:string, API_URL:string}) => {
    try {
        const response = await fetch(`${API_URL}/api/v2/watches`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenUser}`,
            },
            body: JSON.stringify({serie, temporada, capitulo, duracion, checkpoint, user})
        })
        return response
    } catch(error) {
        console.error(error)
    }
}

export default List