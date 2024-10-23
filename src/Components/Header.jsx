import React from 'react';
import './Header.css';

const Header = ({ title, count }) => {

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
        // Объект с окончаниями для каждого слова
        const endings = {
            'Стеллажи': ['стеллаж', 'стеллажа', 'стеллажей'], // [единственное, несколько, много]
            'Экспонаты': ['экспонат', 'экспоната', 'экспонатов'],
            'Витрины': ['витрина', 'витрины', 'витрин'],
            'Полки': ['полка', 'полки', 'полок'],
            'Коробки': ['коробка', 'коробки', 'коробок'],
            'Выставки': ['выставка', 'выставки', 'выставок']
        };
    
        const baseForms = endings[baseWord];
    
        // Если слово не найдено в словаре, возвращаем "штуки"
        if (!baseForms) return 'штуки';
    
        // Определяем окончание в зависимости от количества 
        if (count % 10 === 1 && count % 100 !== 11) {
            return baseForms[0]; // единственное число 
            } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
            return baseForms[1]; // несколько 
            } else {
            return baseForms[2]; // много
             }
    };
    


    return (
        <nav className="header">
            <div className="header-left">
                {title}
            </div>

            {/* Условный рендеринг для количества выставок */}
            {count > 0 && (
                <div className="header-right">
                    {getFirstWord(count, title)} {count} {getWordEnding(count,title)}
                </div>
            )}
        </nav>
    );
};

export default Header;

