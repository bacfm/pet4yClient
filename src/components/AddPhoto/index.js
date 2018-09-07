import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Steps from '../userSteps';
import { getBroodView } from '../../api';
import InputForPhotos from '../addPhotoItem';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import './style.css'



class AddPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            male: null,
            female: null,
            photos: [],
        }
    }
    componentWillMount() {
        this.props.getBrood(this.props.id);
    }
    render() {
        if (this.props.brood) {
            const male = [];
            const female = [];
            let boysId = [];
            let girlsId = [];
            let malePhotos = [];
            let femalePhotos = [];
            this.props.brood.children.forEach(function(e){
                if(e.sex === 'M'){
                    boysId.push(e.id);
                    malePhotos.push(e.photos)
                }else{
                    girlsId.push(e.id);
                    femalePhotos.push(e.photos);
                }
            })
            for (let i = 1; i <= this.props.brood.boys; i++) {
                male.push(<div className="ph-el" key={i}>
                    <h1>Male {i}:</h1>
                    <InputForPhotos whom="child" parent_id={boysId[i-1]} get_photos={malePhotos[i-1]}/>
                </div>);
            }
            for (let i = 1; i <= this.props.brood.girls; i++) {
                male.push(<div className="ph-el" key={i + Math.random()}>
                    <h1>Female {i}:</h1>
                    <InputForPhotos whom="child" parent_id={girlsId[i-1]} get_photos={femalePhotos[i-1]}/>
                </div>);
            }
            return (
                <div className="add-photo">
                <h1 style={{marginBottom: '60px'}}>ДОБАВЬТЕ <b>АКТУАЛЬНЫЕ ФОТО</b></h1>
                    <Steps num={2}/>
                    <div className="ph-el">
                        <h1>Mама + Фото Родословной</h1>
                        <InputForPhotos whom="mother" parent_id={this.props.brood.parents.mother.id} get_photos={this.props.brood.parents.mother.photos}/>
                    </div>
                        <div className="ph-el">
                            <h1>Папа + Фото Родословной</h1>
                            <InputForPhotos whom="father" parent_id={this.props.brood.parents.father.id} get_photos={this.props.brood.parents.father.photos}/>
                    </div>
                    {male}
                    {female}
                    <Link to={`/last-step/${this.props.id}/${this.props.brood.birthday}`}>
                        <button onClick={() => {
                            fetch(`http://api.pet4u.com.ua/api/v1/brood/bot?id=${this.props.id}`, {method: 'POST',
                            headers: {
                                'Authorization': "Token " + window.localStorage.token,
                                'Content-type': 'application/json'
                            }});
                        }}>Готово</button>
                    </Link>
                </div>
            );
        } else {
            return (<div></div>)
        }
    }
}

const mapState = (state, { match }) => {
    return {
        brood: state.broodView,
        id: match.params.id
    }
}
const mapDispatch = dispatch => {
    return {
        getBrood: (id) => dispatch(getBroodView(id))
    }
}

export default connect(mapState, mapDispatch)(AddPhoto);