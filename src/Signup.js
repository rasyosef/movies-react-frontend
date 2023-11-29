import { useState } from "react";
import { useHistory} from "react-router-dom";
import Cookies from "universal-cookie";

const Signup = () => {
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const history = useHistory()
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

                <button>Signup</button>
            </form>
        </div>
    );
}

export default Signup;