import React, { Component } from 'react';
import Calendar from '../../components/CalendarComponent';
import { connect } from 'react-redux';
import { getPlanedLitters, planeLitter } from '../../api';
import './style.css'

class PlaneLitters extends Component {
    constructor(props){
        super(props);

        this.state = {
            breedId: null,
            breed: '',
            date: '',
            showBreed: false
        }
        this.onClick = this.onClick.bind(this);
        this.selectDay = this.selectDay.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onPlanedDelete = this.onPlanedDelete.bind(this);
        this.onBreedChange = this.onBreedChange.bind(this);
        this.onSelectBreed = this.onSelectBreed.bind(this);
    }
    selectDay(day){
        this.setState({ date: day.getFullYear() + '-' + (Number(day.getMonth()) + 1) + '-' + day.getDate()})
    }
    onChange(ev){
        ev.preventDefault();
        this.setState({breedId: ev.target.value })
    }
    onClick(ev){
        ev.preventDefault();
        this.props.plane(this.state.breedId, this.state.date);
        this.setState({date: '', breed: ''})
    }
    onBreedChange(ev){
        ev.preventDefault();
        this.setState({breed: ev.target.value})
    }
    onSelectBreed(name, id){
        this.setState({breed: name, breedId: id, showBreed: false})
    }
    onPlanedDelete(id){
        const { getPlaned } = this.props;
        return fetch(`http://api.pet4u.com.ua/api/v1/brood/planned?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': "Token " + window.localStorage.token,
            }
        })
            .then(function(res){
                if(res.status === 200){
                return getPlaned();
        }})
    }
    render(){
        if(this.props.breeds && this.props.planed) {
            let filteredBreeds = this.props.breeds.filter((br) => br.name.includes(this.state.breed))
            return (
                <div className="breeds">
                    <h1>ЗАПЛАНИРУЙТЕ ПОМЕТ, <b>И МЫ ПЕРЕЗВОНИМ ВАМ</b></h1>
                    {this.props.planed.map((p, idx) => (<div key={idx} className="planed-item"><p>{p.breed}</p><p>{p.birthday}</p><span onClick={() => this.onPlanedDelete(p.id)}></span></div>))}
                    <h4>ЗАПЛАНИРОВАТЬ НОВЫЙ ПОМЕТ</h4>
                    <div className="plane-litt list-container">
                    <div onClick={() => this.setState({showBreed: !this.state.showBreed})}  className={this.state.showBreed ? 'list-controll-clicked' : 'list-controll-not-clicked'}></div>
                    <input type="text" value={this.state.breed} className="select-breed-input" onChange={this.onBreedChange} placeholder="Выберите породу" onClick={() => this.setState({showBreed: !this.state.showBreed})}/>
                    {
                        this.state.showBreed ?
                        <ul className="show-breeds">
                            {filteredBreeds.map((br, idx) => (<li key={idx} onClick={() => this.onSelectBreed(br.name, br.id)}>{br.name}</li>))}
                        </ul>
                        :
                        null
                    }
                        <Calendar onChange={this.selectDay}/>
                    </div>
                    <button className="add-litt" onClick={this.onClick}>Готово</button>
                </div>
            );
        } else {
            return (<div></div>)
        }
    }
}

const mapState = state => {
    return {
        breeds: state.breedsList.breeds,
        planed: state.planedLitters
    }
}
const mapDispatch = dispatch => {
    return {
        getPlaned: () => dispatch(getPlanedLitters()),
        plane: (id, date) => dispatch(planeLitter(id, date))
    }
}

export default connect(mapState, mapDispatch)(PlaneLitters);