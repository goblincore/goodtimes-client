import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import DashboardRoutes from './DashboardRoutes';
import HomepageRoutes from './HomepageRoutes';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import NewEventMain from './components/Events/newEventMain'
import HeaderBar from './components/HeaderBar.js';
import  {fetchProtectedData} from './actions/Protected-Data';
import Error404 from './components/Error404';
import RegistrationPage from './components/RegistrationPage';
import LoginPage  from './components/LoginPage';
// import Router from 'react-router-dom/BrowserRouter';
import { spring,AnimatedRoute, AnimatedSwitch} from 'react-router-transition';
import styled from 'styled-components';
import Transitions from './transitions';
import createHistory from 'history/createBrowserHistory';
import { homePage, loginPage, registrationPage } from './Page';
import Page from './Page';


import {Route, withRouter, Router, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import { 
  CSSTransition, 
  TransitionGroup 
} from 'react-transition-group';


import SuccessfullyCreatedEvent from './components/Events/SuccessfullyCreatedEvent';
import GuestEventForm from './components/Events/GuestEventForm';

// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
const supportsHistory = 'pushState' in window.history;
const switchRule = styled.div`
  position: relative;
  & > div {
    position: absolute;
  }
`;

const routeRule = styled.div`
  position: relative;
  & > div {
    position: absolute;
    width: 100%;
  }
`;

function glide(val) {
  return spring(val, {
    stiffness: 174,
    damping: 24,
  });
}

function slide(val) {
  return spring(val, {
    stiffness: 125,
    damping: 16,
  });
}

const topBarTransitions = {
  atEnter: {
    offset: -100,
  },
  atLeave: {
    offset: slide(-150),
  },
  atActive: {
    offset: slide(0),
  },
};

const pageTransitions = {
  atEnter: {
    offset: 100,
  },
  atLeave: {
    offset: glide(-100),
  },
  atActive: {
    offset: glide(0),
  },
};

const emptyTransitions = {
  atEnter: {
    
  },
  atLeave: {
   
  },
  atActive: {
   
  },
};

const history = createHistory();

class App extends Component {


  componentWillMount(){
    if(localStorage.getItem('authToken')){
       this.props.dispatch(fetchProtectedData());
    } else {
      return;
    }
  }

  render() {

   
    
    return (
      <Router history={history}>
       <div className="App">
           <HeaderBar history={history} />
          <div className="app" lang="en">
                          <Route render={({ location }) => (
                      <div>
                      
                     
                          {/* <AnimatedSwitch
                            css={switchRule}
                            {...pageTransitions}
                            // runOnMount={location.pathname === '/'}
                            mapStyles={styles => ({
                              transform: `translateX(${styles.offset}%)`,
                            })}
                          >
                            <Route exact path="/" component={LandingPage} />
                            <Route exact path="/login" component={LoginPage} />
                            <Route exact path="/register" component={RegistrationPage} />
                            <Route  component={DashboardRoutes} />
                            </AnimatedSwitch> */}
                      
                          
                          {/* <Route component={Error404}/> */}

                    <Transitions pageKey={location.key} {...location.state}>
                      <Switch location={location}>
                          <Route path='/login' component={loginPage} />
                          <Route path='/register' component={registrationPage} />
                          <Route exact path='/' component={homePage} />
                          {/* <Redirect from='/' to='/' /> */}
                             {/* <Route exact path="/" component={LandingPage} />
                            <Route exact path="/login" component={LoginPage} />
                            <Route exact path="/register" component={RegistrationPage} /> */}
                      </Switch>
                    </Transitions>
                        
                       
                       
                      </div>
                    )} />


                     
                  
                     
                        
                       
                       
                        {/* <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/create-event" component={NewEventMain} />
                        <Route exact path="/guestevents/:eventId" component={GuestEventForm} /> */}
                      
                    
               
                

       
       
               
               
            
              </div>
        </div>
      </Router>
    );
  }


}

//  export default App;


const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
