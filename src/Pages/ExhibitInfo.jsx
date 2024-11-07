import React, { useState } from 'react';
import './List.css';
import './Setting.css';
import './ExhibitInfo.css';
import Header from '../Components/Header'; 
import ExhibitImage from '../Images/Tasy.jpeg';
import { useLocation } from 'react-router-dom';

export default function ExhibitInfo() {

    const userRights = 'admin';

    const location = useLocation();

    const pathParts = location.pathname.split('/').filter(item => item);

    const getLocation = (word) => {
        if (word === 'warehouse') {
            return 1;
        }
        return 0;
    };

    const [item, setCatalog] = useState({
        id: '0',
        title: 'Моя кошка',
        description: 'Имя: Тася. \n Порода: шотландская вислоухая. \n Возраст: 3,5 года. \n Характер: скверный.',
        file: ExhibitImage 
    });

    const exhibits = [{ id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, { id: '7' }, { id: '8' }];

    const [modalVisible, setModalVisible] = useState(false);

    const [newExhibits, setNewExhibits] = useState(item);

    const [inputValue, setInputValue] = useState('');

    const [filteredExhibits, setFilteredExhibits] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExhibits({
            ...newExhibits,
            [name]: value
        });
    };

    const handleSaveExhibits = () => {
        setCatalog(newExhibits);
        resetForm();
    };

    const handleCancel = () => {
        resetForm();
    };

    const resetForm = () => {
        setNewExhibits(item); 
        setModalVisible(false);
        setFilteredExhibits([]);
    };

    const handleInputChangeId = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setNewExhibits(prev => ({ ...prev, id: value }));
        const filtered = exhibits.filter(exhibit => exhibit.id.includes(value));
        setFilteredExhibits(filtered);
    };

    const handleSelectExhibit = (exhibit) => {
        setInputValue(exhibit.id);
        setNewExhibits(prev => ({ ...prev, id: exhibit.id }));
        setFilteredExhibits([]);
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
            <Header title={item.title} 
                count={null}
            />
            {userRights !== 'user' && (
            <div className="pages-buttons">
                <button className="adding-button" onClick={() => setModalVisible(true)}>
                    Редактировать экспонат
                </button> 
                <button className="adding-button">
                    Сформировать qr-код
                </button> 
            </div>
             )}
            <div className='exhibit-container'>
                <img src={item.file} className='exhibit-photo' alt={item.title} />
                <div className='exhibit-description'>
                    <div className='classList'>
                        {formatText(item.description)}
                    </div>
                    {getLocation(pathParts[0]) > 0 && (
                        <div className="classList">
                            Местоположение: на окне
                        </div>
                     )}
                </div>
            </div>

            {modalVisible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Редактировать экспонат</h3>
                        <div className="dropdown">
                            <input
                                type="text"
                                name="id"
                                placeholder="номер по книге поступления"
                                value={newExhibits.id}
                                onChange={handleInputChangeId}
                                onFocus={() => setFilteredExhibits(exhibits)}
                            />
                            {filteredExhibits.length > 0 && (
                                <ul>
                                    {filteredExhibits.map(exhibit => (
                                        <li key={exhibit.id} onClick={() => handleSelectExhibit(exhibit)}>
                                            {exhibit.id}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Название"
                            value={newExhibits.title}
                            onChange={handleInputChange}
                        />
                        <label>Описание:</label>                  
                        <textarea
                            name="description"
                            placeholder="Описание"
                            value={newExhibits.description}
                            onChange={handleInputChange}
                            className="large-textarea" 
                        />
                        <div className="modal-buttons">
                            <button className="cancel-button" onClick={handleCancel}>Отменить</button>
                            <button className="save-button" onClick={handleSaveExhibits}>Сохранить</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}