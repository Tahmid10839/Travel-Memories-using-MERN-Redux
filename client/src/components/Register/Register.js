import React, { useEffect, useState } from 'react'
import './register.css'
import { Room, Cancel } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { createUsers } from '../../actions/users'
import Loading from 'react-loading'

const Register = ({ setShowRegister, setShowLogin }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
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
            const newUser = {
                username,
                email,
                password
            }
            dispatch(createUsers(newUser, setIsLoading, setSuccess, setError))
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
        <div className='register-container'>
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
            <div className="register-logo">
                <Room />
                Travel Memories
            </div>
            <div className='form'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">Username</label>
                    <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} required />
                    {errUsername !== '' && (
                        <label htmlFor="" className='errorLabel'>{errUsername}</label>
                    )}
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
                    {errPassword !== '' && (
                        <label htmlFor="" className='errorLabel'>{errPassword}</label>
                    )}
                    <button className='register-btn' type="submit">
                        {
                            isLoading ? <Loading type='spin' color='#fff' className='loading-container' />
                                : 'SignUp'
                        }
                    </button>
                    <p className='goto-login'>Already have an account? <span onClick={() => {
                        setShowRegister(false)
                        setShowLogin(true)
                    }}>Login</span></p>
                </form>
            </div>
            <Cancel className='registerCancel' onClick={() => setShowRegister(false)} />
        </div>
    )
}

export default Register