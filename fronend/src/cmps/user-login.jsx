
import { useState } from 'react'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../service/user.service.js'
import { signup, login } from '../store/user.action.js'




export function LoginSignup() {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        const funcs = { signup, login }
        const method = isSignupState ? 'signup' : 'login'
        try {
            const user = await funcs[method](credentials)
            console.log('user from login', user);
            // showSuccessMsg(`Welcome ${user.fullname}`)
        } catch (err) {
            // showErrorMsg('OOps try again',)
            console.log(err);
        }

    }

    function onToggleSignupState() {
        setIsSignupState(!isSignupState)
    }

    const { username, password, fullname } = credentials
    return <div className="login-page">

        <form className="login-form" onSubmit={onSubmit}>
            <input
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                onChange={handleCredentialsChange}
                required
                autoFocus
            />

            <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleCredentialsChange}
                required
            />

            {isSignupState && <input
                type="text"
                name="fullname"
                value={fullname}
                placeholder="Full name"
                onChange={handleCredentialsChange}
                required
            />}

            <button>{isSignupState ? 'Signup' : 'Login'}</button>
        </form>

        <div className="btns">
            <button onClick={onToggleSignupState}>
                {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
            </button >
        </div>
    </div >

}


