import React, { Component } from 'react';
import { Transition, animated } from 'react-spring'
import {connect} from 'react-redux';
import { Router, withRouter, Switch, Route, Redirect } from 'react-router-dom'

import  {fetchProtectedData} from './actions/Protected-Data';

//App components
import LandingPage from './components/HomePage/LandingPage';
import RegistrationPage from './components/HomePage/Register/RegistrationPage';
import HeaderBar from './components/ReusableComponents/HeaderBar.js';
import LoginPage  from './components/HomePage/LogIn/LoginPage';
import AboutPage from './components/HomePage/About/AboutPage';
import Dashboard from './components/Dashboard/Dashboard';
import NewEventMain from './components/EventCreation/newEventMain';
import GuestEventForm from './components/GuestVote/GuestEventForm';
import createHistory from 'history/createBrowserHistory';

import './styles.css';



const history = createHistory();

class App extends Component{
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
            <Route
            render={({ location, ...rest }) => (
                <div className="fill">
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <HeaderBar history={history}/>
                <div className="content">
                <Transition
                    native
                    config={ item=> {
                     
                        if (item === 'transform'){
                          return {
                            tension: 1, 
                            friction: 8,
    
                            restSpeedThreshold: 1,
                            restDisplacementThreshold: 0.001,
                            overshootClamping: true,
                            }
                        }
                        else{
                       
                            return {
                              tension: 1, 
                              friction: 6,
                              overshootClamping: true,
                          }
                        }
                      }
                       
                      }
                    keys={location.pathname.split('/').filter(a => a)[0]}
                    from={item => {
                      if (item === 'home' ||
                          item === 'register' || 
                          item === 'login'  || 
                          item === 'dashboard'  ||
                          item === 'about'){
                       
                            return({ transform: 'translate(80%,0)', opacity: 0})
                        } else  {
                            return({ transform: 'translate(0,100%)', opacity: 0 })
                        }
                    }}
                    enter={item => {
                      if (item === 'home' ||
                          item === 'register' || 
                          item === 'login'  || 
                          item === 'dashboard'  ||
                          item === 'about'){
                            return({ transform: 'translate(0,0)', opacity: 1  })
                        } else {
                            return({  transform: 'translate(0,0)',opacity: 1 })
                        }
                    }}

                    leave={item => {
                      if (item === 'home' || item === 'register' || item === 'login' || item === 'about' || item ==='edit-draft'){
                            return({ transform: 'translate(-80%,0)', opacity: 0 })
                        } if(item === 'create-event'){
                          let el = document.querySelector(".createEventRoute");
                          if(el !== null) {
                            el.classList.remove('notransform');
                            return({  transform: 'translate(-80%,0)', opacity: 0, })
                          }
                        }else {
                            return({  transform: 'translate(0,-100%)', opacity: 0, })
                        }
                    }}

                    onRest={(item, v) => {
                      if(item === 'create-event' || item === 'edit-draft'){
                      
                        let el = document.querySelector(".createEventRoute");
                        if(el !== null) {
                          el.style.transform='';
                          el.classList.add('notransform');
                        }
                        // console.log('ONREST el',el);
                      }
                      }}
                    >
                    {/* <Transition  {...transition} keys={location.pathname.split('/').filter(a => a)[0]}> */}
                    {style => (
                        <Switch location={location}>
                        <Route exact path="/home" render={ props =>{
                          
                          
                           return HomePage({...props, style})}

                          } />
                        <Route exact path="/about" render={props => About_Page({ ...props, style })} />
                        <Route exact path="/login" render={props => Login_Page({ ...props, style })} />
                        <Route exact path="/register" render={props => RegisterPage({ ...props, style })} />
                        <Route exact path="/dashboard" render={props => DashboardPage({ ...props, style })} />
                        <Route exact path="/create-event" render={props => CreateEventPage({ ...props, style })} />
                         <Route path="/guestevents/:eventId" render={props => GuestEventPage({ ...props, style })} />
                         <Route exact path="/edit-draft" render={(props) => {
                            //  console.log('APP JS props passes', location.state)
                             return Edit_Draft_Page({...props,style,...location})
                        }}/>
                    
                      
         
                        </Switch>
                    )}
                    </Transition>
                </div>
                </div>
            )}
            />
        </Router>
        )
    }
   }


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    router:state.router

  });

  export default withRouter(connect(mapStateToProps)(App));


// const NavLink = props => (
//   <li className="navItem">
//     <Link {...props} style={{ cursor: 'pointer', color: 'inherit' }} />
//   </li>
// )

const HomePage = ({ style,...props }) => (
  
  <animated.div className="mainRoute" style={{ ...style, background: `#fdfdfd` }}>
    <div className="mainRouteItem">
     <LandingPage />  
    </div>
  </animated.div>
);

const RegisterPage = ({ style }) => (
    <animated.div className="mainRoute bg2" style={{ ...style, background: `#fdfdfd` }}>
      <div className="mainRouteItem">
     <RegistrationPage />
      </div>
    </animated.div>
  );

  const Login_Page = ({ style }) => (
    <animated.div className="mainRoute bg" style={{ ...style, background: `#fdfdfd` }}>
      <div className="mainRouteItem">
       <LoginPage/>
      </div>
      
    </animated.div>
  )
  
  

const DashboardPage = ({ style }) => (
  <animated.div className="dashboardRoute" style={{ ...style, background: `#fdfdfd` }}>
  <div className="mainRouteItem">
     <Dashboard />
      </div>

    </animated.div>
  )

const CreateEventPage = ({ style }) => (
  <animated.div className="createEventRoute" style={{ ...style, background: `#fdfdfd` }}>
  
  <div className="mainRouteItem">
   <NewEventMain/>
   {/* <EventContainer/> */}
   </div>
  </animated.div>

)

const GuestEventPage = ({...props, style}) => (
    <animated.div  style={{ ...style, background: '#fdfdfd' }}>
     <div className="mainRouteItem" >
     <GuestEventForm {...props}/>
   
     </div>
    </animated.div>
  
  )


  const About_Page = ({...props, style}) => (
    <animated.div className="mainRoute bg-about" style={{ ...style, background: '#f7543f' }}>
     <div className="mainRouteItem" >
     <AboutPage/>
   
     </div>
    </animated.div>
  
  )

  const Edit_Draft_Page = ({...props, style,...location}) => (
    <animated.div className="createEventRoute"  style={{ ...style, background: '#fdfdfd' }}>
     <div className="mainRouteItem" >
     <NewEventMain {...location.state}/>
   
     </div>
    </animated.div>
  
  )


