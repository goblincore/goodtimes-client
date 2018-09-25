import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './Store';
import { CreateEvent } from './components/CreateEvent';



ReactDOM.render(

    <Provider store={store}>
             <CreateEvent />
    </Provider>, 

document.getElementById('root'));
registerServiceWorker();
