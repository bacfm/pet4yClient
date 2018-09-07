import React, { Component } from 'react';
import Header from '../Header/index';
import './style.css';
import dog from './img/dog.png';
import cat from './img/cat1.png';

class KindOfActivity extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: null
        }
        this.chooseType = this.chooseType.bind(this);
    }
    chooseType(type){
       return fetch('http://api.pet4u.com.ua/api/v1/account/profile/', {
            headers: {
                "Content-type": "application/json",
                'Authorization': "Token " + window.localStorage.token

            },
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({animal_id: type})
        })
            .then((res) => res.json())
           .then(function(res){
               if(res.animal_id === 1 || res.animal_id === 2) {
                   window.location.pathname ='/breeds';
               }})
        .catch(err => console.log(err))
    }
    render(){
          return (
              <div className="choose-activity">
                  <Header/>
                  <h2>Разместить объявление на продажу</h2>
                  <div className="choose-animal">
                      <div className="dogs">
                          <img src={dog} alt="dog"/>
                          <button onClick={() => this.chooseType("1")}>Собаки</button>
                      </div>
                      <div className="cats">
                          <img src={cat} alt="cat"/>
                          <button onClick={() => this.chooseType("2")}>Кошки</button>
                      </div>
                  </div>
              </div>
          );
      }
    }

export default KindOfActivity;
