import React, { useState, useEffect, useRef } from 'react';
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

    const exhibits = [
        { id: '0', title: 'Моя кошка', description: 'Имя: Тася.\nПорода: шотландская вислоухая.\nВозраст: 3,5 года.\nХарактер: скверный.', file: ExhibitImage },
        { id: '1', title: 'экспонат 2', description: 'описание экспоната 2' },
        { id: '2', title: 'экспонат 3', description: 'описание экспоната 3' },
        { id: '3', title: 'экспонат 4', description: 'описание экспоната 4' }, 
        { id: '4', title: 'экспонат 5' }, 
        { id: '5', title: 'экспонат 6' }, 
        { id: '6', title: 'экспонат 7' }, 
    ];

    const [modalVisible, setModalVisible] = useState(false);

    const [newExhibits, setNewExhibits] = useState(item);

    const [inputValue, setInputValue] = useState('');

    const [filteredExhibits, setFilteredExhibits] = useState([]);

    const [error, setError] = useState(false);

    const dropdownRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExhibits({
            ...newExhibits,
            [name]: value
        });
    };

    const handleSaveExhibits = () => {
        if (error) {
            return;
        }    
        setCatalog(newExhibits);
        resetForm();
    };

    const handleCancel = () => {
        resetForm();
    };

    const resetForm = () => {
        setModalVisible(false);
        setFilteredExhibits([]);
        setInputValue('');
        setError(false);
    };

    const handleInputChangeId = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setNewExhibits(prev => ({ ...prev, id: value }));

        const exhibitExists = exhibits.some(exhibit => exhibit.id === value);
        if (!exhibitExists && value !== '') {
            setError(true);
        } else {
            setError(false);
        }
        
        const filtered = exhibits.filter(exhibit => exhibit.id.includes(value));
        setFilteredExhibits(filtered);
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewExhibits(prev => ({ ...prev, file }));
    };

    const handleRemoveFile = () => {
        setNewExhibits(prev => ({ ...prev, file: null }));
    };

    const handleSelectExhibit = (exhibit) => {
        setInputValue(exhibit.id);
        setNewExhibits({
            id: exhibit.id,
            title: exhibit.title || '',
            description: exhibit.description || '',
            file: exhibit.file || null
        });
        setFilteredExhibits([]);
        setError(false);
      };

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line.trim()}
                <br />
            </span>
        ));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setFilteredExhibits([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div>
            <Header title={item.title} 
                count={null}
            />
            {userRights !== 'user' && (
            <div>
            <div className="pages-buttons">
                <button className="adding-button" onClick={() => setModalVisible(true)}>
                    Редактировать экспонат
                </button> 
                <button className="adding-button">
                    Переместить
                </button> 
                <button className="adding-button">
                    Сформировать qr-код
                </button> 
            </div>
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

            {modalVisible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Редактировать экспонат</h3>

                        <div className="dropdown" ref={dropdownRef}>
                            <input
                                type="text"
                                name="id"
                                placeholder="номер по книге поступления"
                                value={newExhibits.id}
                                onChange={handleInputChangeId}
                                onFocus={() => setFilteredExhibits(exhibits)}
                                className={error ? 'input-error' : ''}
                            />
                            {error && <div className="error-message-id">Нет экспоната с таким номером по книге поступления</div>}
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
                            value={newExhibits.description}
                            onChange={handleInputChange}
                            className="large-textarea" 
                        />
                        {newExhibits.file && (
                            <div className='file-info'>
                                <label>Файл: {newExhibits.file.name}</label>
                                <button className='remove-file-button' onClick={handleRemoveFile}>✖️</button>
                            </div>
                        )}
                        {newExhibits.file ? <label>Прикрепить другой файл:</label> : <label>Прикрепить файл:</label>} 
                        <input
                            type="file"
                            onChange={handleFileChange}
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