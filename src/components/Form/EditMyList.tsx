const EditMyList = async ({titulo, temporadas, descripcion, plataforma, tokenUser, user, idString}: {titulo:string, temporadas:number, descripcion:string, plataforma:string, tokenUser:string, user:string, idString:string}) => {
    try {
        const response = await fetch(`http://127.0.0.1:3010/api/v2/mylist/editar/${idString}`, {
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

export default EditMyList