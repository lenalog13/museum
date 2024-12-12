import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Exhibit from '../services/Exhibit';
import './List.css';
import './Setting.css';
import './Exhibits.css';
import Header from '../Components/Header';

export default function Exhibits() {
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
        exhibits: [
            { id: '0', exhibitsName: 'экспонат 1' },
            { id: '1', exhibitsName: 'экспонат 2' },
            { id: '2', exhibitsName: 'экспонат 3' }
        ]
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

    const handleSearchExhibits = async () => {
      try {
          const results = await Exhibit.getExhibitByName(newExhibits.exhibitsName);
          console.log("Found exhibits:", results.data); // Log the fetched exhibits to the console
          setSearchResults(results.data); // Set the search results from the API response
          setSearchResultsVisible(true); // Show the search results modal
      } catch (error) {
          console.error("Error fetching exhibits:", error);
          // Optionally, set an error state to show a message to the user
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
            // Create new exhibit using the Exhibit class
            const createdExhibit = await Exhibit.createExhibit(newExhibits.exhibitsName);
            console.log(createdExhibit);

            // Reset the form and open the modal for adding a new exhibit
            resetForm();
            setModalVisible(true); // Open the modal again for adding another exhibit
        } catch (error) {
            console.error("Error adding exhibit:", error);
            // Optionally, set an error state to show a message to the user
        }
    };

    return (
        <div>
            <Header title={catalog.title} />
            {userRights !== 'user' && (
                <div className="pages-buttons">
                    <button className="adding-button" onClick={() => setModalVisible(true)}>
                        Добавить экспонат
                    </button>
                    <Link className="discription" to={`/exhibition/${exhibitionId}/room/showcase/shelf/description`}>
                        <button className="adding-button">
                            Редактировать описание полки
                        </button>
                    </Link>
                </div>
            )}
            <div className='classList'>
                <ul>
                    {catalog.exhibits.length > 0 ? (
                        catalog.exhibits.map((item) => (
                            <li key={item.id} className="list-item">
                                <Link to={`/exhibition/${exhibitionId}/room/showcase/shelf/exhibit/${item.id}`}>
                                    {item.exhibitsName}
                                </Link>

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
                                <div className="modal-buttons">
                                    <button className="cancel-button" onClick={() => setModalVisible(false)}>
                                        Назад
                                    </button>
                                    <button className="save-button" onClick={handleSearchExhibits}>
                                        Поиск
                                    </button>
                                </div>
                                <button className="cancel-button" onClick={() => setSelectedTab('create')}>
                                    Создать экспонат
                                </button>
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
                                  />
                                  {exhibit.name}
                                </li>
                              ))}
                              </ul>
                            </div>
                            
                        ) : (
                            <p>Нет подходящих экспонатов.</p>
                        )}
                        <div className="modal-buttons">
                            <button className="cancel-button" onClick={() => setSearchResultsVisible(false)}>
                                Назад
                            </button>
                            <button className="save-button" onClick={() => console.log('Добавить выбранный экспонат')}>
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


