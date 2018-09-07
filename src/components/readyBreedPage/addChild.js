import React from 'react';

export default class AddChild extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            male: 0,
            female: 0,
        }
        this.onMaleDec = this.onMaleDec.bind(this);
        this.onMaleInc = this.onMaleInc.bind(this);
        this.onFemDec = this.onFemDec.bind(this);
        this.onFemInc = this.onFemInc.bind(this);
        this.onClick = this.onClick.bind(this);
    } 
    onMaleDec(ev){
        this.setState({ male: this.state.male - 1})
    }
    onFemDec(ev){
        this.setState({ female: this.state.female - 1})
    }
    onMaleInc(ev){ this.setState({ male: this.state.male + 1})}
    onFemInc(ev){ this.setState({ female: this.state.female + 1})}
    onClick(ev){
        ev.preventDefault();
        const body = {boys: this.state.male, girls: this.state.female, pair_id: this.props.pair_id}
        return fetch("http://api.pet4u.com.ua/api/v1/brood/child", {
            method: 'POST',
            headers: {
                'Authorization': "Token " + window.localStorage.token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            if(res.status === 200){
                window.location.reload();
            }
        })
    }
    render() {
        return (
        <div className="overlay">
            <div className="popup">
            <span className="close-popup" onClick={this.props.onShowAddChild}></span>
            <div className="dog-counter">
                        <div className="counter">
                            <span>На продажу Male</span>
                            <div>
                            <button style={{borderRadius: '0'}} disabled={this.state.male === 0 ? true : false} onClick={this.onMaleDec}>-</button>
                            <input type="text" value={this.state.male}/>
                            <button style={{borderRadius: '0'}} disabled={this.state.male === 15 ? true : false} onClick={this.onMaleInc}>+</button>
                            </div>
                        </div>
                        <div className="counter">
                            <span>На продажу Female</span>
                            <div>
                            <button style={{borderRadius: '0'}} disabled={this.state.female === 0 ? true : false} onClick={this.onFemDec}>-</button>
                            <input type="text" value={this.state.female}/>
                            <button style={{borderRadius: '0'}} disabled={this.state.female === 15 ? true : false} onClick={this.onFemInc}>+</button>
                            </div>
                        </div>
                    </div>
                    <button style={{margin: '0 auto', padding: '13px 0', margin: '20px 0'}} onClick={this.onClick}>Готово</button>
            </div>
        </div>
    );
}
}