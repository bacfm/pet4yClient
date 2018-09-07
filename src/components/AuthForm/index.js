import React from 'react';
import LogIn from './login';
import SignUp from './signup';
import Activate from './activate';
import Confirm from './confirm-account';
import ResetPasswordForm from './reset';
import ConfirmPass from './confirm-pass';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './style.css';

const Admin = ({ match }) => {
    console.log(match);
    window.localStorage.setItem('token', match.params.token);
    window.location.pathname = '/';
    return (<div></div>)
}

export default function SignLogForm(){
    return (
        <Router>
            <div className='log-form'>
            <Route exact path ='/login' component={LogIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path = '/confirm' component={Confirm} />
            <Route exact path = '/account-activate' component={Activate} />
            <Route exact path = '/account/token=:token' component={Admin}/>
            <Route exact path = '/reset-password' component={ResetPasswordForm} />
            <Route exact path = '/confirm-password' component={ConfirmPass} />
            </div>
        </Router>
    );
}
