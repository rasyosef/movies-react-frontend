import axios from 'axios';
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import { useAuthContext } from "./useAuthContext";

const Login = () => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const navigate = useNavigate()
    const cookies = new Cookies()

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post('https://movies-django-backend.vercel.app/api/v1/dj-rest-auth/login/', 
            JSON.stringify({ 
                username, password 
            }), {
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(({ data })=>{
            setError(null)
            const token = data['key']
            cookies.set('token', data['key'])

            axios.get('https://movies-django-backend.vercel.app/api/v1/dj-rest-auth/user/', {
                headers : {
                    'Content-Type' : 'application/json', 
                    Authorization : `Token ${token}`
                }
            }).then(({ data })=>{
                dispatch({
                    type: 'LOGIN', 
                    payload: { token, username: data.username, userid: data.pk }
                })
                setError(null)
                navigate('/')
            }).catch((err)=>{
                setError([err.message])
                console.log(err.message)
            })
        }).catch((err)=>{
            if (err.response.status === 400){
                const data = err.response.data
                const messages = []
                for (let field in data){
                    messages.push(...data[field].map((m)=>(field!=='non_field_errors') ? `${field}: ${m}` : m))
                }
                setError(messages)
            } else {
                setError([err.message])
                console.log(err.message)
            }
        })
    }

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={(e) => handleLogin(e)}>
                <label>Username</label>
                <input type="text" 
                    value={username} 
                    onChange={(e)=>setUsername(e.target.value)} />

                <label>Password</label>
                <input type="password"
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} />

                {error && <ul>{ 
                    error.map((m, ind) => (<li key={ind}>{m}</li>))
                }</ul>}

                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;