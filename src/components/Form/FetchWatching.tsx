import { useState, useEffect } from "react"

export type FetchWatchingProps = {
    API_URL: string
    user: any
}

function FetchWatching({API_URL, user}: FetchWatchingProps) {
    const [info, setInfo] = useState<any>(null)

    useEffect(() => {
        const fetchWatching = async() => {
            try {
                const response = await fetch(`${API_URL}/api/v2/watches/all`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                const data = await response.json()  
                setInfo(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchWatching()
    }, [API_URL, user])

    return (
        <>
            {
                info && info.map((item: any, index: number) => (
                    <section key={index} className="dataContainer">
                        <p>Serie: {item.serie}</p>
                        <p>Temporada: {item.temporada}</p>
                        <p>Capítulo: {item.capitulo}</p>
                        <p>Duración: {item.duracion}</p>
                        <p>Checkpoint: {item.checkpoint}</p>
                    </section>
                ))
            }
        </>
    )
}

export default FetchWatching
