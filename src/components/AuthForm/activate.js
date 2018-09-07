import React from 'react';
import './style.css';

function Activate(){
    console.log(window.location.pathname);
    return (
        <div className="auth">
            <div className="auth-logo">
            </div>
            <div className='confirm'>
                <h1>Ваш аккаунт успешно активирован.</h1>
            </div>
        </div>
    );
}

export default Activate;
