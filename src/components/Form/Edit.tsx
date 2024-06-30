const Edit = async ({serie, temporada, capitulo, duracion, checkpoint, tokenUser, user, idString}: {serie:string, temporada:number, capitulo:number, duracion:string, checkpoint:string, tokenUser:string, user:string, idString:string}) => {
    try {
        const response = await fetch(`http://127.0.0.1:3010/api/v2/watches/editar/${idString}`, {
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

export default Edit