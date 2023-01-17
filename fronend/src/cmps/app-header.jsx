import { NavLink, Link, useNavigate } from "react-router-dom"
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { logout } from "../store/user.action";
import { SET_USER } from "../store/user.reducer";
// import { AdminView } from "./admin-view";
import { LoginSignup } from '../cmps/user-login.jsx';

const imgUrl = 'ty-logo.png'

export function AppHeader({ onLogin, isSignedup }) {

    const user = useSelector((storeState) => storeState.userModule.user)
    const dispatch = useDispatch()
    const [isLogin, setIsLogin] = useState(false)
    const [isAdminView, setIsAdminView] = useState(false)

    const navigate = useNavigate()

    function setUser(user) {
        dispatch({ type: SET_USER, user })
    }

    async function onLogout() {
        try {
            await logout()
            setUser(null)
            navigate('/toy')
        } catch (err) {

        }
    }

    return <section className="app-header flex space-between">
        <img className="logo-img" src={(require(`../assets/img/${imgUrl}`))}></img>
        <h1 className="logo">ty - the best toys for nephews</h1>
        <div className="nav-btn">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/toy">Our Products</NavLink>
            <NavLink to="/about">About</NavLink>
        </div>
        {user && <section className="user-info flex align-center justify-between">
            <p className='header-user'>Hello {user.fullname}</p>
            <button onClick={onLogout}>Logout</button>
            {(user && user.isAdmin) && <button onClick={() => setIsAdminView(true)}>Admin Controller</button>}
        </section>}
        {!user && <section className="user-info">
            <button onClick={() => setIsLogin((prevLogin) => !prevLogin)}>Log In</button>
            {isLogin &&
                <section>
                    <LoginSignup />
                    <div onClick={() => setIsLogin(false)} className="black-screen"></div>
                </section>
            }
        </section>}

    </section>
}