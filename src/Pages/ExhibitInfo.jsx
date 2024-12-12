import React, { useState } from 'react';
import './List.css';
import './Setting.css';
import './ExhibitInfo.css';
import Header from '../Components/Header'; 


export default function ExhibitInfo() {

    const userRights = 'admin';
    const [modalVisible, setModalVisible] = useState(false);

    const [item, setCatalog] = useState({
        id: '0',
        title: 'Моя кошка',
        description: 'Имя: Тася.\nПорода: шотландская вислоухая.\nВозраст: 3,5 года.\nХарактер: скверный.',
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

            <div className='exhibit-container'>
                <div className='exhibit-description'>
                    <div className='classList'>
                        {formatText(item.description)}
                    </div>
                </div>
            </div>
        </div>
    );
}