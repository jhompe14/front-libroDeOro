import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogoutUser } from '../../actions/authAction';

export const NavbarLogout = () => {

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(startLogoutUser());
    };

    return (
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">           

            <ul className="navbar-nav ml-auto">
                <span className="nav-item nav-link text-info"></span>

                <button
                    onClick={ handleLogout } 
                    className="nav-item nav-link btn">
                    Cerrar Sesion
                </button>
            </ul>
        </div>
    )
}
