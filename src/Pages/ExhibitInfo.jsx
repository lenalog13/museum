import React from 'react';
import { useParams } from 'react-router-dom';
import './Home.css';
import Header from '../Components/Header'; 
import ExhibitImage from '../Images/IMG_1497.jpeg';

export default function Exhibits() {
    const { id } = useParams(); // Получение id из параметров URL 
    const catalog = {
        title: 'Моя кошка',
        description: 'Имя: Тася. \n Порода: шотландская вислоухая. \n Возраст: 3,5 года. \n Характер: скверный. ',
        photo: ExhibitImage 
    };

    // Функция для преобразования текста 
    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {'\u00A0\u00A0\u00A0\u00A0'} {/* 4 пробела */}
                {line.trim()}
                <br />
            </span>
        ));
    };

    return (
        <div>
            <Header title={catalog.title} 
                count= {(catalog.exhibits == 0)? 0 : catalog.exhibits? catalog.exhibits.length : null}
                />
            <div className='exhibit-container'>
                <img src={catalog.photo} className='exhibit-photo' />
                <div className='exhibit-description'>
                <div className='classHome'>
                    {formatText(catalog.description)}
                </div>
                </div>
            </div>
        </div>
    );
}
