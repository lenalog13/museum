import React from 'react';
import './Header.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = ({ title, count }) => {

    const navigate = useNavigate();

    const location = useLocation();

    const pathParts = location.pathname.split('/').filter(item => item)

    const getLocation = (path) => {
        if (((path[0] == 'warehouse') && (path.length)>2) || (path[0] == 'exhibition')) {
            return 1
        }
    }

    const getFirstWord = (count, title) => {
        const isPlural = count > 1;
        const singularForm = {
            'Выставки': 'Найдена',
            'Экспонаты': 'Найден',
            'Стеллажи': 'Найден',
            'Полки': 'Найдена',
            'Коробки': 'Найдена',
            'Витрины': 'Найдена',
            'Помещения': 'Найдено',
            'Шкафы': 'Найден',
            'Сейфы': 'Найден'
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
            'Выставки': ['выставка', 'выставки', 'выставок'],
            'Помещения': ['помещение', 'помещения', 'помещений'],
            'Шкафы': ['шкаф', 'шкафа', 'шкафов'],
            'Сейфы': ['сейф', 'сейфа', 'сейфов']
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
            {getLocation(pathParts) > 0 && (
                <button class="back-button" onClick={() => navigate(-1)}>Назад</button>
            )}
            <h4 className='header-title'>{title}</h4> 
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

