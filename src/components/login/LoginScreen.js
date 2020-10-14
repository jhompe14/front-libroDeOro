import React from 'react'
import { LoginForm } from './LoginForm'
import './login.css';

export const LoginScreen = () => {
    return (
        <div className="content h-100 animate__animated animate__slideInLeft">
            <LoginForm />
        </div>
    )
}
