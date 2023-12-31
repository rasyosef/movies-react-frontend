import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from "./useAuthContext"


const EditMovie = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [director, setDirector] = useState('')
    const [writers, setWriters] = useState('')
    const [categories, setCategories] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [created_by, setCreatedBy] = useState('')

    const [error, setError] = useState(null)
    const {token, username, userid} = useAuthContext()

    useEffect(()=>{
        axios.get(`https://movies-django-backend.vercel.app/api/v1/${id}/`, {
            headers : {
                'Content-Type' : 'application/json', 
                Authorization : `Token ${token}`
            }
        }).then(({ data }) => {
            setTitle(data.title)
            setYear(data.year_of_release)
            setDirector(data.director)
            setWriters(data.writers)
            setCategories(data.categories)
            setDescription(data.description)
            setImage(data.image)
            setCreatedBy(data.created_by)
            setError(null)
        }).catch((err) => {
            console.log(err.message)
            setError([err.message])
        }) 

    }, [id, token])

    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put(`https://movies-django-backend.vercel.app/api/v1/${id}/`, 
            JSON.stringify({
                title, year_of_release: year, director, writers,
                categories, description, image, created_by
            }), {
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Token ${token}`
            }
        }).then(() => {
            setError(null)
            navigate(`/movies/${id}`)
        }).catch((err) => {
            if (err.response.status === 400){
                const data = err.response.data
                const messages = []
                for (let field in data){
                    messages.push(...data[field].map((m)=>`${field}: ${m}`))
                }
                setError(messages)  
            } else {
                console.log(err.message)
                setError([err.message])
            }
        })
    }

    return ( 
        <div className="edit-movie">
            <h2>Edit Movie</h2>
            <form onSubmit={(e)=>handleUpdate(e)}>
                <label>Title :</label>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text"></input>
                
                <label>Year :</label>
                <input value={year} onChange={(e)=>setYear(e.target.value)} type="number"></input>

                <label>Director :</label>
                <input value={director} onChange={(e)=>setDirector(e.target.value)} type="text"></input>

                <label>Writers :</label>
                <input value={writers} onChange={(e)=>setWriters(e.target.value)} type="text"></input>

                <label>Genre :</label>
                <input value={categories} onChange={(e)=>setCategories(e.target.value)} type="text"></input>

                <label>Description :</label>
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>

                <label>Link to Movie Cover :</label>
                <input value={image} onChange={(e)=>setImage(e.target.value)} type="text"></input>

                <label>Created By :</label>
                {userid && 
                    <select value={created_by} onChange={(e)=>setCreatedBy(e.target.value)}>
                        <option value={userid}>{username}</option>
                    </select>
                }

                {error && <ul>{ 
                    error.map((m, ind) => (<li key={ind}>{m}</li>))
                }</ul>}

                <button>Update</button>
            </form>
        </div>
    );
}
 
export default EditMovie;