import { useEffect } from "react"

export type EffectEmail = {
    email: string
    setMessageError: any
}

function EffectInput({email, setMessageError}: EffectEmail) {
    return (
        <>
            {
                useEffect(() => {
                    if (email.includes(" ")) {
                        setMessageError("El correo no puede incluir espacios")
                    } else {
                        setMessageError("")
                    }
                }, [email])
            }
        </>
    )
}

export default EffectInput