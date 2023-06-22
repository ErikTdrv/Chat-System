import React, { useState } from "react";
import './Register.css'

export default function Register() {
    const [userData, setUserData] = useState({username: '', email: '', password: '', repeatPassword: '', profilePicture: ''});
    return (
        <div className="register__container">
            <form className="register__form">
                <h1>Register</h1>
                <div className="username">
                    <label>Username:</label>
                    <input type="text" />
                </div>
                <div className="email">
                    <label>Email:</label>
                    <input type="text" />
                </div>
                <div className="password">
                    <label>Password:</label>
                    <input type="password" />
                </div>
                <div className="re-password">
                    <label>Repeat Password:</label>
                    <input type="password" />
                </div>
                <div className="profile-picture">
                    <label>Add Profile Picture<input type="file"></input></label>
                </div>
                <button>Register</button>
                <span>Already have an account?<span> Login here!</span></span>
            </form>
        </div>
    )
}