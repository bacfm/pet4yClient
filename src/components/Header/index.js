import React, { Component } from 'react';
import { deleteAccount } from '../../api';
import './style.css';
import logo from './img/logo.png';


export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            deleteBlock: false
        }
        this.Exit = this.Exit.bind(this);
        this.onDel = this.onDel.bind(this);
        this.onViewDEl = this.onViewDEl.bind(this);
    }
    Exit(ev){
        ev.preventDefault()
        window.localStorage.removeItem('token');
        window.location.reload();
    }
    onDel(ev){
        ev.preventDefault();
        deleteAccount();
    }
    onViewDEl(ev){
        ev.preventDefault();
        this.setState({deleteBlock: !this.state.deleteBlock})
    }
    render(){
        return (
            <div className="header">
               <div className="user-header">
                   <div className="user-link">
                   <span onClick={this.Exit}>Выход</span>
                   <span onClick={this.onViewDEl}>Удалить</span>
                   </div>
               </div>
                <div className="logo-header"> <img src={logo} alt=""/> </div>
                {this.state.deleteBlock ?
                <div className="overlay">
                <div className='accept-del-acc popup'>
                <span className="close-popup" onClick={this.onViewDEl}></span>
                <h1>ВЫ <b>УВЕРЕНЫ?</b></h1>
                <div className="del-contrls">
                    <button onClick={this.onDel}>Удалить</button>
                    <button onClick={this.onViewDEl}>Отмена</button>
                </div>
            </div>
            </div>
            :
            null
            }
            </div>
        );
    }
}
