import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function BreedItem({title, id, onClick, num, onShow, deleteBlock}){
    function onDelete(ev){
        ev.preventDefault();
        onClick(id);
        onShow(ev);
    }
    return (
        <div className="breed-item">
            <p><span>{num+1}</span>{title.split('/')[0]}</p>
            <div className='breed-itm-cntrls'>
            <Link to={`/broods/${id}`}>Добавить помет</Link>
            <button onClick={(ev) => onShow(ev)}>Удалить породу</button>
            </div>
            {deleteBlock ?
            <div className="overlay">
            <div className='accept-del-acc popup'>
            <span className="close-popup" onClick={(ev) => onShow(ev)}></span>
                <h1>ВЫ <b>УВЕРЕНЫ?</b></h1>
                <div className="del-contrls">
                    <button onClick={onDelete}>Удалить</button>
                    <button onClick={(ev) => onShow(ev)}>Отмена</button>
                </div>
            </div>
            </div>
            :
            null
            }
        </div>
    );
}