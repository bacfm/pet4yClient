import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from '../../components/CalendarComponent';
import './style.css'
import Steps from '../../components/userSteps';

class LitterPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            birthday: '',
            price: '',
            currency: 'UAH',
            male: 0,
            female: 0,
            dad_titles: '',
            mum_titles: '',
            mum_fam: '',
            dad_fam: '',
            notDate: false,
            disabledBtn: false,
            error: false,
            notValidLinks: false,
            showCurrency: false,
            commentPair: '',
            commentCost: '',
            fci_dad: false,
            fci_mom: false,
            photos_dad: false,
            photos_mom: false
        }
        this.onCur = this.onCur.bind(this);
        this.onPrice = this.onPrice.bind(this);
        this.onMaleDec = this.onMaleDec.bind(this);
        this.onMaleInc = this.onMaleInc.bind(this);
        this.onFemDec = this.onFemDec.bind(this);
        this.onFemInc = this.onFemInc.bind(this);
        this.MumTit = this.MumTit.bind(this);
        this.DadTit = this.DadTit.bind(this);
        this.MumFam = this.MumFam.bind(this);
        this.DadFam = this.DadFam.bind(this);
        this.SelectDay = this.SelectDay.bind(this);
        this.onClick = this.onClick.bind(this);
        this.setBtn = this.setBtn.bind(this);
        this.onShowCurrency = this.onShowCurrency.bind(this);
        this.onCommentPrice = this.onCommentPrice.bind(this);
        this.onCommentPair = this.onCommentPair.bind(this);
        this.onFciDad = this.onFciDad.bind(this);
        this.onFciMom = this.onFciMom.bind(this);
        this.onPhDad = this.onPhDad.bind(this);
        this.onPhMom = this.onPhMom.bind(this);
    }
    onFciDad(ev){
        this.setState({fci_dad: !this.state.fci_dad})
    }
    onFciMom(ev){
        this.setState({fci_mom: !this.state.fci_mom})
    }
    onPhDad(ev){
        this.setState({photos_dad: !this.state.photos_dad})
    }
    onPhMom(ev){
        this.setState({photos_mom: !this.state.photos_mom})
    }
    onCommentPrice(ev){
        this.setState({commentCost: ev.target.value})
    }
    onCommentPair(ev){
        this.setState({commentPair: ev.target.value})
    }
    onShowCurrency(ev){
        ev.preventDefault();
        this.setState({showCurrency: !this.state.showCurrency})
    }
    SelectDay(day){
        this.setState({ birthday: day.getFullYear() + '-' + (Number(day.getMonth()) + 1) + '-' + day.getDate()})
    }
    onCur(value){ this.setState({ currency: value })}
    onPrice(ev){ this.setState({ price: ev.target.value })}
    onMaleDec(ev){
        this.setState({ male: this.state.male - 1})
    }
    onFemDec(ev){
        this.setState({ female: this.state.female - 1})
    }
    setBtn(value){
        this.setState({ disabledBtn: value})
    }
    onMaleInc(ev){ this.setState({ male: this.state.male + 1})}
    onFemInc(ev){ this.setState({ female: this.state.female + 1})}
    MumTit(ev){this.setState({ mum_titles: ev.target.value })}
    DadTit(ev){ this.setState({ dad_titles: ev.target.value })}
    MumFam(ev){ this.setState({mum_fam: ev.target.value })}
    DadFam(ev){this.setState({ dad_fam: ev.target.value })}
    onClick(ev){
        ev.preventDefault();
        const { birthday, price, currency, male, female, dad_titles, mum_titles, mum_fam, dad_fam, commentCost, commentPair, fci_dad, photos_dad, fci_mom, photos_mom } = this.state;
        const { breedId } = this.props;
        const { setBtn } = this;
        if(birthday === '' || currency === '' || price === '' ){
            this.setState({error: true});
            window.scrollTo(0,0);
            setTimeout(() => this.setState({ error: false }), 3000);
        } else if(mum_fam !== '' && mum_fam.search( /^(ftp|http|https):\/\/[^ "]+$/g) === -1){
            this.setState({notValidLinks: true });
            setTimeout(() => this.setState({notValidLinks: false}), 3000);
        } else if(dad_fam !== '' && dad_fam.search( /^(ftp|http|https):\/\/[^ "]+$/g) === -1){
            this.setState({notValidLinks: true });
            setTimeout(() => this.setState({notValidLinks: false}), 3000);
        } else {
            const body = {
                breed_id: breedId,
                birthday: birthday,
                cost: price,
                currency: currency,
                boys: male,
                girls: female,
                parents: {father: {feat: dad_titles, pedigree: dad_fam, fci_check: fci_dad, ped_check: photos_dad}, mother: {feat: mum_titles, pedigree: mum_fam, fci_check: fci_mom, ped_check: photos_mom}},
                pair_comment: commentPair,
                cost_comment: commentCost
            }
            this.setState({disabledBtn: true});
            setTimeout(() => this.setState({disabledBtn: false}), 4000);
            return fetch('http://api.pet4u.com.ua/api/v1/brood/create', {
                method: 'POST',
                headers: { 
                    'Authorization': "Token " + window.localStorage.token,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(function (res) {
                    if (res.status !== 201) {
                        setBtn(false);
                    }
                    return res;
                })
                .then((res) => res.json())
                .then((res) => {
                    if (res.brood_id) {
                        return window.location.pathname = `/broods/${res.brood_id}/add-photo`
                    }
                })
                .catch((err) => console.log(err))
        }
    }
    render(){
        return (
            <div className='litter-page'>
                <h1>ДОБАВЬТЕ <b>АКТУАЛЬНЫЕ ПОМЕТЫ</b></h1>
                <Steps num={1}/>
                <h2>ИНФОРМАЦИЯ О ПОМЕТЕ</h2>
                <div className="dog">
                    <div className="dog-info">
                        <span className={"wrapper-calendar" + (this.state.error ? ' warning': '')}>
                            <Calendar className={(this.state.error ? 'warning' : '')} onChange={this.SelectDay}/>
                        </span>
                        <div className="dog-price">
                            <div className='required required-price' ><input type="text" className={(this.state.error ? 'warning' : '')} placeholder="Цена" value={this.state.price} onChange={this.onPrice}/></div>
                            {this.state.error ? (<div className="auth-err" style={{textAlign: 'center'}}>Эти поля обязательны для заполнения.</div>) : ''}
                            <div className={" required select-cur list-container" + (this.state.error ? " warning": "")} onClick={this.onShowCurrency}>                         
                            {this.state.currency ? this.state.currency : 'Валюта'}
                                <div className={this.state.showCurrency ? 'list-controll-clicked' : 'list-controll-not-clicked'}></div>
                                {this.state.showCurrency ?
                                <ul className="hidden-select-list">
                                  <li onClick={() => this.onCur("UAH")}>UAH</li>  
                                  <li onClick={() => this.onCur("RUB")}>RUB</li>  
                                  <li onClick={() => this.onCur("USD")}>USD</li>  
                                  <li onClick={() => this.onCur("EUR")}>EUR</li>  
                                </ul>  
                                :
                                null
                                }
                            </div>
                        </div>
                    </div>
                    <div className="dog-counter">
                        <div className="counter">
                            <span>На продажу Male</span>
                            <div>
                            <button disabled={this.state.male === 0 ? true : false} onClick={this.onMaleDec}>-</button>
                            <input type="text" value={this.state.male}/>
                            <button disabled={this.state.male === 15 ? true : false} onClick={this.onMaleInc}>+</button>
                            </div>
                        </div>
                        <div className="counter">
                            <span>На продажу Female</span>
                            <div>
                            <button disabled={this.state.female === 0 ? true : false} onClick={this.onFemDec}>-</button>
                            <input type="text" value={this.state.female}/>
                            <button disabled={this.state.female === 15 ? true : false} onClick={this.onFemInc}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comments">
                    <textarea placeholder="Комментарии к цене" value={this.state.commentCost} onChange={this.onCommentPrice}></textarea>
                    <textarea placeholder="Комментарии к помету" value={this.state.commentPair} onChange={this.onCommentPair}></textarea>
                </div>
                <div className="parents">
                    <div className="parent">
                        <h3>Мама</h3>
                        <div className="parent-info">
                            <textarea placeholder="Титулы, PRA-prcd тест, ED и HD тесты, Рост, Вес" onChange={this.MumTit} value={this.state.mum_titles}></textarea>
                            <input type="text" className={(this.state.notValidLinks ? 'warning' : '')} placeholder="Ссылка на родословную" onChange={this.MumFam} value={this.state.mum_fam}/>
                            {this.state.notValidLinks ? (<div className="auth-err" style={{textAlign: 'center'}}>Эти поля должны содержать ссылки.</div>) : ''}    
                        </div>
                        <div className="parent-check">
                            <div className="parent-check-item">
                                <input type="checkbox" value={this.state.fci_mom} onChange={this.onFciMom}/>
                                <label>Отсутствует родословная FCI</label>
                            </div> 
                            <div className="parent-check-item">
                            <input type="checkbox" value={this.state.photos_mom} onChange={this.onPhMom}/>
                            <label>Родословная на фото (Шаг 2)</label>
                        </div> 
                        </div>
                    </div>
                    <div className="parent">
                        <h3>Папа</h3>
                        <div className="parent-info">
                            <textarea placeholder="Титулы, PRA-prcd тест, ED и HD тесты, Рост, Вес" onChange={this.DadTit} value={this.state.dad_titles}></textarea>
                            <input type="text" className={(this.state.notValidLinks ? 'warning' : '')} placeholder="Ссылка на родословную" onChange={this.DadFam} value={this.state.dad_fam}/>
                        </div>
                    </div>
                    <div className="parent-check">
                        <div className="parent-check-item">
                            <input type="checkbox" value={this.state.fci_dad} onChange={this.onFciDad}/>
                            <label>Отсутствует родословная FCI</label>
                        </div> 
                        <div className="parent-check-item">
                            <input type="checkbox" value={this.state.photos_dad} onChange={this.onPhDad}/>
                            <label>Родословная на фото (Шаг 2)</label>
                        </div> 
                    </div>
                </div>
                <div className="submit"><button onClick={this.onClick} disabled={this.state.disabledBtn}>Готово</button></div>
            </div>
        );
    }
}
const mapState = (state, { match }) => {
    const breedId = Number.parseInt(match.params.id, 10);
    return {
        breedId: breedId
    }
}
export default connect(mapState)(LitterPage);