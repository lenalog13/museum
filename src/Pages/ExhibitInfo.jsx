import React from 'react';
import { useParams } from 'react-router-dom';
import './Home.css';
import Header from '../Components/Header'; 
import ExhibitImage from '../Images/IMG_1497.jpeg';
import { useLocation } from 'react-router-dom';

export default function ExhibitInfo() {

    const { id } = useParams(); // Получение id из параметров URL 
    const location = useLocation();

    const pathParts = location.pathname.split('/').filter(part => part);

    // Объединяем все части пути в строку, разделенную символом '\'
    const fullLocation = pathParts.join('\ -> ');

    const catalog = {
        title: 'Моя кошка',
        description: 'Имя: Тася. \n Порода: шотландская вислоухая. \n Возраст: 3,5 года. \n Характер: скверный. ',
        photo: ExhibitImage };

    // Функция для преобразования текста 
    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line.trim()}
                <br />
            </span>
        ));
    };

    return (
        <div>
            <Header title={catalog.title} 
                count={null}
            />
            <div className='exhibit-container'>
                <img src={catalog.photo} className='exhibit-photo' alt={catalog.title} />
                <div className='exhibit-description'>
                    <div className='classHome'>
                        {formatText(catalog.description)}
                    </div>
                    <div className='classHome'>
                        Местоположение: {fullLocation}
                    </div>
                </div>
            </div>
        </div>
    );
}
