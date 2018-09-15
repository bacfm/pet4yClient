import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

export default function ResetPasswordForm(){
    let email;
    const onClick = () => {
        const body = {email: email.value}
        return fetch("http://api.pet4u.com.ua/api/v1/account/recovery",{
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            if(res.status === 200){
                window.location.pathname = '/confirm-password'
            }
        })
    }
    return (
        <div className="auth">
            <div className="auth-logo"></div>
            <h2 style={{margin: '0', fontSize: '20px'}}>Восстановление пароля</h2>
            <h3 style={{fontWeight: '300', fontSize: '20px', marginBottom: '30px', textAlign: 'center'}}>Пожалуйста, введите свой e-mail для восстановления пароля.</h3>
                <div className="auth-field">
                <label>E-mail</label>
                <input type="text" ref={(input) => email = input}/>
                </div>
            <div className="auth-btns">
                <Link to="/login"><button>Назад</button></Link>
                <button className="rest-password-btn" onClick={(ev) => {ev.preventDefault(); onClick()}}>Выслать мне пароль</button>
            </div>
            </div>
    );
}