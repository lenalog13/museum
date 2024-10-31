import React from 'react';
import './Header.css';
import { useLocation } from 'react-router-dom';

const Header = ({ title, count }) => {

    const location = useLocation();

    const pathParts = location.pathname.split('/')

    const getLink = (links) => {
        const newLink = links .slice(0, -1) .join('/');
        return links.length > 3 ? newLink : '/';
    }

    const getFirstWord = (count, title) => {
        const isPlural = count > 1;
        const singularForm = {
            'Выставки': 'Найдена',
            'Экспонаты': 'Найден',
            'Стеллажи': 'Найден',
            'Полки': 'Найдена',
            'Коробки': 'Найдена',
            'Витрины': 'Найдена'
        };
        return isPlural ? 'Найдено' : singularForm[title] || 'Найдено';
    };

    const getWordEnding = (count, baseWord) => {
        const endings = {
            'Стеллажи': ['стеллаж', 'стеллажа', 'стеллажей'],
            'Экспонаты': ['экспонат', 'экспоната', 'экспонатов'],
            'Витрины': ['витрина', 'витрины', 'витрин'],
            'Полки': ['полка', 'полки', 'полок'],
            'Коробки': ['коробка', 'коробки', 'коробок'],
            'Выставки': ['выставка', 'выставки', 'выставок']
        };
    
        const baseForms = endings[baseWord];
    
        if (!baseForms) return 'штуки';
    
        if (count % 10 === 1 && count % 100 !== 11) {
            return baseForms[0];
            } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
            return baseForms[1];
            } else {
            return baseForms[2];
             }
    };
    


    return (
    <nav className="header"> 
        <div className="header-left"> 
            <div>{title}</div> 
            {location !== '/' ? ( 
                <a href={getLink(pathParts)}>Назад</a> ) 
                : null}
        </div>  

        {count > 0 && ( 
        <div className="header-right"> 
            {getFirstWord(count, title)} {count} {getWordEnding(count, title)} 
        </div> 
        )}  
            
    </nav>
    );
};

export default Header;

