import { useState } from 'react'
function CountButton() {
    const [count, setCount] = useState<number>(0)
    
    const handleOnClic = () => {
        setCount(count + 1)
    }
    return (
        <button onClick={handleOnClic}>
          count is {count}
        </button>
    )
}

export default CountButton