import React, {Component} from 'react';
import MainPage from './components/MainPage';
import KindOfActivity from './components/ChooseKind/index';
import SignLogForm from './components/AuthForm';
import {connect} from 'react-redux';
import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import {getUserProfile} from "./api/index"
import './App.css';

class App extends Component {
    
    render() {
        if (!window.localStorage.token || window.localStorage.token === 'undefined') {
            if(window.location.pathname === '/login' || window.location.pathname === '/signup' || window.location.pathname ==='/reset-password' || window.location.pathname === '/confirm' || window.location.pathname === "/confirm-password" || window.location.pathname === '/account-activate/' || window.location.pathname.includes('/account/token')){
                return (<div className="App"><SignLogForm/></div>)
            }
            return (
                <Router>
                    <div className="App">
                        <Redirect to="/login"/>
                        <Route path="/login" component={SignLogForm}/>
                    </div>
                </Router>
            )
        } else if (this.props.user.animal_id === 0) {
            if (window.location.pathname === '/choose-type') {
                return (<div className="App"><KindOfActivity/></div>)
            }
            return (
                <Router>
                    <div className="App">
                        <Redirect to="/choose-type"/>
                        <Route path="/choose-type" component={KindOfActivity}/>
                    </div>
                </Router>
            )

        } else {
            if(window.location.pathname === '/'){
                return (<div className="App"><MainPage/></div>)
            }
                return (
                    <Router>
                        <div className="App">
                            <Route  path='/' component={MainPage}/>
                        </div>
                    </Router>
                )
            }
        }

    }

const mapState = state => {
    return {
        user: state.user
    }
}
const mapDispatch = dispatch => {
    return {
        getUser: () => dispatch(getUserProfile())
    }
}
export default connect(mapState, mapDispatch)(App);
