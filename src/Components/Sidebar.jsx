import React, { useState } from 'react';
import './Sidebar.css';

export default function Sidebar({ onSelect }) {
    const items = [
        { id: 0, title: 'Стеллажи', racks: [{ id: 0, racksName: 'стеллаж 1' }, { id: 1, racksName: 'стеллаж 2' }, { id: 2, racksName: 'стеллаж 3' }] },
        { id: 1, title: 'Шкафы', racks: [{ id: 0, racksName: 'шкаф 1' }, { id: 1, racksName: 'шкаф 2' }, { id: 2, racksName: 'шкаф 3' }] },
        { id: 2, title: 'Сейфы', racks: [{ id: 0, racksName: 'сейф 1' }, { id: 1, racksName: 'сейф 2' }] }
    ];

    const [selectedId, setSelectedId] = useState(0); // Инициализация с id 0

    const handleClick = (item) => {
        onSelect(item);
        setSelectedId(item.id); // Устанавливаем выбранный id
    };

    return (
        <div className="sidebar">
            <div className="buttons">
                {items.map(item => (
                    <button
                        key={item.id}
                        onClick={() => handleClick(item)}
                        className={selectedId === item.id ? 'sidebar-buttons selected-item' : 'sidebar-buttons'}
                    >
                        {item.title}
                    </button>
                ))}
            </div>
        </div>
    );
}