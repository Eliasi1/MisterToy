import { httpService } from "./http.service"

export const userService = {
    getEmptyCredentials,
    login,
    logOut,
    signup,
    getLoggedInUser,
    saveLocalUser,
    query,
    getById,
    remove,
    update
}

const STORAGE_KEY_LOGGEDIN_USER = 'LoggedInUser'

function query(){
    return httpService.get('user')
}

async function getById(userId){
    return await httpService.get(`user/${userId}`)
}

async function remove(userId){
    return await httpService.delete(`user/${userId}`)
}

async function update(user) {
    // await storageService.put('user', user)
    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    // IMPORTED if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred){
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        // IMPORTED socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function signup(userCred){
    const user = await httpService.post('auth/signup', userCred)
    // IMPORTED socketService.login(user._id)
    return saveLocalUser(user)
}

async function logOut(){
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // IMPORTED sockerService.logOut()
    return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
    console.log(user)
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function getLoggedInUser(){
    return await JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)) 
}

function getEmptyCredentials() { 
return { fullName: '', userName: '', password: '', isAdmin: false }
}