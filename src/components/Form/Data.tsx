export type DataProps = {
    password: string,
    email: string,
    showData: boolean
}
function Data({email, password, showData}: DataProps) {
    return (
        <section className="dataContainer">
            {
                showData && (
                    <>
                        <p>Email: {email}</p>
                        <p>Password: {password}</p>
                    </>
                )
            }
        </section>
    )
}

export default Data