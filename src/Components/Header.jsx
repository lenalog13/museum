import React from 'react';
import './Header.css';

export default function Header() {

    let catalog = [
        {
            id: 0,
            exhibition: 'выставка 1',
            showcases: [ 'витрина 1', 'витрина 2' ]
        },
        {
            id: 1,
            exhibition: 'выставка 2',
            showcases: [ 'витрина 1', 'витрина 2', 'витрина 3' ]
        }
    ];

    // Функция для определения правильного окончания слова "выставка"
    const getExhibitionWord = (count) => {
        if (count % 10 === 1 && count % 100 !== 11) {
            return 'выставка';
        } else if ((count % 10 >= 2 && count % 10 <= 4) && (count % 100 < 10 || count % 100 >= 20)) {
            return 'выставки';
        } else {
            return 'выставок';
        }
    };

    const exhibitionCount = catalog.length;
    const exhibitionWord = getExhibitionWord(exhibitionCount);

    return (
        <nav className="header">
            <div className="header-left">
                Выставки </div>

            <div className="header-right">
                Найдено {exhibitionCount} {exhibitionWord}
            </div>
        </nav>
    );
}
