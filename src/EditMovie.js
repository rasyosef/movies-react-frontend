import { useState, useEffect } from "react"
import { useParams, useHistory } from 'react-router-dom'

const EditMovie = () => {
    const { id } = useParams()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [director, setDirector] = useState('')
    const [writers, setWriters] = useState('')
    const [categories, setCategories] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [created_by, setCreatedBy] = useState(1)

    const [error, setError] = useState(null)

    useEffect(()=>{
        fetch(`http://localhost:8000/api/v1/${id}`).then((res) => {
            if (!res.ok){ 
                throw Error(`Error ${res.status}: data could not be fetched`)
            }
            return res.json()
        }).then((data) => {
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
            setError(err.message)
        })
    }, [id])

    const handleUpdate = (e) => {
        e.preventDefault()

        fetch(`http://localhost:8000/api/v1/${id}/`, {
            method : 'PUT',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                title,
                year_of_release: year,
                director,
                writers,
                categories,
                description,
                image,
                created_by,
            })
        }).then((res) => {
            if (!res.ok){ 
                throw Error(`Error ${res.status}: data could not be fetched`)
            }
        }).then(() => {
            setError(null)
            history.push(`/movies/${id}`)
        }).catch((err) => {
            console.log(err.message)
            setError(err.message)
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
                <select value={created_by} onChange={(e)=>setCreatedBy(e.target.value)}>
                    <option value={1}>ras</option>
                </select>

                {error && <p>Error :{ error }</p>}

                <button>Update</button>
            </form>
        </div>
    );
}
 
export default EditMovie;