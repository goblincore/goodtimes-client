import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './Store';
import { CreateEvent } from './components/CreateEvent';


import {BrowserRouter as Router} from 'react-router-dom';
import Dashboard from './components/Dashboard';


ReactDOM.render(

    <Provider store={store}>
            <Router>
                    <App />
            </Router>

    </Provider>, 

    document.getElementById('root')
);
registerServiceWorker();
