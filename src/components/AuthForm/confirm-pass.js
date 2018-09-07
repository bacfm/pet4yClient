import React from 'react';
import './style.css';

export default function ConfirmPass(){
    return (
        <div className="auth">
            <div className="auth-logo">
            </div>
            <div className='confirm'>
                <h1>Ваш пароль был успешно сброшен!</h1>
                <p>Пожалуйста, перейдите на Вашу почту и проверьте ваш новый пароль.</p>
            </div>
        </div>
    );
}
