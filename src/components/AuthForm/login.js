import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserProfile } from '../../api';
import './style.css';
class LogIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            wrongPass: false
        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onWrongChange = this.onWrongChange.bind(this);
    }
    onNameChange(ev){ this.setState({ email: ev.target.value })}
    onPassChange(ev){ this.setState({ password: ev.target.value })}

    onWrongChange(){
        this.setState({ wrongPass: !this.state.wrongPass })
    }
    onClick(ev){
        const { onWrongChange } = this;
        ev.preventDefault();
        fetch('http://api.pet4u.com.ua/api/v1/account/login/', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        })
            .then((res) => res.json())
            .then(function(res){
                if(res.token && res.token !== 'undefined') {
                    console.log(res.token);
                    window.localStorage.setItem('token', res.token);
                    window.location.pathname = '/my-breeds';
                } else {
                    onWrongChange();
                    setTimeout(() => onWrongChange(), 3000);
                }
            })
            .catch((err) => console.log(err))
        this.props.getProfile();
    }

    render(){
        return (
            <div className="auth">
                <div className="auth-logo"></div>
                <div className="auth-field">
                    <label>E-mail</label>
                    <input type="text" onChange={this.onNameChange} value={this.state.email} />
                </div>
                <div className='auth-field'>
                    <label>Пароль</label>
                    <input type="password" onChange={this.onPassChange} value={this.state.password} />
                    {this.state.wrongPass ? 
                    <div className="auth-err">
                        К сожалению, Вы ввели неправильный пароль.
                        <br/>
                        Проверьте правильность набора пароля и повторите попытку входа.
                    </div>
                    :
                    null    
                }
                </div>
                <div className="reset-link">
                    <Link to="reset-password">Забыли пароль?</Link>
                </div>
                <div className="auth-btns">
                    <Link to='/'><button onClick={this.onClick}>Вход</button></Link>
                    <Link to="/signup"><button>Регистрация</button></Link>
                </div>
            </div>
        );
    }
}

const mapDispatch = dispatch => {
    return {
        getProfile: () => dispatch(getUserProfile())
    }
}

export default connect(null, mapDispatch)(LogIn);
