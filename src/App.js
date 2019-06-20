import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import CheckValidateRoute from './CheckValidateRoute';

class App extends Component {

    render() {
        return (
            <Switch >
              <Route path="/" exact component={CheckValidateRoute} />
              <Route path="/:param"  component={CheckValidateRoute}/>
            </Switch >
        );
    }
}

export default App;
