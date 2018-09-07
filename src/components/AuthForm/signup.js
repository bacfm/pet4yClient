import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUserProfile} from '../../api';
import eye from './img/eye.png';
import eye_show from './img/eye_show.png';
import './style.css'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            phone: '',
            password: '',
            error: false,
            type: 'password',
            reqiuredField: false,
            emptyFields: false,
            invalidPassword: false,
            uniqueEmail: false,
            invalidPhone: false,
            showPhones: false,
            emptyEmail: false
        }
        this.onMailChange = this.onMailChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.onViewChange = this.onViewChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.uniqueEmail = this.uniqueEmail.bind(this);
        this.onPhoneShow = this.onPhoneShow.bind(this);
    }
    onPhoneShow(ev){
        ev.preventDefault();
        this.setState({showPhones: !this.state.showPhones})
    }
    onMailChange(ev) {
        this.setState({email: ev.target.value})
    }

    onNameChange(ev) { 
        this.setState({name: ev.target.value})
    }

    onPhoneChange(ev) {
        this.setState({phone: ev.target.value.replace(/[^+\d]/g, '')})
    }

    onPassChange(ev) {
        this.setState({password: ev.target.value})
    }

    onViewChange(ev) {
        if (this.state.type === 'password') {
            this.setState({type: 'text'})
        } else {
            this.setState({type: 'password'})
        }
    }
    uniqueEmail(){
        this.setState({ uniqueEmail: true, errorMessage: 'Пользователь с таким Email уже зарегистрирован' });
        setTimeout(() => this.setState({ uniqueEmail: false}), 3000)
    }

    onClick(ev) {
        ev.preventDefault();
        const {email, name, phone, password} = this.state;
        const { uniqueEmail } = this;
        if (email.trim() === '' || name.trim() === '' || phone.trim() === '' || password.trim() === '') {
            this.setState({emptyFields: true,})
            setTimeout(() => {
                this.setState({emptyFields: false})
            }, 3000)
        }else if(password.trim().length < 8){
            this.setState({invalidPassword: true})
            setTimeout(() => {
                this.setState({invalidPassword: false})
            }, 3000)
        } else if(phone.search(/\+?(38)?0\d{9}/g) === -1 && phone.search(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g) === -1){
            this.setState({ invalidPhone: true});
            setTimeout(() => this.setState({ invalidPhone: false}), 5000);
        } else if(email.search(/.+@\w+\.\w+/g) === -1){
            this.setState({emptyEmail: true})
            setTimeout(() => this.setState({ uniqueEmail: false }), 3000);
        } else {
            return fetch('http://api.pet4u.com.ua/api/v1/account/registration/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    first_name: this.state.name,
                    mobile: this.state.phone,
                    password: this.state.password
                })
            }).then(function(res){
                if(res.status === 201){
                   return  window.location.pathname = '/confirm';
                } else {

                    return res.json();
                }
            })
                .then((res) => {
                    if(res.email[0] === "Это поле должно быть уникально."){
                        uniqueEmail();
                    }
                })
        } 
    }

    render() {
        return (
            <div className="auth">
                <div className="auth-logo">
                </div>
                <div className={'auth-field' + (this.state.reqiuredField ? ' required-field' : '')}>
                    <label>Ваше имя</label>
                    <input type="text" onChange={this.onNameChange} value={this.state.name} className={(this.state.emptyFields ? 'empty' : '')}/>
                </div>
                <div className={'auth-field' + (this.state.error ? ' error-sign' : '') + (this.state.showPhones ? ' clicked_phone' : ' not_clicked_phone')}>
                    <label>Телефон</label>
                    <input type="text" onChange={this.onPhoneChange} value={this.state.phone} className={(this.state.emptyFields ? 'empty' : '') + (this.state.invalidPhone ? ' invalidPass' : '')} onClick={this.onPhoneShow} style={{cursor: 'pointer'}}/>
                    {this.state.showPhones ?
                    <div className="list-container select-phone">
                    <ul className="hidden-select-list ">
                        <li onClick={() => this.setState({phone: '+380', showPhones: false})}>Украина</li>
                        <li onClick={() => this.setState({phone: '+7', showPhones: false})}>Россия</li>
                    </ul>
                    </div>
                    :
                    null
                    }
                    {this.state.invalidPhone ? (<div className='auth-err'>
                    Номер телефон должен быть записан в формате:
                    <br/>
                    Для Украины: +380
                    <br/>
                    Для России: +7</div>) : ''}
                </div>
                <div className={'auth-field' + (this.state.reqiuredField ? ' required-field' : '')}>
                    <label>E-mail</label>
                    <input type="email" onChange={this.onMailChange} value={this.state.email} className={(this.state.emptyFields ? 'empty' : '')}/>
                    {this.state.uniqueEmail ? (<div className="auth-err" style={{textAlign: 'center'}}>Пользователь с таким Email уже зарегистрирован.</div>) : ''}
                    {this.state.emptyEmail ? (<div className="auth-err" style={{textAlign: 'center'}}>Пожалуйста, проверьте Ваш e-mail адрес.</div>) : ''}
                </div>
                <div className={"auth-field" + (this.state.error ? ' error-sign' : '')}>
                    <label>Пароль</label>
                    <input type={this.state.type} onChange={this.onPassChange} value={this.state.password} className={(this.state.emptyFields ? 'empty' : '') +(this.state.invalidPassword ? ' invalidPass' : '') }/>
                    <img onClick={this.onViewChange} src={this.state.type !== 'password' ? eye_show : eye} alt='eye'/>
                    {this.state.emptyFields ? (<div className="auth-err" style={{textAlign: 'center'}}>Для регистрации необходимо заполнить все поля.</div>) : ''}
                    {this.state.invalidPassword ? (<div className="auth-err" style={{textAlign: 'center'}}>Пароль должен содержать не менее 8 символов.</div>) : ''}
                </div>
                {/* {this.state.invalidPhone ? (<p className='errorMessage'>
                    Номер телефон должен быть записан в формате:
                    <br/>
                    Для Украины +380
                    <br/>
                    Для России +7</p>) : ''} */}
                <div className="auth-btns">
                    <button onClick={this.onClick}>Готово</button>
                    <Link to="/login">
                        <button>Назад</button>
                    </Link>
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


export default connect(null, mapDispatch)(SignUp);
