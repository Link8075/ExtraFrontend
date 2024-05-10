export type DataProps = {
    user: any
}
function Data({user}: DataProps) {
    return (
        <>
            {
                user && (
                    <section className="dataContainer">
                        {
                            <>
                                <p>Name: {user.user.name}</p>
                                <p>Email: {user.user.email}</p>
                                <p>Phone: {user.user.phoneNumber}</p>
                            </>
                        }
                    </section>
                )
            }
        </>
    )
}

export default Data