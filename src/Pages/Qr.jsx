import React, { useState } from 'react';
import './Qr.css';
import Header from '../Components/Header'; 

export default function Qr() {

  const userRights = 'admin';

  const initialCatalog = {
    exhibition: [
      { id: 0, exhibitionName: 'выставка 1', select: false },
      { id: 1, exhibitionName: 'выставка 2', select: false  },
      { id: 2, exhibitionName: 'выставка 3', select: false , rooms: [
        { id: 0, roomsName: 'помещение 1', select: false  },
        { id: 1, roomsName: 'помещение  2', select: false  },
        { id: 2, roomsName: 'помещение  3', select: false , showcases: [
            { id: 0, showcasesName: 'витрина 1', select: false  },
            { id: 1, showcasesName: 'витрина 2', select: false  },
            { id: 2, showcasesName: 'витрина 3', select: false,  shelves: [
                { id: 0, shelvesName: 'полка 1', select: false  },
                { id: 1, shelvesName: 'полка 2', select: false  },
                { id: 2, shelvesName: 'полка 3', select: false , exhibits: [
                    { id: 0, exhibitsName: 'экспонат 1', select: false  },
                    { id: 1, exhibitsName: 'экспонат 2', select: false  },
                    { id: 2, exhibitsName: 'экспонат 3', select: false  }
                ]} 
            ]}
          ],
          exhibits: [
            { id: 0, exhibitsName: 'экспонат 1', select: false  },
            { id: 1, exhibitsName: 'экспонат 2', select: false  },
            { id: 2, exhibitsName: 'экспонат 3', select: false  }
          ]
         }
      ]},
    ]
  };

  const [catalog, setCatalog] = useState(initialCatalog);

  const [expanded, setExpanded] = useState({});

  const toggle = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelectChange = (item) => {
    const updatedCatalog = { ...catalog };
    const exhibition = updatedCatalog.exhibition.find(exh => exh.id === item.id);
    if (exhibition) {
        exhibition.select = !exhibition.select;
    }
    setCatalog(updatedCatalog);
  };

  const renderExhibitsInRooms = (exhibits) => {
    return exhibits.map(exhibit => (
      <div className="toggle" key={exhibit.id} style={{ paddingLeft: '100px' }}>
        <div className='line'>
        <span style={{ paddingRight: '20px' }}>
           {''}
         </span>
         <input
          type="checkbox"
          checked={exhibit.select}
          onChange={() => handleSelectChange(exhibit)}
        />
         <div>
         {exhibit.exhibitsName}
         </div>
         </div>
      </div>
    ));
  };

  const renderExhibitsInShelves = (exhibits) => {
    return exhibits.map(exhibit => (
      <div className="toggle" key={exhibit.id} style={{ paddingLeft: '180px' }}>
        <div className='line'>
        <span style={{ paddingRight: '20px' }}>
           {''}
         </span>
         <input
          type="checkbox"
          checked={exhibit.select}
          onChange={() => handleSelectChange(exhibit)}
          style={{ marginRight: '10px' }}
         />
         <div>
         {exhibit.exhibitsName}
         </div>
         </div>
      </div>
    ));
  };

  const renderShelves = (shelves) => {
    return shelves.map(shelf => (
      <div className="toggle" key={shelf.id}>
        <div className="toggle" style={{ paddingLeft: '140px' }}>
        <div className='line'>
         <span onClick={() => toggle(`shelf-${shelf.id}`)} style={{ paddingRight: shelf.exhibits ? '0' : '20px' }}>
            {shelf.exhibits ? 
             (expanded[`shelf-${shelf.id}`] ? '➖' : '➕') : ''}
         </span>
         <input
            type="checkbox"
            checked={shelf.select}
            onChange={() => handleSelectChange(shelf)}
          />
         <div>
            {shelf.shelvesName}
         </div>
         </div>
        </div>
        {expanded[`shelf-${shelf.id}`] && shelf.exhibits && renderExhibitsInShelves(shelf.exhibits)}
       </div>
    ));
  };

  const renderShowcases = (showcases) => {
    return showcases.map(showcase => (
      <div className="toggle" key={showcase.id}>
        <div className="toggle" style={{ paddingLeft: '100px' }}>
        <div className='line'>
         <span onClick={() => toggle(`showcase-${showcase.id}`)} style={{ paddingRight: showcase.shelves ? '0' : '20px' }}>
           {showcase.shelves ? 
             (expanded[`showcase-${showcase.id}`] ? '➖' : '➕') : ''}
         </span>
         <input
            type="checkbox"
            checked={showcase.select}
            onChange={() => handleSelectChange(showcase)}
          />
         <div>
          {showcase.showcasesName}
         </div>
         </div>
        </div>
        {expanded[`showcase-${showcase.id}`] && showcase.shelves && renderShelves(showcase.shelves)}
      </div>
    ));
  };

  const renderRooms = (rooms) => {
    return rooms.map(room => (
      <div className="toggle" key={room.id}>
        <div className="toggle" style={{ paddingLeft: '60px' }}>
        <div className='line'>
          <span onClick={() => toggle(`room-${room.id}`)} style={{ paddingRight: room.showcases || room.exhibits ? '0' : '20px' }}>
            {room.showcases || room.exhibits ? 
              (expanded[`room-${room.id}`] ? '➖' : '➕') : ''}
          </span>
          <input
            type="checkbox"
            checked={room.select}
            onChange={() => handleSelectChange(room)}
          />
          <div>
            {room.roomsName}
          </div>
        </div>
        </div>
        {expanded[`room-${room.id}`] && room.exhibits && renderExhibitsInRooms(room.exhibits)}
        {expanded[`room-${room.id}`] && room.showcases && renderShowcases(room.showcases)}
      </div>
    ));
  };

  return (
    <div>
      <Header title='Выберите элементы для формирования QR-кодов:'/>
      <div className='classList'>
        {catalog.exhibition.map(exhibition => (
          <div className="toggle" key={exhibition.id}>
            <div className='toggle' style={{ paddingLeft: '20px' }}>
            <div className='line'>
              <span onClick={() => toggle(`exhibition-${exhibition.id}`)} style={{ paddingRight: exhibition.rooms ? '0px' : '20px' }}>
                {exhibition.rooms  ? 
                  (expanded[`exhibition-${exhibition.id}`] ? '➖' : '➕') : ''}
              </span>
              <input
                type="checkbox"
                checked={exhibition.select}
                onChange={() => handleSelectChange(exhibition)}
              />
              <div>
                {exhibition.exhibitionName}
              </div>
            </div>
            </div>
            {expanded[`exhibition-${exhibition.id}`] && exhibition.rooms && renderRooms(exhibition.rooms)}
          </div>
        ))}
      </div>
    </div>
  );
}

