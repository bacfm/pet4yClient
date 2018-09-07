import React from 'react';
import './style.css';

export default function Confirm(){
    return (
        <div className="auth">
            <div className="auth-logo">
            </div>
            <div className='confirm'>
                <h1>Поздравляем, Вы успешно зарегистрировались!</h1>
                <p>Пожалуйста, перейдите на Вашу почту и подтвердите Ваш аккаунт.</p>
            </div>
        </div>
    );
}
