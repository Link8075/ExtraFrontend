const List = async ({titulo, temporadas, descripcion, plataforma, tokenUser, user, API_URL}: {titulo:string, temporadas:number, descripcion:string, plataforma:string, tokenUser:string, user:string, API_URL:string}) => {
    try {
        const response = await fetch(`${API_URL}/api/v2/mylist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenUser}`,
            },
            body: JSON.stringify({titulo, temporadas, descripcion, plataforma, user})
        })
        return response
    } catch(error) {
        console.error(error)
    }
}

export default List