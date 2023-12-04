import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import Cookies from "universal-cookie";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': return { 
            token: action.payload.token, 
            username: action.payload.username, 
            userid: action.payload.userid 
        }
        case 'LOGOUT': return { 
            token: undefined, 
            username: '', 
            userid: ''
        }
        default: return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const cookies = new Cookies()

    const [state, dispatch] = useReducer(authReducer, {
        userid: '',
        username: '',
        token: cookies.get('token'),
    })

    useEffect(()=>{
        const cookies = new Cookies()
        const token = cookies.get('token')
        if (token){
            axios.get('http://localhost:8000/api/v1/dj-rest-auth/user/', {
                headers : { 
                    'Content-Type' : 'application/json', 
                    Authorization : `Token ${token}` 
                }
            }).then(({ data })=>{
                dispatch({
                    type: 'LOGIN', 
                    payload: { token, username: data.username, userid: data.pk}
                })
            }).catch((e)=>(
                console.log(e.message)
            ))
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}