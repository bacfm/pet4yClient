import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editProfile} from '../../api/index';
import {Link} from 'react-router-dom';
import './test.scss';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warning: false,
            notValidPhone: false,
            notValidEmail: false,
            cityList: null,
            notValidLinks: false,
            showCountr: false,
            showCities: false,
            showPopup: false
        }
        this.onNur = this.onNur.bind(this);
        this.onName = this.onName.bind(this);
        this.onSur = this.onSur.bind(this);
        this.onPhon = this.onPhon.bind(this);
        this.onSPhon = this.onSPhon.bind(this);
        this.onFb = this.onFb.bind(this);
        this.onEmail = this.onEmail.bind(this);
        this.onCity = this.onCity.bind(this);
        this.onDesc = this.onDesc.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onDir = this.onDir.bind(this);
        this.onCountry = this.onCountry.bind(this);
        this.onCityListChange = this.onCityListChange.bind(this);
        this.changeCityList = this.changeCityList.bind(this);
        this.onShowCount = this.onShowCount.bind(this);
        this.onShowCities = this.onShowCities.bind(this);
        this.onPopupShow = this.onPopupShow.bind(this);
    }
    onShowCities(ev){
        ev.preventDefault();
        this.setState({showCities: !this.state.showCities})
    }
    onShowCount(ev){
        ev.preventDefault();
        this.setState({showCountr: !this.state.showCountr})
    }
    onCityListChange(ev) {
        ev.preventDefault();
        this.setState({country: ev.target.value})
    }

    onNur(ev) {
        this.setState({nursery: ev.target.value})
    }

    onName(ev) {
        this.setState({name: ev.target.value})
    }

    onSur(ev) {
        this.setState({surname: ev.target.value})
    }

    onPhon(ev) {
        this.setState({phone: ev.target.value.replace(/[^+\d]/g, '')})
    }

    onSPhon(ev) {
        this.setState({sphone: ev.target.value.replace(/[^+\d]/g, '')})
    }

    onFb(ev) {
        this.setState({fb: ev.target.value})
    }

    onEmail(ev) {
        this.setState({email: ev.target.value})
    }

    onCity(value) {
        this.setState({city: value})
    }

    onDesc(ev) {
        this.setState({description: ev.target.value})
    }

    onDir() {
        this.setState({director: !this.state.director});
    }

    onCountry(value) {
        this.setState({country: value})
    }
onPopupShow(){
    this.setState({showPopup: !this.state.showPopup})
}
    changeCityList(country) {
        return this.setState({
            cityList: this.props.cities[country].map((c, idx) => (<li key={idx} onClick={() => {this.city = c.name; this.onCity(c.name)}}>{c.name}</li>))
        });
    }

    onClick(ev) {
        ev.preventDefault();
        let mobile = this.phone.value + ';' + this.sphone.value;
        if (this.first_name.value === '' || this.phone.value === '' || this.email.value === '') {
            this.setState({warning: true});
            setTimeout(() => this.setState({warning: false}), 3000);
        } else if (this.email.value.search(/.+@\w+\.\w+/g) === -1) {
            this.setState({notValidEmail: true, email: ''});
            setTimeout(() => this.setState({notValidEmail: false}), 3000);
        } else if (this.phone.value.search(/\+?(38)?0\d{9}/g) === -1 && this.phone.value.search(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g) === -1) {
            this.setState({notValidPhone: true, phone: ''});
            setTimeout(() => this.setState({notValidPhone: false}), 3000);
        } else if (this.sphone.value !== '' && this.sphone.value.search(/\+?(38)?0\d{9}/g) === -1 && this.sphone.value.search(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g) === -1) {
            this.setState({notValidPhone: true, sphone: ''});
            setTimeout(() => this.setState({notValidPhone: false}), 3000);
        } else if (this.facebook.value !== '' && this.facebook.value.search(/^(ftp|http|https):\/\/[^ "]+$/g) === -1) {
            this.setState({notValidLinks: true});
            setTimeout(() => this.setState({notValidLinks: false}), 3000);
        } else if (this.social.value !== '' && this.social.value.search(/^(ftp|http|https):\/\/[^ "]+$/g) === -1) {
            this.setState({notValidLinks: true});
            setTimeout(() => this.setState({notValidLinks: false}), 3000);
        } else {
            this.props.changeProfile(this.company.value, this.first_name.value, this.last_name.value, mobile, this.facebook.value, this.email.value, this.city, this.description.value, this.country, this.viber.checked, this.wats.checked, this.telegram.checked, this.fbInp.checked, this.socialInp.checked, this.social.value, this.onPopupShow);
            this.setState({warning: false});
        }
    }

    render() {
        const {warning, notValidPhone, notValidEmail} = this.state;
        if (this.props.user && !this.props.user.user && this.props.cities) {
            const {email, first_name, company, last_name, mobile, description, country, city, facebook, feedback, social} = this.props.user;
            let {city_id} = this.props.user;
            const phones = mobile.split(';');
            return (
                <div className="userPage">
                    <h1>ЗАПОЛНИТЕ <b>СВОЙ ПРОФИЛЬ</b></h1>
                    <div className='main-inf'>
                        <div className='user-inf'>
                            <div><input type='text' placeholder='Название питомника' defaultValue={company}
                                        ref={input => this.company = input}/></div>
                            <div className={'required' + ' ' + (warning ? 'warning' : '' )}> 
                            {warning ? (<div className='auth-err'>Эти поля обязательны для заполнения!</div>) : ''}
                            <input type='text'
                               placeholder='Имя'
                               className='required'
                               defaultValue={first_name}
                               ref={input => this.first_name = input}/>
                            </div>
                            <div className='last_name'><input type='text' placeholder='Фамилия/отчество'
                                                              defaultValue={last_name}
                                                              ref={input => this.last_name = input}/></div>
                            <div
                                className={'required' + ' ' + (warning ? 'warning' : '' ) + ' ' + (notValidEmail ? 'not-email' : ' ')}>
                                {warning ? (<div className='auth-err'>Эти поля обязательны для заполнения!</div>) : null}
                                {notValidEmail ? (
                        <div className='auth-err'>Пожалуйста, проверьте правильность веденного Вами e-mail
                            адреса.</div>) : null}
                                <input type="email" placeholder="e-mail" className="required" defaultValue={email}
                                       ref={input => this.email = input}/></div>
                        </div>
                        <div className="user-sec-inf">
                            <div className="list-container" onClick={this.onShowCount}>                         
                            { this.state.country ? this.state.country === "Ukraine" ? "Украина" : "Россия" : this.props.user.country === "Ukraine" ? "Украина" : this.props.user.country === "Russia" ? "Россия" : "Страна" }
                                <div className={this.state.showCountr ? 'list-controll-clicked' : 'list-controll-not-clicked'}></div>
                                {this.state.showCountr ?
                                <ul className="hidden-select-list">
                                  <li onClick={(ev) => {this.country = "Ukraine"; this.changeCityList("Ukraine"); this.onCountry("Ukraine")}}>Украина</li>  
                                  <li onClick={(ev) => {this.country = "Russia"; this.changeCityList("Russia"); this.onCountry("Russia")}}>Россия</li>  
                                </ul>  
                                :
                                null
                                }
                            </div>
                            <div className="list-container" onClick={this.onShowCities}>
                                {this.state.city ? this.state.city : this.props.user.city ? this.props.user.city : 'Выберите город'}
                                <div className={this.state.showCities ? 'list-controll-clicked' : 'list-controll-not-clicked'}></div>
                                {this.state.showCities ?
                                <ul className="hidden-select-list">
                                    {this.state.cityList ? this.state.cityList : this.props.user.country ? this.props.cities[this.props.user.country].map((c, idx) => (
                                    <li key={idx} onClick={() => {this.city = c.name; this.onCity(c.name)}}>{c.name}</li>)) : this.props.cities["Ukraine"].map((c, idx) => (
                                    <li key={idx} onClick={() => {this.city = c.name; this.onCity(c.name)}}>{c.name}</li>))}
                                </ul>  
                                :
                                null
                                }
                            </div>
                            <div
                                className={'required' + ' ' + (warning ? 'warning' : '' ) + ' ' + (notValidPhone ? 'not-phone' : '')}>
                                {warning ? (<div className='auth-err'>Эти поля обязательны для заполнения!</div>) : ''}
                                {notValidPhone ? (<div className='auth-err'>
                                                Номер телефон должен быть записан в формате:
                                                <br/>
                                                Для Украины: +380
                                                <br/>
                                                Для России: +7
                                            </div>) : ''}
                                <input type='text' placeholder='Телефон' pattern="" className='required'
                                       defaultValue={phones[0]} value={this.state.phone} onChange={this.onPhon}
                                       ref={input => this.phone = input}/></div>
                            <div className={'second-phone' + (notValidPhone ? ' not-phone' : '')}>
                            {notValidPhone ? (<div className='auth-err'>
                                                Номер телефон должен быть записан в формате:
                                                <br/>
                                                Для Украины:  +380
                                                <br/>
                                                Для России: +7
                                            </div>) : ''}
                            <input type='text'
                                placeholder='Дополнительный телефон'
                                defaultValue={phones[1]}
                                value={this.state.sphone}
                                onChange={this.onSPhon}
                                ref={input => this.sphone = input}/>
                            </div>
                        </div>
                    </div>
                    <div className="messangers">
                        <h3>Мессенджер:</h3>
                        <div className="soc-item viber">
                            <label>Viber</label>
                            <input defaultChecked={feedback.viber} ref={input => this.viber = input} type="checkbox"/>
                        </div>
                        <div className="soc-item whats">
                            <label>WhatsApp</label>
                            <input defaultChecked={feedback.whatsapp} ref={input => this.wats = input} type="checkbox"/>
                        </div>
                        <div className="soc-item teleg">
                            <label>Telegram</label>
                            <input defaultChecked={feedback.telegram} type="checkbox"
                                   ref={input => this.telegram = input}/>
                        </div>
                    </div>
                    <div className="social-links">
                        <div className="social-block">
                            <h3>Facebook: </h3>
                            <div className="social-block-item">
                                <input className={"social-link" + (this.state.notValidLinks ? ' warningLink' : '')}
                                       type='text' placeholder="Ссылка на FB" defaultValue={facebook}
                                       ref={input => this.facebook = input}/>
                                <div>
                                    <input defaultChecked={feedback.facebook} ref={input => this.fbInp = input}
                                           type="checkbox"/>
                                    <label>Не пользуюсь Facebook</label>
                                </div>
                            </div>
                        </div>
                        <div className="social-block">
                            <h3>Другие соцсети: </h3>
                            <div className="social-block-item">
                            {this.state.notValidLinks ? (
                        <div className="auth-err">Эти поля должны содержать ссылки.</div>) : ''}
                                <input className={"social-link" + (this.state.notValidLinks ? ' warningLink' : '')}
                                       type='text' defaultValue={social} placeholder="Ссылка на социальные сети"
                                       ref={input => this.social = input}/>
                                <div>
                                    <input defaultChecked={feedback.social} ref={input => this.socialInp = input}
                                           type="checkbox"/>
                                    <label>Не пользуюсь соц. сетями</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="about">
                        <div className="nursery-inf">
                            <textarea placeholder="Расскажите о Вашем питомнике" defaultValue={description}
                                      ref={textarea => this.description = textarea}></textarea>
                        </div>
                    </div>
                    
                    <button className="user-btn" onClick={this.onClick}>Готово</button>
                    {this.state.showPopup ?
                    <div className="overlay">
                        <div className="popup profile-popup" onClick={() => this.onPopupShow()}>
                        <div className="close-popup"></div>
                            <Link to="/my-breeds">Добавить породы</Link>
                            <Link to="/profile" onClick={() => this.onPopupShow()}>Редактировать профиль</Link>
                        </div>
                    </div>
                    :
                    null
                }
                </div>
            );
        } else {
            return (<div></div>)
        }
    }
}

const mapState = (state) => {
    return {
        user: state.user,
        cities: state.cities
    }
}

const mapDispatch = (dispatch) => {
    return {
        changeProfile: (company, first_name, last_name, mobile, facebook, email, city, description, country, viber, whats, telegram, fb, socInp, social, func) => dispatch(editProfile(company, first_name, last_name, mobile, facebook, email, city, description, country, viber, whats, telegram, fb, socInp, social, func))
    }
}


export default connect(mapState, mapDispatch)(Profile);