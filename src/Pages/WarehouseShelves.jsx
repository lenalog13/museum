import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Setting.css'
import Header from '../Components/Header'; 

export default function WarehouseShelves() {

  const userRights = 'admin';

  const [catalog, setCatalog] = useState({
    title: 'Полки',
    shelves: [
      { id: 0, shelvesName: 'полка 1' },
      { id: 1, shelvesName: 'полка 2' },
      { id: 2, shelvesName: 'полка 3' }
    ]
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [newShelves, setNewShelves] = useState({
    shelvesName: '',
  });

  const [editingShelvesId, setEditingShelvesId] = useState(null);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewShelves ({
          ...newShelves,
          [name]: value
