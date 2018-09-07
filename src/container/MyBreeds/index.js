import React, { Component } from 'react';
import { connect } from 'react-redux';
import BreedItem from '../../components/BreedItem';
import { addUserBreed, delUserBreed } from '../../api';
import './style.css';

class MyBreeds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breedsFilter: '',
            deleteBlock: false,
            show: false,
            error: false
        }
        this.onClick = this.onClick.bind(this);
        this.onBreedFilter = this.onBreedFilter.bind(this);
        this.onShow = this.onShow.bind(this);
        this.onHide = this.onHide.bind(this);
    }
    onClick(ev){
        console.log(this.props.userBreeds.length)
        if(this.props.userBreeds.length >= 6){
            this.setState({error: true});
            this.setState({ breedsFilter: ''})
            this.onHide(ev);
            setTimeout(() => this.setState({error: false}), 3000);
        }else {
            this.props.onAdd(ev.target.id);
            this.setState({breedsFilter: ''})
            this.onHide(ev);
        }
    }
    onBreedFilter(ev){
        this.setState({ breedsFilter: ev.target.value })
    }
    onShow(ev){
        ev.preventDefault();
        this.setState({deleteBlock: !this.state.deleteBlock})
    }
    onHide(ev){
        ev.preventDefault();
        this.setState({show: !this.state.show})
    }
    render(){
    if(this.props.breedsList && this.props.userBreeds) {
       const breeds = this.props.userBreeds.map((br, idx) => (
           <BreedItem title={br.breed} id={br.id}  key={idx} num={idx} onClick={this.props.onDel} onShow={this.onShow} deleteBlock={this.state.deleteBlock}/>));
        const filterBreeds = this.props.breedsList.filter(br => br.name.toLocaleLowerCase().includes(this.state.breedsFilter.toLocaleLowerCase()));
        const filteredBreeds = filterBreeds.map((br, idx) => (<li key={idx} id={br.id} onClick={this.onClick}>{br.name}</li>));
        return (
            <div className="my-breeds">
                <h1>ДОБАВЬТЕ ПОРОДЫ, <b>С КОТОРЫМИ ВЫ РАБОТАЕТЕ</b></h1>
                <div className="select-breed">
                    <input type="text" placeholder="Выберите породу" value={this.state.breedsFilter} onClick={this.onHide} onChange={this.onBreedFilter}/>
                    <ul className={(this.state.show ? "show-breeds" : "hidden")}>
                        {filteredBreeds}
                    </ul>
                </div>
                <div className="breeds-list">
                    {breeds}
                </div>
                {this.state.error ?
                    <div className="error-qu">
                    <h3>Максимальное количество используемых пород - 6</h3>
                </div>
                    :
                    ''
                }
            </div>
        );
    } else { return (<div></div>)}
    }
}

const mapState = (state) => {
    return {
        type: state.user.type,
        userBreeds: state.userBreeds,
        breedsList: state.breedsList.breeds
    }
}
const mapDispatch = (dispatch) => {
    return {
        onAdd: (id) => dispatch(addUserBreed(id)),
        onDel: (id) => dispatch(delUserBreed(id)),
    }
}

export default connect(mapState, mapDispatch)(MyBreeds);