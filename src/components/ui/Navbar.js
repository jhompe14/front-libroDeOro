import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavbarLogout } from './NavbarLogout';
import { NavbarOptions } from './NavbarOptions';

export const Navbar = () => {
    
    const authReducer= useSelector( state => state)?.authReducer;   

    return (
        <nav className="navbar navbar-expand-lg navbar-dark background_libro_oro">
            <Link 
                className="navbar-brand" 
                to="/">Libro de Oro Scouts</Link>
        {
           authReducer?.usuario &&
                <NavbarOptions authReducer = { authReducer }/>
        }                  
            
        {
            authReducer?.usuario &&
                <NavbarLogout />            
        }

        </nav>        
    )
}
