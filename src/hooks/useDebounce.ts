import { useEffect, useState } from "react"

export const useDebounce = (value, delay) => {
    const [debounce, setDebounce] = useState()
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(value)
        }, delay)
    }, [value, delay])
    return (
        debounce
    )
}

