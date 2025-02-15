import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
export type DataProps = {
    user: string
}

function Data({user}: DataProps) {
    const [info, setInfo] = useState<any>(null)
    
    const handleDelete = async (itemId:string) => {
        try {
            let url = `http://127.0.0.1:3010/api/v2/watches/eliminar/${itemId}`
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
                let url = `http://127.0.0.1:3010/api/v2/watches/user/${user}`
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
                        <p>Serie: {item.serie}</p>
                        <p>Temporada: {item.temporada}</p>
                        <p>Capitulo: {item.capitulo}</p>
                        <p>Duracion: {item.duracion}</p>
                        <p>Checkpoint: {item.checkpoint}</p>
                    </div>
                    
                    <footer>
                        <div>
                            <Link to={`/editarPendiente/${item._id}`}>Editar</Link>
                            <button onClick={() => handleDelete(item._id)}>Eliminar</button>
                        </div>
                    </footer>
                </div>
            ))}
        </>
    )
}

export default Data