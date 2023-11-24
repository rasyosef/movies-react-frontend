import { useState } from "react";
import { useHistory } from 'react-router-dom'

const AddMovie = () => {
    
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [director, setDirector] = useState('')
    const [writers, setWriters] = useState('')
    const [categories, setCategories] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [created_by, setCreatedBy] = useState(1)

    const [error, setError] = useState(null)
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:8000/api/v1/', {
            method : 'POST',
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
            history.push('/')
        }).catch((err) => {
            console.log(err.message)
            setError(err.message)
        })
    }

    return ( 
        <div className="add-movie">
            <h2>Add New Movie</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
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
                
                {error && <p>{ error }</p>}
                
                <button>Add Movie</button>
            </form>
        </div>
    );
}
 
export default AddMovie;