import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'

const DeleteMovie = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [error, setError] = useState(null)

    const {token} = useAuthContext()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/v1/${id}/`, { 
            headers : { 
                'Content-Type' : 'application/json', 
                Authorization : `Token ${token}` 
            } 
        }).then(({ data }) => {
            setTitle(data.title)
            setError(null)
        }).catch((err) => {
            console.log(err.message)
            setError([err.message])
        })
    }, [id, token])

    const handleDelete = (e) => {
        e.preventDefault()

        axios.delete(`http://localhost:8000/api/v1/${id}/`, {
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Token ${token}`
            }
        }).then(() => {
            setError(null)
            navigate('/')
        }).catch((err) => {
            console.log(err.message)
            setError([err.message])
        })
    }

    return (
        <div className="delete-movie">
            <form onSubmit={(e)=>handleDelete(e)}>
                <h2>Are you sure you want to delete "{title}"</h2>
                
                {error && <p>{error}</p>}

                <button>Delete</button>
            </form>
        </div> 
        
    );
}
 
export default DeleteMovie;