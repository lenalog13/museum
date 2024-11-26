import React, { useState } from 'react';
import './Qr.css';
import Header from '../Components/Header'; 

export default function Qr() {

  const userRights = 'admin';

  const catalog = {
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

  const [expanded, setExpanded] = useState({});

  const toggle = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderExhibitsInRooms = (exhibits) => {
    return exhibits.map(exhibit => (
      <div className="toggle" key={exhibit.id} style={{ paddingLeft: '60px' }}>
        <span style={{ paddingRight: '10px' }}>
           {''}
         </span>
         <span style={{ paddingLeft: '20px' }}>
         {exhibit.exhibitsName}
         </span>
      </div>
    ));
  };

  const renderExhibitsInShelves = (exhibits) => {
    return exhibits.map(exhibit => (
      <div className="toggle" key={exhibit.id} style={{ paddingLeft: '100px' }}>
        <span style={{ paddingRight: '10px' }}>
           {''}
         </span>
         <span style={{ paddingLeft: '20px' }}>
         {exhibit.exhibitsName}
         </span>
      </div>
    ));
  };

  const renderShelves = (shelves) => {
    return shelves.map(shelf => (
      <div className="toggle" key={shelf.id}>
        <div onClick={() => toggle(`shelf-${shelf.id}`)} className="toggle" style={{ paddingLeft: '80px' }}>
         <span style={{ paddingRight: '10px' }}>
            {shelf.exhibits ? 
             (expanded[`shelf-${shelf.id}`] ? '➖' : '➕') : ''}
         </span>
         <span style={{ paddingLeft: shelf.exhibits ? '0' : '20px' }}>
            {shelf.shelvesName}
         </span>
        </div>
        {expanded[`shelf-${shelf.id}`] && shelf.exhibits && renderExhibitsInShelves(shelf.exhibits)}
       </div>
    ));
  };

  const renderShowcases = (showcases) => {
    return showcases.map(showcase => (
      <div className="toggle" key={showcase.id}>
        <div onClick={() => toggle(`showcase-${showcase.id}`)} className="toggle" style={{ paddingLeft: '60px' }}>
         <span style={{ paddingRight: '10px' }}>
           {showcase.shelves ? 
             (expanded[`showcase-${showcase.id}`] ? '➖' : '➕') : ''}
         </span>
         <span style={{ paddingLeft: showcase.shelves ? '0' : '20px' }}>
          {showcase.showcasesName}
         </span>
        </div>
        {expanded[`showcase-${showcase.id}`] && showcase.shelves && renderShelves(showcase.shelves)}
      </div>
    ));
  };

  const renderRooms = (rooms) => {
    return rooms.map(room => (
      <div className="toggle" key={room.id}>
        <div onClick={() => toggle(`room-${room.id}`)} className="toggle" style={{ paddingLeft: '40px' }}>
          <span style={{ paddingRight: '10px' }}>
            {room.showcases || room.exhibits ? 
              (expanded[`room-${room.id}`] ? '➖' : '➕') : ''}
          </span>
          <span style={{ paddingLeft: room.showcases || room.exhibits ? '0' : '20px' }}>
            {room.roomsName}
          </span>
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
            <div onClick={() => toggle(`exhibition-${exhibition.id}`)} className="toggle" style={{ paddingLeft: '20px' }}>
              <span style={{ paddingRight: '10px' }}>
                {exhibition.rooms  ? 
                  (expanded[`exhibition-${exhibition.id}`] ? '➖' : '➕') : ''}
              </span>
              <span style={{ paddingLeft: exhibition.rooms ? '0' : '20px' }}>
                {exhibition.exhibitionName}
              </span>
            </div>
            {expanded[`exhibition-${exhibition.id}`] && exhibition.rooms && renderRooms(exhibition.rooms)}
          </div>
        ))}
      </div>
    </div>
  );
}

