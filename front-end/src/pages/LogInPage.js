import { useState } from "react"
import { useHistory } from "react-router"
import axios from 'axios'
import { useToken } from "../auth/useToken"



export const LogInPage = () => {
    //const [token, setToken] = useToken();
    const [, setToken] = useToken();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const[shouldShowPassword, setShouldShowPassword] = useState(false)
    const history = useHistory();

    const onLoginClicked = async () => {
        const response = await axios.post('/api/login', {
            email,
            password
        });
        const {token} = response;
        setToken(token)
        history.push('/')   
    }
    return (
        <div className='content-container'>
            <h1>Log In</h1>
            <input 
                placeholder='someone@gmail.com' 
                value={email}
                onChange={e=>setEmail(e.target.value)} />
            <input
                placeholder='Password'
                type= {shouldShowPassword ? "text":"password"}

                value={password}
                onChange={e=>setPassword(e.target.value)} />

            <button onClick={onLoginClicked}>Log In</button>
            <button onClick={ () => history.push('/forget-password') }>Forget password</button>
            <button onClick={ () => {history.push('/signup')}}> Do not have account? Sign up</button>
            <button onClick={ () => setShouldShowPassword(!shouldShowPassword)} >Show Password</button>

        </div>
    )
}