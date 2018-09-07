import React, { Component } from 'react';
import LittersList from '../litters-list';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import menu from './img/menu.png';
import clicked from './img/clicked.png';
import not_clicked from './img/not_clicked.png';
import plus from './img/plus.png';
import warning from './img/warning_icon.png';
import './test.scss';


class LeftBar extends Component {
    constructor(props){
        super(props);
       this.state = {
           isBreeds: false,
           breedClicked: null,
           hiddenBar: true,
       }
       this.DisplayBr = this.DisplayBr.bind(this);
       this.onHide = this.onHide.bind(this);
    }
    onHide(ev){
        this.setState({hiddenBar: !this.state.hiddenBar});
    }
    DisplayBr(ev){
        this.onHide(ev);
        this.setState({
            isBreeds: !this.state.isBreeds,
            breedClicked: null
        });
    }

    render(){
        let breeds = [];
        if(this.props.userBreeds){
            breeds = this.props.userBreeds
        }
        const { breedClicked } = this.state;
        const breedsList = breeds.map((br, idx) => (<li key={idx} className={'list-itm' + (breedClicked === br.id ? " onbreed-click" : "")} id={br.id} onClick={() => { this.setState({ breedClicked: br.id}); }}><div style={{background: breedClicked === br.id ? '#fdba3a' : '#fff1d8'}}>{breedClicked === br.id ? <img src={clicked} alt="img"/> : <img src={not_clicked} alt="img"/>}</div>{br.breed}</li>));
        return (
            <nav className="left-bar" style={{height: window.outerWidth <= 820 ? this.state.hiddenBar ? '0': 'calc(100% - 97px)': 'auto'}}>
                <img className='menu-icon' src={menu} onClick={this.onHide} alt="img"/>
                <ul className={(this.state.hiddenBar ? ' hidden-menu' : '')}>
                    <li style={{background: window.location.pathname.includes("profile") ? "#337ab7" : "#d6e4f1"}} onClick={this.onHide}><span data-col="blue"></span><Link to="/profile" style={{color:  window.location.pathname.includes("profile") ? 'white': 'black'}}>Профиль</Link>{!this.props.user.city && !this.props.user.country ? <img title="Заполните недостающие поля в профиле." className="warning-icon" src={warning} alt="warning"/> : null }</li>
                    <li style={{background: window.location.pathname.includes("my-breed") ? "#fdba3a" : "#fff1d8"}}><span  data-col="yellow"></span><Link to="/my-breeds" onClick={this.DisplayBr} style={{color: window.location.pathname.includes("my-breed") ? 'white': 'black'}}>Мои породы</Link></li>
                    {breedsList}
                    <li className="litters-itm"><span data-col="green"></span>Актульные пометы</li>
                    {this.state.breedClicked !== null ? 
                    <li className="add_pair_btn" onClick={() => this.setState({breedClicked: null})}><div><img src={plus} alt="img" /></div><Link to={`/broods/${this.state.breedClicked}`}>Добавить помет</Link></li>
                    :
                    null
                    }
                    <LittersList onHide={this.onHide} show={this.state.breedClicked} />
                    <li style={{background: window.location.pathname.includes("plane-litter") ? "#bf1e2e" : "#f2d2d5"}} onClick={this.onHide}><span data-col="red"></span><Link to="/plane-litter" style={{color: window.location.pathname.includes("plane-litter") ? 'white': 'black'}}>Запланировать помет</Link></li>
                </ul>
            </nav>
        );
    }
}

const mapState = (state) => {
    return {
        userBreeds: state.userBreeds,
        user: state.user
    }
}


export default connect(mapState)(LeftBar);