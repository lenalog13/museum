import React, { useState } from 'react';
import './List.css';
import './Setting.css';
import './ExhibitInfo.css';
import Header from '../Components/Header'; 
import ExhibitImage from '../Images/Tasy.jpeg';

export default function ExhibitInfo() {

    const userRights = 'admin';

    const [item, setCatalog] = useState({
        id: '0',
        title: 'Моя кошка',
        description: 'Имя: Тася.\nПорода: шотландская вислоухая.\nВозраст: 3,5 года.\nХарактер: скверный.',
        file: ExhibitImage 
    });

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
            <Header title={item.title} />
            {userRights !== 'user' && (
            <div>
            </div>
             )}
            <div className='exhibit-container'>
                {item.file !== null && (
                    <img src={item.file} className='exhibit-photo' alt={item.title} />
                )}
                <div className='exhibit-description'>
                    <div className='classList'>
                        {formatText(item.description)}
                    </div>
                </div>
            </div>
        </div>
    );
}