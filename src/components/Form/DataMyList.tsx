import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
export type DataProps = {
    user: string
}

function DataMyList({user}: DataProps) {
    const [info, setInfo] = useState<any>(null)
    
    const handleDelete = async (itemId:string) => {
        try {
            let url = `http://127.0.0.1:3010/api/v2/mylist/eliminar/${itemId}`
            let options = {};
            const response = await fetch(url, options)
            if (response && response.status === 200) {
                window.location.reload();
            } else {
                console.log("Error al eliminar")
            }
        } catch (error) {
            console.error("Ha ocurrido un error", error)
        }
    }
    
    useEffect(() => {
        const data = async() => {
            try {
                let url = `http://127.0.0.1:3010/api/v2/mylist/user/${user}`
                let options = {}
                const response = await fetch(url, options)
                const data = await response.json()
                setInfo(data)
            } catch (error) {
                console.log(error)
            }
        }
        data()
    }, [user])
    
    return (
        <>
            {info && info.map((item: any, index: number) => (
                
                <div key={item._id}>
                    <div>
                        <p>Titulo: {item.titulo}</p>
                        <p>Temporadas: {item.temporadas}</p>
                        <p>Descripcion: {item.descripcion}</p>
                        <p>Plataforma: {item.plataforma}</p>
                    </div>
                    
                    <footer>
                        <div>
                            <Link to={`/editarMiLista/${item._id}`}>Editar</Link>
                            <button onClick={() => handleDelete(item._id)}>Eliminar</button>
                        </div>
                    </footer>
                </div>
            ))}
        </>
    )
}

export default DataMyList