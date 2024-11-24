import React from 'react';
import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = ({ title }) => {

    const navigate = useNavigate();

    const location = useLocation();

    const pathParts = location.pathname.split('/').filter(item => item)

    const getLocation = (path) => {
        if (((path[0] == 'warehouse') && (path.length)>2) || (path[0] == 'exhibition')) {
            return 1
        }
    }

    return (
    <nav className="header"> 
        <div className="header-left"> 
            {getLocation(pathParts) > 0 && (
                <button class="back-button" onClick={() => navigate(-1)}>Назад</button>
            )}
            <h4 className='header-title'>{title}</h4> 
        </div>  
    </nav>
    );
};

export default Header;

