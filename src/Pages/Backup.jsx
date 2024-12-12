import Header from '../Components/Header';
import Backup from '../services/Backup';
import React, { useState} from 'react';

export default function Home() {

    const [suc, setSuc] = useState("");
   
    const ClickBackup = async () => {
        try {
            const Response = await Backup.postBackup();
            setSuc(Response.data)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <Header title={"Резервная копия"} />
            <div className="pages-buttons">
                <button className="adding-button" onClick={() => ClickBackup()} > Сделать backup </button>
            </div>
            {suc != ""? <div style={{marginLeft: '20px', marginTop: '10px'}}>Файл {suc} успешно создан</div>: <></>}
        </div>
    );
}