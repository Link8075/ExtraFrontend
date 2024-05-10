function handleInputChange (stateUpdate: any) {
    return (event: { target: { value: any } }) => {
        stateUpdate(event.target.value)
    }
}

export default handleInputChange