import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from "react-router-dom";
import React from 'react';

export const NavbarAbout = () => {

    const history= useHistory();
    const handleAbout = () =>  history.replace("/about");

    return (
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">           

            <ul className="navbar-nav ml-auto">
                <span className="nav-item nav-link text-info"></span>

                <button
                    onClick={ handleAbout } 
                    className="nav-item nav-link btn">
                    ACERCA DE &nbsp; <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>
                </button>
            </ul>
        </div>
    )
}
