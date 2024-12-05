import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';


export default function Home() {
   

    return (
        <div>
            <Header title={"Резервная копия"} />
            <div className="pages-buttons">
                <button className="adding-button" > Сделать backup </button>
            </div>
        </div>
    );
}