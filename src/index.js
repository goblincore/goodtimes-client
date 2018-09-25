import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './Store';
import { CreateEvent } from './components/CreateEvent';


import {BrowserRouter as Router} from 'react-router-dom';


ReactDOM.render(

    <Provider store={store}>

             <CreateEvent />

            <Router>
                    <App />
             </Router>

    </Provider>, 

document.getElementById('root'));
registerServiceWorker();
