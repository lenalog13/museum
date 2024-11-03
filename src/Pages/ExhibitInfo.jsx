import React from 'react';
import './List.css';
import './ExhibitInfo.css';
import Header from '../Components/Header'; 
import ExhibitImage from '../Images/Tasy.jpeg';
import { useLocation } from 'react-router-dom';

export default function ExhibitInfo() {

    const location = useLocation();

    const pathParts = location.pathname.split('/').filter(item => item)

    const getLocation = (word) => {
        if (word == 'warehouse') {
            return 1
        }
    }

    const catalog = {
        title: 'Моя кошка',
        description: 'Имя: Тася. \n Порода: шотландская вислоухая. \n Возраст: 3,5 года. \n Характер: скверный. ',
        photo: ExhibitImage 
    };

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
                    <div className='classList'>
                        {formatText(catalog.description)}
                    </div>
                    {getLocation(pathParts[0]) > 0 && (
                        <div className="classList">
                            Местоположение: на окне
                        </div>
                     )}
                </div>
            </div>
        </div>
    );
}
