import React from 'react';

export default function DeleteBrood({view, onDel, onCancel, delete_id}){

    return (
    <div className="overlay" >
    <div className='accept-del popup'>
    <span className="close-popup" onClick={onCancel}></span>
          <h1>ВЫ <b>УВЕРЕНЫ?</b></h1>
        <div className="del-contrls">
            <button onClick={(ev) => onDel(delete_id)}>Удалить</button>
            <button onClick={onCancel}>Отмена</button>
        </div>
    </div>
    </div>);
}