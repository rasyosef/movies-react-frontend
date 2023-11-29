import { useState } from "react";
import { useHistory} from "react-router-dom";
import Cookies from "universal-cookie";

const Login = () => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()
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
            if (res.ok) {
                return res.json()
            }
            throw Error(`Error ${res.status}: an error occured`)
        }).then((data)=>{
            cookies.set('token', data['key'])
            history.push('/')
        }).catch((e)=>(
            console.log(e.message)
        ))
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

                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;