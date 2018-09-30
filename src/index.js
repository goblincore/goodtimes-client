import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TestApp from './TestApp';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './Store';



import {BrowserRouter as Router} from 'react-router-dom';
import Dashboard from './components/Dashboard';


ReactDOM.render(

    <Provider store={store}>
            <Router>
                    <TestApp />
            </Router>

    </Provider>, 

    document.getElementById('root')
);
registerServiceWorker();
