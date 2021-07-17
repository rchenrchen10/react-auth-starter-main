import { useState } from "react"
import { useHistory } from "react-router"
import axios from 'axios'
import { useToken } from "../auth/useToken"


export const SignUpPage = () => {
    const [, setToken] = useToken()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const[shouldShowPassword, setShouldShowPassword] = useState(false)
    const history = useHistory();

    const onSignUpClicked = async () => {
        setErrorMessage('')
        if(password !== confirmPassword) {
            setErrorMessage("The password not match")
        } else {
            const response = await axios.post('/api/signup', {
                email,
                password
            });
            const {token} = response.data;
            setToken(token)
            history.push('/')
        }

    }
    return (
        <div className='content-container'>
            <h1>Sign Up</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <input 
                placeholder='someone@gmail.com' 
                value={email}
                onChange={e=>setEmail(e.target.value)} />
            <input
                placeholder='Password'
                type= {shouldShowPassword ? "text":"password"}

                value={password}
                onChange={e=>setPassword(e.target.value)} />
            <input
                placeholder='Confirm Password'
                type= {shouldShowPassword ? "text":"password"}

                value={confirmPassword}
                onChange={e=>setConfirmPassword(e.target.value)} />
            <button onClick={onSignUpClicked}>Sign Up</button>

            <button onClick={ () => {history.push('/login')}}> Already have am account? Log In</button>
            <button onClick={ () => setShouldShowPassword(!shouldShowPassword)} >Show Password</button>

        </div>
    )
}