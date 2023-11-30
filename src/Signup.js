import { useState } from "react";
import { useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import { useAuthContext } from "./useAuthContext";

const Signup = () => {
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const [error, setError] = useState(null)

    const { dispatch } = useAuthContext()

    const navigate = useNavigate()
    const cookies = new Cookies()

    const handleLogin = (e) => {
        e.preventDefault()
        fetch('http://localhost:8000/api/v1/dj-rest-auth/registration/', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                username,
                email,
                password1,
                password2
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
        <div className="signup">
            <h2>Signup</h2>
            <form onSubmit={(e) => handleLogin(e)}>
                <label>Username</label>
                <input type="text" 
                    value={username} 
                    onChange={(e)=>setUsername(e.target.value)} />

                <label>Email</label>
                <input type="email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} />

                <label>Password</label>
                <input type="password"
                    value={password1} 
                    onChange={(e)=>setPassword1(e.target.value)} />

                <label>Password Again</label>
                <input type="password"
                    value={password2} 
                    onChange={(e)=>setPassword2(e.target.value)} />
                
                {error && <ul>{ error.map((m, ind)=>(
                    <li key={ind}>{m}</li>
                )) }</ul>}
                
                <button>Signup</button>
            </form>
        </div>
    );
}

export default Signup;