import { useEffect } from "react"

export type EffectUser = {
    setUser: any
}

function EffectStorage({setUser}: EffectUser) {
    return (
        <>
            {
                useEffect(() => {
                    const userInStorageString = window.localStorage.getItem("user") as string
                    const userInStorage = JSON.parse(userInStorageString)
                    setUser(userInStorage)
                }, [])
            }
        </>
    )
}

export default EffectStorage