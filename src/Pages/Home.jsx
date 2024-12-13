import { Link } from 'react-router-dom';
import './List.css';
import './Setting.css';
import Header from '../Components/Header';
import Exhibition from '../services/Exhibition';
import { Context } from '..';
import React, { useState, useEffect, useContext } from 'react';

export default function Home() {
    
    const { store } = useContext(Context);
    const userRights = 'admin';
    const [catalog, setCatalog] = useState({ title: 'Выставки', exhibition: [] });
    const [modalVisible, setModalVisible] = useState(false);
    const [newExhibition, setNewExhibition] = useState({ exhibitionName: '', description: '', startData: '', finishData: '' });
    const [editingExhibitionId, setEditingExhibitionId] = useState(null);
    const [dateError, setDateError] = useState('');
    const [datesEntered, setDatesEntered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState(''); 
    const [serverError, setServerError] = useState(''); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExhibition(prevState => ({ ...prevState, [name]: value }));
        if (name === 'startData' || name === 'finishData') {
            setDatesEntered(true);
        }
    };

    const validateDates = () => {
        const { startData, finishData } = newExhibition;
        if (new Date(startData) > new Date(finishData)) {
            setDateError('Дата окончания должна быть позже даты начала.');
            return false;
        }
        setDateError('');
        return true;
    };

    const handleEditExhibition = async (exhibition) => {
        try {
            const response = await Exhibition.getExhibitionById(exhibition.id);
            setNewExhibition({
                exhibitionName: response.data.name || '',
                description: response.data.description || '',
                startData: response.data.dateFrom || '',
                finishData: response.data.dateTo || ''
            });
            setEditingExhibitionId(response.data.id);
            setModalVisible(true);
        } catch (error) {
            console.error('Error fetching exhibition details:', error);
            setError(error);
        }
    };

    const handleCancel = () => {
        resetForm();
    };

    const handleDeleteExhibition = async (id) => {
        try {
            await Exhibition.deleteExhibition(id);
            fetchExhibition();
            resetForm();
        } catch (error) {
            console.error('Error deleting exhibition:', error);
            setError(error);
        }
    };

    const resetForm = () => {
        setNewExhibition({ exhibitionName: '', description: '', startData: '', finishData: '' });
        setEditingExhibitionId(null);
        setModalVisible(false);
        setDateError('');
        setDatesEntered(false);
        setValidationError(''); 
        setServerError(''); 
    };

    const fetchExhibition = async () => {
        try {
            const response = await Exhibition.getExhibition();
            const exhibitions = response.data.map(exhibition => ({
                id: exhibition.id,
                exhibitionName: exhibition.name,
                description: exhibition.description || '',
                startData: exhibition.startDate,
                finishData: exhibition.endDate
            }));
            setCatalog({ ...catalog, exhibition: exhibitions });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
            setLoading(false);
        }
    };

    const handleCreateExhibition = async () => {
        if (!validateDates()) return;

        const exhibitionData = {
            name: newExhibition.exhibitionName,
            description: newExhibition.description,
            startDate: newExhibition.startData,
            endDate: newExhibition.finishData
        };

        try {
            await Exhibition.createExhibition(exhibitionData);
            fetchExhibition();
            resetForm();
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setValidationError('Календарные даты некорректны. Пожалуйста, проверьте введенные данные.'); 
                } else if (error.response.status === 500) {
                    setServerError('Ошибка сервера. Пожалуйста, введите корректные календарные даты.'); 
                }
            } else {
                console.error('Error creating exhibition:', error);
                setError(error);
            }
        }
    };

    const handleSaveExhibition = async () => {
        if (!validateDates()) return;

        const exhibitionData = {
            id: editingExhibitionId,
            name: newExhibition.exhibitionName,
            description: newExhibition.description,
            startDate: newExhibition.startData,
            endDate: newExhibition.finishData
        };

        try {
            await Exhibition.updateExhibition(exhibitionData);
            fetchExhibition();
            resetForm();
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setValidationError('Календарные даты некорректны. Пожалуйста, проверьте введенные данные.');
                } else if (error.response.status === 500) {
                    setServerError('Ошибка сервера. Пожалуйста, введите корректные календарные даты.');
                }
            } else {
                console.error('Error saving exhibition:', error);
                setError(error);
            }
        }
    };

    useEffect(() => {
        fetchExhibition();
    }, []);
    console.log(localStorage.getItem('role'))

    return (
        <div>
            <Header title={catalog.title} />
            {localStorage.getItem('role') && (
                <div className="pages-buttons">
                    <button className="adding-button" onClick={() => setModalVisible(true)}> Добавить выставку </button>
                </div>
            )}
            <div className='classList'>
                <ul>
                    {catalog.exhibition.length > 0 ? (
                        catalog.exhibition.map((item) => (
                            <li key={item.id} className="list-item">
                                <Link to={`/exhibition/${item.id}`}> {item.exhibitionName} </Link>
                                {localStorage.getItem('role') && (
                                    <button className="setting-button" onClick={() => handleEditExhibition(item)}> Изменить </button>
                                )}
                            </li>
                        ))
                    ) : (
                        <li className="list-item">Тут пока ничего нет 🙁</li>
                    )}
                </ul>
            </div>
            {modalVisible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{editingExhibitionId !== null ? 'Редактировать выставку' : 'Создать выставку'}</h3>
                        <input type="text" name="exhibitionName" placeholder="Название" value={newExhibition.exhibitionName} onChange={handleInputChange} />
                        <label>Дата начала:</label>
                        <input type="date" name="startData" value={newExhibition.startData} onChange={handleInputChange} className={datesEntered && dateError ? 'input-error' : ''} />
                        <label>Дата окончания:</label>
                        <input type="date" name="finishData" value={newExhibition.finishData} onChange={handleInputChange} className={datesEntered && dateError ? 'input-error' : ''} />
                        {dateError && <div className="error-message-data">{dateError}</div>}
                        {validationError && <div className="error-message-data">{validationError}</div>}
                        {serverError && <div className="error-message-data">{serverError}</div>}
                        <div className="modal-buttons">
                            {editingExhibitionId !== null && (
                                <button className="delete-button" onClick={() => handleDeleteExhibition(editingExhibitionId)}> Удалить </button>
                            )}
                            <button className="cancel-button" onClick={handleCancel}>Отменить</button>
                            {editingExhibitionId !== null ? (
                                <button className="save-button" onClick={handleSaveExhibition}> Сохранить </button>
                            ) : (
                                <button className="save-button" onClick={handleCreateExhibition}> Создать</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}