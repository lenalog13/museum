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
            { id: 3, exhibitsName: 'экспонат 4', select: false  },
            { id: 4, exhibitsName: 'экспонат 5', select: false  },
            { id: 5, exhibitsName: 'экспонат 6', select: false  }
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

  const handleSelectChange = (item, parentType) => {
    const updatedCatalog = { ...catalog };
  
    if (parentType === 'exhibition') {
      const exhibition = updatedCatalog.exhibition.find(exh => exh.id === item.id);
      if (exhibition) {
        exhibition.select = !exhibition.select;
      }
    } else if (parentType === 'room') {
      updatedCatalog.exhibition.forEach(exhibition => {
        const room = exhibition.rooms && exhibition.rooms.find(r => r.id === item.id);
        if (room) {
          room.select = !room.select;
        }
      });
    } else if (parentType === 'showcase') {
      updatedCatalog.exhibition.forEach(exhibition => {
        exhibition.rooms && exhibition.rooms.forEach(room => {
          const showcase = room.showcases && room.showcases.find(s => s.id === item.id);
          if (showcase) {
            showcase.select = !showcase.select;
          }
        });
      });
    } else if (parentType === 'shelf') {
      updatedCatalog.exhibition.forEach(exhibition => {
        exhibition.rooms && exhibition.rooms.forEach(room => {
          room.showcases && room.showcases.forEach(showcase => {
            const shelf = showcase.shelves && showcase.shelves.find(s => s.id === item.id);
            if (shelf) {
              shelf.select = !shelf.select;
            }
          });
        });
      });
    } else if (parentType === 'exhibit') {
      let exhibitFound = false;
  
      // Check in rooms
      updatedCatalog.exhibition.forEach(exhibition => {
        exhibition.rooms && exhibition.rooms.forEach(room => {
          const exhibit = room.exhibits && room.exhibits.find(e => e.id === item.id);
          if (exhibit) {
            exhibit.select = !exhibit.select;
            exhibitFound = true;
          }
        });
      });
  
      // Check in shelves
      if (!exhibitFound) {
        updatedCatalog.exhibition.forEach(exhibition => {
          exhibition.rooms && exhibition.rooms.forEach(room => {
            room.showcases && room.showcases.forEach(showcase => {
              showcase.shelves && showcase.shelves.forEach(shelf => {
                const exhibit = shelf.exhibits && shelf.exhibits.find(e => e.id === item.id);
                if (exhibit) {
                  exhibit.select = !exhibit.select;
                }
              });
            });
          });
        });
      }
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
          onChange={() => handleSelectChange(exhibit, 'exhibit')}
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
          onChange={() => handleSelectChange(exhibit, 'exhibit')}
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
            onChange={() => handleSelectChange(shelf, 'shelf')}
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
            onChange={() => handleSelectChange(showcase, 'showcase')}
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
            onChange={() => handleSelectChange(room, 'room')}
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
                onChange={() => handleSelectChange(exhibition, 'exhibition')}
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

