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
        fetch('http://localhost:8000/api/v1/dj-rest-auth/login/', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                username,
                password
            })
        }).then((res)=>{
            if (!res.ok && res.status !== 400){ 
                throw Error(`Error ${res.status}: data could not be fetched`)
            }
            return res.json()
        }).then((data)=>{

            if (!('key' in data)){
                const messages = []
                for (let field in data){
                    messages.push(...data[field].map((m)=>(field!=='non_field_errors') ? `${field}: ${m}` : m))
                }
                setError(messages)
            }
            else {
                setError(null)
                const token = data['key']
                cookies.set('token', data['key'])
                fetch('http://localhost:8000/api/v1/dj-rest-auth/user', {
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
                }).then((data)=>{
                    dispatch({type: 'LOGIN', payload: {
                        token,
                        username: data.username,
                        userid: data.pk
                    }})
                    setError(null)
                    navigate('/')
                }).catch((e)=>{
                    setError([e.message])
                    console.log(e.message)
                })
            }
        }).catch((e)=>{
            setError([e.message])
            console.log(e.message)
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
                    error.map((m, ind)=>(
                        <li key={ind}>{m}</li>
                    ))}
                </ul>}

                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;