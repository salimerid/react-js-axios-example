import React from 'react';
import { Route, Redirect  } from 'react-router-dom';

import Main from './routes';
import Login from './routes/login';
import Header from './components/Header';
import Footer from './components/Footer';
import {ToastNotification} from './components/notification/ToastNotification';

class CheckValidateRoute extends React.Component {
    render() {
        if(sessionStorage.getItem('token')){
            return (
                <div>
                    <Header/>
                    <Main />
                    <Footer/>
                    <ToastNotification/>
                </div>
            )
        }else{
            return (
                <div>
                    <Route path="/login" exact component={Login} />
                    <Redirect to="/login"  />
                </div>
            )
        }
    }
}
export default CheckValidateRoute;