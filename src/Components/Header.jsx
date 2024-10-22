import React from 'react';
import './Header.css';

const Header = ({ catalog }) => {

    // Проверка на наличие catalog и exhibition
    const exhibitionCount = catalog.exhibition.length;

    const getWord = (title) => {
        if (title == 'Выставки') {
            return getExhibitionWord(exhibitionCount)
        } else if (title == 'Экспонаты') {
            return getExhibitWord(exhibitionCount)
        } else if (title == 'Стеллажи') {
            return getRackWord(exhibitionCount)
        } else if (title == 'Полки') {
            return getShelfWord(exhibitionCount)
        } else if (title == 'Коробки') {
            return getBoxWord(exhibitionCount)
        } else if (title == 'Витрины') {
            return getShowcaseWord(exhibitionCount)
        }
    }

    // Функции для определения правильного окончания слова

    const getExhibitionWord = (count) => {
        if (count % 10 === 1 && count % 100 !== 11) {
            return 'выставка';
        } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 10 || count % 100 >= 20)) {
            return 'выставки';
        } else {
            return 'выставок';
        }
    };

    const getExhibitWord = (count) => {
        if (count % 10 === 1 && count % 100 !== 11) {
            return 'экспонат';
        } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 10 || count % 100 >= 20)) {
            return 'экспоната';
        } else {
            return 'экспонатов';
        }
    };

    const getRackWord = (count) => {
        if (count % 10 === 1 && count % 100 !== 11) {
            return 'стеллаж';
        } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 10 || count % 100 >= 20)) {
            return 'стеллажа';
        } else {
            return 'стеллажей';
        }
    };

    const getShelfWord = (count) => {
        if (count % 10 === 1 && count % 100 !== 11) {
            return 'полка';
        } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 10 || count % 100 >= 20)) {
            return 'полки';
        } else {
            return 'полок';
        }
    };
    
    const getBoxWord = (count) => {
        if (count % 10 === 1 && count % 100 !== 11) {
            return 'коробка';
        } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 10 || count % 100 >= 20)) {
            return 'коробки';
        } else {
            return 'коробок';
        }
    };
    
    const getShowcaseWord = (count) => {
        if (count % 10 === 1 && count % 100 !== 11) {
            return 'витрина';
        } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 10 || count % 100 >= 20)) {
            return 'витрины';
        } else {
            return 'витрин';
        }
    };
    

    return (
        <nav className="header">
            <div className="header-left">
                {catalog.title}
            </div>

            {/* Условный рендеринг для количества выставок */}
            {exhibitionCount > 1 && (
                <div className="header-right">
                    Найдено {exhibitionCount} {getWord(catalog.title)}
                </div>
            )}
        </nav>
    );
};

export default Header;


