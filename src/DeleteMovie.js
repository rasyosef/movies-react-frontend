import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie'

const DeleteMovie = () => {
    const { id } = useParams()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [error, setError] = useState(null)

    const cookies = new Cookies()
    const [token,] = useState(cookies.get('token'))

    useEffect(()=>{
        fetch(`http://localhost:8000/api/v1/${id}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json', 
                Authorization : `Token ${token}`
            }
        }).then((res) => {
            if (!res.ok){ 
                throw Error(`Error ${res.status}: data could not be fetched`)
            }
            return res.json()
        }).then((data) => {
            setTitle(data.title)
            setError(null)
        }).catch((err) => {
            console.log(err.message)
            setError(err.message)
        })
    }, [id, token])

    const handleDelete = (e) => {
        e.preventDefault()

        fetch(`http://localhost:8000/api/v1/${id}/`, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Token ${token}`
            },
        }).then((res) => {
            if (!res.ok){ 
                throw Error(`Error ${res.status}: data could not be fetched`)
            }
        }).then(() => {
            setError(null)
            history.push('/')
        }).catch((err) => {
            console.log(err.message)
            setError(err.message)
        })
    }

    return (
        <div className="delete-movie">
            <form onSubmit={(e)=>handleDelete(e)}>
                <h2>Are you sure you want to delete "{title}"</h2>
                
                {error && <p>Error :{ error }</p>}

                <button>Delete</button>
            </form>
        </div> 
        
    );
}
 
export default DeleteMovie;