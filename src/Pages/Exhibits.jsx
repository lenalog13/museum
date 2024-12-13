import { Link, useParams } from 'react-router-dom';
import Exhibit from '../services/Exhibit';
import './List.css';
import './Setting.css';
import './Exhibits.css';
import Header from '../Components/Header';
import { Context } from '..';
import React, { useState, useEffect, useContext, useRef } from 'react';

export default function Exhibits() {
    const { store } = useContext(Context);
    const [descriptions, setDescriptions] = useState([]);
    const [selectedDescription, setSelectedDescription] = useState('');
    const { id } = useParams();
    const idShelf = id;

    function getExhibitionId() {
        const pathname = window.location.pathname;
        const parts = pathname.split('/');
        if (parts.length < 3) {
            return null;
        }
        const exhibitionIdStr = parts[2];
        const exhibitionId = parseInt(exhibitionIdStr, 10);
        if (isNaN(exhibitionId)) {
            return null;
        }
        return exhibitionId;
    }

    const exhibitionId = getExhibitionId();
    const userRights = 'admin';

    const [catalog, setCatalog] = useState({
        title: 'Экспонаты',
        exhibits: []
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [newExhibits, setNewExhibits] = useState({
        id: '',
        exhibitsName: '',
        description: []
    });

    const [editingExhibitsId, setEditingExhibitsId] = useState(null);
    const [selectedTab, setSelectedTab] = useState('id');
    const [filteredExhibits, setFilteredExhibits] = useState([]);
    const [error, setError] = useState(false);
    const dropdownRef = useRef(null);
    const [searchResultsVisible, setSearchResultsVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedExhibitId, setSelectedExhibitId] = useState(null);
    const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
    const [newDescription, setNewDescription] = useState('');


    const fetchExhibitsByShelfId = async () => {
        try {
            const exhibits = await Exhibit.getExhibitsByShelfId(idShelf);
            setCatalog((prevCatalog) => ({
                ...prevCatalog,
                exhibits: exhibits 
            }));
        } catch (error) {
            console.error("Ошибка при получении экспонатов:", error);
        }
    };

    useEffect(() => {
        fetchExhibitsByShelfId();
    }, [idShelf]);

    const handleSearchExhibits = async () => {
        try {
            const results = await Exhibit.getExhibitByName(newExhibits.exhibitsName);
            console.log("Found exhibits:", results.data);
            setSearchResults(results.data);
            setSearchResultsVisible(true);
            setDescriptions([]);
            setSelectedExhibitId(null);
        } catch (error) {
            console.error("Error fetching exhibits:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExhibits({
            ...newExhibits,
            [name]: value
        });
    };

    const resetForm = () => {
        setNewExhibits({ id: '', exhibitsName: '', description: [] });
        setEditingExhibitsId(null);
        setModalVisible(false);
        setError(false);
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

    const handleAddExhibits = async () => {
        try {
            const createdExhibit = await Exhibit.createExhibit(newExhibits.exhibitsName);
            console.log(createdExhibit);
            resetForm();
            setModalVisible(true);
        } catch (error) {
            console.error("Error adding exhibit:", error);
        }
    };

    const handleAddExhibitToShelf = async () => {
        if (selectedExhibitId) {
            try {
                const descriptionId = selectedDescription; 
                const shelfId = idShelf;
                const Id = exhibitionId; 

                const response = await Exhibit.addExhibitToShelf(selectedExhibitId, descriptionId, shelfId, Id);
                console.log('Экспонат добавлен на полку:', response);
                setSearchResultsVisible(false);
                fetchExhibitsByShelfId();
            } catch (error) {
                console.error("Ошибка при добавлении экспоната на полку:", error);
            }
        } else {
            console.log('Выберите экспонат для добавления');
        }
    };

    const fetchExhibitDescriptions = async (exhibitId) => {
        try {
            const descriptions = await Exhibit.getExhibitDescriptions(exhibitId);
            setDescriptions(descriptions);
        } catch (error) {
            console.error("Error fetching exhibit descriptions:", error);
        }
    };

    useEffect(() => {
        if (selectedExhibitId) {
            fetchExhibitDescriptions(selectedExhibitId);
        }
    }, [selectedExhibitId]);

    const handleCreateDescription = async () => {
        try {
            const response = await Exhibit.createExhibitDescription(newDescription, selectedExhibitId);
            console.log("Создано новое описание:", response);
            fetchExhibitDescriptions(selectedExhibitId);
            setNewDescription('');
            setDescriptionModalVisible(false); 
        } catch (error) {
            console.error("Ошибка при создании описания:", error);
        }
    };

    return (
        <div>
            <Header title={catalog.title} />
            {localStorage.getItem('role') && (
                <div className="pages-buttons">
                    <button className="adding-button" onClick={() => setModalVisible(true)}>
                        Добавить экспонат
                    </button>
                   {/* <Link className="discription" to={`/exhibition/${exhibitionId}/room/showcase/shelf/description`}>
                        <button className="adding-button">
                            Редактировать описание полки
                        </button>
                    </Link>*/}
                </div>
            )}
            <div className='classList'>
                <ul>
                    {catalog.exhibits.length > 0 ? (
                        catalog.exhibits.map((item) => (
                            <li key={item.id} className="list-item">
                                Экспонат {item.name}
                                {/*<Link to={`/exhibition/${exhibitionId}/room/showcase/shelf/exhibit/${item.id}`}>
                                    Экспонат {item.name}
                                </Link>*/}
                            </li>
                        ))
                    ) : (
                        <li className="list-item"> Тут пока ничего нет 🙁</li>
                    )}
                </ul>
            </div>

            {modalVisible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{editingExhibitsId !== null ? 'Редактировать экспонат' : 'Добавить новый экспонат'}</h3>
                        {selectedTab === 'id' || selectedTab === 'name' ? (
                           <>
                            <input
                                type="text"
                                name="exhibitsName"
                                placeholder="Введите название экспоната"
                                value={newExhibits.exhibitsName}
                                onChange={handleInputChange}
                            />
                            <button className="cancel-button" onClick={() => setSelectedTab('create')} style={{ marginBottom: '10px' }}>
                                Создать экспонат
                            </button>
                            <div className="modal-buttons">
                                <button className="cancel-button" onClick={() => setModalVisible(false)}>
                                    Назад
                                </button>
                                <button className="save-button" onClick={handleSearchExhibits} disabled={newExhibits.exhibitsName.trim() === ""}>
                                    Поиск
                                </button>
                            </div>
                        </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    name="exhibitsName"
                                    placeholder="Введите название экспоната"
                                    value={newExhibits.exhibitsName}
                                    onChange={handleInputChange}
                                />
                                <div className="modal-buttons">
                                    <button className="cancel-button" onClick={() => setSelectedTab('id')}>
                                        Назад
                                    </button>
                                    <button className="save-button" onClick={handleAddExhibits}>
                                        Создать
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {searchResultsVisible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Результаты поиска</h3>
                        {searchResults.length > 0 ? (
                            <div>
                                <ul className='format'>
                                    {searchResults.map((exhibit, index) => (
                                        <li key={exhibit.id}>
                                            <input
                                                type="radio"
                                                id={`exhibit-${index}`}
                                                name="exhibit"
                                                value={exhibit.id}
                                                onChange={() => {
                                                    setSelectedExhibitId(exhibit.id);
                                                    setDescriptions([]);
                                                }}
                                            />
                                            {exhibit.name}
                                        </li>
                                    ))}
                                </ul>
                                {selectedExhibitId && (
                                    <>
                                        <label htmlFor="description-select">Выберите описание:</label>
                                        <div className="rights-container">
                                            <select
                                                id="description-select"
                                                value={selectedDescription}
                                                onChange={(e) => setSelectedDescription(e.target.value)}
                                            >
                                                <option value="">--Выберите описание--</option>
                                                {descriptions.map((desc) => (
                                                    <option key={desc.id} value={desc.id}>{desc.description}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <button
                                            className="cancel-button"
                                            onClick={() => setDescriptionModalVisible(true)}
                                            style={{ marginBottom: '10px' }}
                                        >
                                            Создать описание
                                        </button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <p>Нет подходящих экспонатов.</p>
                        )}
                        <div className="modal-buttons">
                            <button className="cancel-button" onClick={() => setSearchResultsVisible(false)}>
                                Назад
                            </button>
                            <button className="save-button" onClick={handleAddExhibitToShelf} disabled={!selectedDescription}>
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {descriptionModalVisible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Создать новое описание</h3>
                        <input
                            type="text"
                            placeholder="Введите описание"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                        />
                        <div className="modal-buttons">
                            <button className="cancel-button" onClick={() => setDescriptionModalVisible(false)}>
                                Назад
                            </button>
                            <button className="save-button" onClick={handleCreateDescription}>
                                Создать
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}