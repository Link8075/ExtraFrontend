import FetchWatching from "./FetchWatching"

export type DataProps = {
    user: any
    API_URL: string
}

function Data({API_URL, user}: DataProps) {
    return (
        <>
            {
                user && (
                    <FetchWatching API_URL={API_URL} user={user}/>
                )
            }
        </>
    )
}

export default Data