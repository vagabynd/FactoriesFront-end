import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import reducer from './reducer.js';
import AppView from './components/companies.js';
import React from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home.js';
import Phones from './components/phones.js';
import NotFound from './components/notfound.js';
import Navigation from './navigation.js';
import EditCompanyForm from './components/editCompanyForm';
import Company from './components/company';
import Phone from './components/phone';

const store = createStore(reducer);

store.dispatch({
    type: "SET_STATE",
    state: []
});

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Navigation />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/companies" component={AppView} />
                    <Route exact path="/phones" component={Phones} />
                    <Route exact path="/editCompany/:id" component={EditCompanyForm} />
                    <Route exact path="/companies/:id" component={Company} />
                    <Route exact path="/phones/:id" component={Phone} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById("root")
);

