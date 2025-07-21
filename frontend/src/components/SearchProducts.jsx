import { useState, useEffect } from "react"

const SearchProducts = () => {
    const [term, setTerm] = useState("")
    const [results, setResults] = useState([])

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (term.trim()) {
                fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/search?name=${term}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            setResults(data.data)
                        } else {
                            setResults([])
                        }
                    })
                    .catch(err => {
                        console.error("Error al buscar:", err)
                        setResults([])
                    })
            } else {
                setResults([])
            }
        }, 300)

        return () => clearTimeout(delayDebounce)
    }, [term])

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar producto..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                style={{ padding: "8px", width: "100%", maxWidth: "400px", marginBottom: "10px" }}
            />

            <ul>
                {results.map((prod) => (
                    <li key={prod._id}>{prod.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default SearchProducts
