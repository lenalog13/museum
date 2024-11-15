import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Setting.css'
import Header from '../Components/Header'; 

export default function Rooms() {

  const userRights = 'admin';

  const [catalog, setCatalog] = useState({
    title: 'Помещения',
    rooms: [
      { id: 0, roomsName: 'адрес 1 помещение 1' },
      { id: 1, roomsName: 'адрес 1 помещение  2' },
      { id: 2, roomsName: 'адрес 1 помещение  3' },
      { id: 3, roomsName: 'адрес 2 помещение 1' }
    ]
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [newRooms, setNewRooms] = useState({
    roomsName: '',
  });

  const [editingRoomsId, setEditingRoomsId] = useState(null);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewRooms ({
          ...newRooms,
          [name]: va