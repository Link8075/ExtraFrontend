import { useState, useEffect } from "react"

export type DataProps = {
    API_URL: string
    user: any
    setUser: any
}

function Data({API_URL, user, setUser}: DataProps) {
    const [info, setInfo] = useState<any>(null)

    useEffect(() => {
        const data = async() => {
            try {
                let url = `${API_URL}/api/v2/watches/all`;
                let options = {};
                
                if (user) {
                    url = `${API_URL}/api/v2/users/all`;
                    options = {
                        headers: {
                            Authorization: `Bearer ${user.token}`
                        }
                    }
                }
                
                const response = await fetch(url, options);
                const data = await response.json();
                setInfo(data);
            } catch (error) {
                console.log(error)
            }
        }

        data()
    }, [API_URL, user])

    return (
        <>
            {
                useEffect(() => {
                    const userInStorageString = window.localStorage.getItem("user") as string
                    const userInStorage = JSON.parse(userInStorageString)
                    setUser(userInStorage)
                }, [])
            }
            {
                info && info.map((item: any, index: number) => (
                    user ? (
                            <section key={index} className="dataContainer">
                                <p>Name: {item.name}</p>
                                <p>Email: {item.email}</p>
                                <p>Phone: {item.phoneNumber}</p>
                            </section>
                    ) : (
                            <section key={index} className="dataContainer">
                                <p>Serie: {item.serie}</p>
                                <p>Temporada: {item.temporada}</p>
                                <p>Capítulo: {item.capitulo}</p>
                                <p>Duración: {item.duracion}</p>
                                <p>Checkpoint: {item.checkpoint}</p>
                            </section>
                    )
                ))
            }
        </>
    )
}

export default Data