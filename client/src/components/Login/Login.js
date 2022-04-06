import React, { useEffect, useState } from 'react'
import './login.css'
import { Room, Cancel } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { createUsers, loginUsers } from '../../actions/users'
import Loading from 'react-loading'

const Login = ({ setShowRegister, setShowLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    // const { isLoading } = useSelector((state) => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [errUsername, setErrUsername] = useState('')
    const [errPassword, setErrPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrUsername('')
        setErrPassword('')
        if (username.length < 3) {
            setErrUsername('Username must be at least 3 characters')
        }
        if (password.length < 6) {
            setErrPassword('Password must be at least 6 characters')
        }
        if (username.length >= 3 && password.length >= 6) {
            const formData = {
                username,
                password
            }
            dispatch(loginUsers(formData, setIsLoading, setSuccess, setError, setShowLogin, setShowRegister))
        }
    }

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setSuccess('')
    //         setError('')
    //     }, 3000);
    //     return () => clearTimeout(timeout)
    // }, [success, error])

    return (
        <div className='login-container'>
            {success && (
                <div style={{ color: 'green', fontSize: '13px' }}>
                    {success}
                </div>
            )}
            {error && (
                <div style={{ color: 'red', fontSize: '13px' }}>
                    {error}
                </div>
            )}
            <div className="logo">
                <Room />
                Travel Memories
            </div>
            <div className='form'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">Username</label>
                    <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                    {errUsername !== '' && (
                        <label htmlFor="" className='errorLabel'>{errUsername}</label>
                    )}
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {errPassword !== '' && (
                        <label htmlFor="" className='errorLabel'>{errPassword}</label>
                    )}
                    <button className='login-btn' type="submit">
                        {
                            isLoading ? <Loading type='spin' color='#fff' className='loading-container' />
                                : 'Login'
                        }
                    </button>
                    <p className='goto-register'>New to this website? <span onClick={() => {
                        setShowLogin(false)
                        setShowRegister(true)
                    }}>Signup</span></p>
                </form>
            </div>
            <Cancel className='loginCancel' onClick={() => setShowLogin(false)} />
        </div>
    )
}

export default Login