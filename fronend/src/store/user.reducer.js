import { userService } from "../service/user.service.js"


export const UPDATE_USER_ACTIVITIES = 'UPDATE_USER_ACTIVITIES'
export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const GET_USER = 'GET_USER'
export const UPDATE_USER_PREF = 'UPDATE_USER_PREF'



const initialState = {
    user: userService.getLoggedInUser()
}


export function userReducer(state = initialState, action) {
    let user

    switch (action.type) {

        // USER
        case SET_USER:
            return { ...state, user: action.user }
        case UPDATE_USER_ACTIVITIES:
            user = { ...state.user, activities: action.activities }
            return { ...state, user }

        default:
            return { ...state }
    }
}