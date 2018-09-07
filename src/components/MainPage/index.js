import React, {Component} from 'react';
import {Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import {getUserProfile, getUsersBreeds, getBreeds, getCities, getPlanedLitters} from '../../api';
import { connect } from 'react-redux';
import Header from '../Header';
import LeftBar from '../leftBar';
import Profile from '../../container/MyProfile';
import './style.css';
import PlaneLitters from "../../container/PlaneLitter/";
import LitterPage from '../../container/AddLitterPage';
import MyBreeds from '../../container/MyBreeds';
import AddPhoto from '../AddPhoto';
import LittersNextStep from '../LittersLastStep';
import BroodInfoPage from '../readyBreedPage';

const Admin = ({ match }) => {
    console.log(match);
    window.localStorage.setItem('token', match.params.token);
    window.location.pathname = '/';
    return (<div></div>)
}

 class MainPage extends Component {
     componentWillMount(){
         this.props.getProfile();
         this.props.getBreedsList();
         this.props.getUsersBreedsList();
         this.props.getCitiesList();
         this.props.getPlaned();
     }
    render() {
            return (
                <div className="main-page">
                    <Header/>
                    <div className="page">
                        <LeftBar/>
                        <div className="content">
                            <Switch>
                                <Route exact path="/profile" component={Profile}/>
                                <Route exact path="/broods/:id" component={LitterPage}/>
                                <Route exact path="/plane-litter" component={PlaneLitters}/>
                                <Route exact path="/my-breeds" component={MyBreeds}/>
                                <Route exact path="/broods/:id/add-photo" component={AddPhoto}/>
                                <Route exact path="/last-step/:id/:birthday" component={LittersNextStep}/>
                                <Route exact path="/breeds/view=:id" component={BroodInfoPage} />
                                <Route exact path = '/account/token=:token' component={Admin}/>
                                <Route path='*' component={()=> (<Router>
                                    <div><Redirect to='/my-breeds' />
                                        <Route exact path='/my-breeds' component={MyBreeds}/>
                                        <Route exact path="/broods/:id" component={LitterPage}/>
                                    </div></Router>)}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            );
        }
}
const mapState = state => {
     return {
         animal_id: state.user.animal_id
     }
}
const mapDispatch = dispatch => {
     return {
         getProfile: () => dispatch(getUserProfile()),
         getBreedsList: () => dispatch(getBreeds()),
         getUsersBreedsList: () => dispatch(getUsersBreeds()),
         getCitiesList: () => dispatch(getCities()),
         getPlaned: () => dispatch(getPlanedLitters())
     }
}
export default connect(mapState, mapDispatch)(MainPage);