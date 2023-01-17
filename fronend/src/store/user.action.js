import { userService } from '../service/user.service.js'
import { SET_USER } from './user.reducer'
import { store } from './store.js'


export async function login(credentials) {

    try {
        const user = await userService.login(credentials)
        console.log('user', user)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Cannot login:', err)
        throw err

    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Cannot signup:', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logOut()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.error('Cannot logout:', err)
        throw err

    }
}


export async function updateUser(userDetails) {
    try {
        const updatedUser = await userService.update(userDetails)
        console.log('newUser', updatedUser);
        store.dispatch({ type: SET_USER, user: updatedUser })
        return updatedUser
    } catch (err) {
        console.error('Cannot checkout:', err)
        throw err
    }
}





