import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavbarAbout } from './NavbarAbout';
import { NavbarLogout } from './NavbarLogout';
import { NavbarOptions } from './NavbarOptions';

export const Navbar = () => {
    
    const authReducer= useSelector( state => state)?.authReducer;   

    return (
        <nav className="navbar navbar-expand-lg navbar-dark background_libro_oro">
        {
            !authReducer?.usuario &&
                <>
                    <Link 
                        className="navbar-brand"
                        to="/">Libro de Oro Scouts</Link>
                    <NavbarAbout />
                </>
        }

        {
           authReducer?.usuario &&
                <>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                    &nbsp;&nbsp;
                    <Link 
                        className="navbar-brand"
                        to="/"><b>{authReducer.usuario.toUpperCase()}</b>
                    </Link>
                    <NavbarOptions authReducer = { authReducer }/>
                    <NavbarLogout />
                </>
        }  
        </nav>        
    )
}
