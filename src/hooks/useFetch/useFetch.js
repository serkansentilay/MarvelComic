import axios from "axios"
import { useState, useEffect } from "react"

const useFetch = (url) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            const { data: responseData } = await axios.get(url)
            setData(responseData)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { data, loading, error }

}
export default useFetch