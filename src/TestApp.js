import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Transition, config, animated } from 'react-spring'
import { Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import RegistrationPage from './components/RegistrationPage';
import HeaderBar from './components/HeaderBar.js';
import LoginPage  from './components/LoginPage';
import Error404 from './components/Error404';
import Dashboard from './components/Dashboard';
import NewEventMain from './components/Events/newEventMain';
import GuestEventForm from './components/Events/GuestEventForm';


import createHistory from 'history/createBrowserHistory';
import './styles.css';
const history = createHistory();

const Page = ({style, children}) => {
    <animated.div className="mainRoute" style={{ ...style, background: `#e6efef` }}>
        <div className="mainRouteItem">
         {children}
        </div>
   </animated.div>
}


  

const _homepage = <Page><LandingPage/></Page>;




export default class TestApp extends Component{
  
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
                    config={{
                        tension: 1, 
                        friction: 8,
                        restSpeedThreshold: 1,
                        restDisplacementThreshold: 0.01,
                        overshootClamping: true,
                      }}
                    keys={location.pathname.split('/').filter(a => a)[0]}
                    from={item => {
                        if (item !== 'dashboard'){
                            return({ transform: 'translateY(20px)', opacity: 0, overflow:'none'})
                        } else {
                            return({  opacity: 0 })
                        }
                    }}
                    enter={item => {
                        if (item !== 'dashboard'){
                            return({ transform: 'translateY(0px)', opacity: 1,overflow:'none'  })
                        } else {
                            return({  opacity: 1 })
                        }
                    }}
                      
                    leave={item => {
                        if (item !== 'dashboard'){
                            return({ transform: 'translateY(-20px)', opacity: 0 ,overflow:'none'})
                        } else {
                            return({  opacity: 0 })
                        }
                    }}>
                    {style => (
                        <Switch location={location}>
                        <Route exact path="/home" render={props => HomePage({...props, style})} />
                        <Route exact path="/login" render={props => Login_Page({ ...props, style })} />
                        <Route exact path="/register" render={props => RegisterPage({ ...props, style })} />
                        <Route exact path="/dashboard" render={props => DashboardPage({ ...props, style })} />
                      
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


const NavLink = props => (
  <li className="navItem">
    <Link {...props} style={{ cursor: 'pointer', color: 'inherit' }} />
  </li>
)
//
const HomePage = ({ style }) => (
  <animated.div className="mainRoute" style={{ ...style, background: `#efeee6` }}>
    <div className="mainRouteItem">
   <LandingPage />
    </div>
  </animated.div>
);

const RegisterPage = ({ style }) => (
    <animated.div className="mainRoute" style={{ ...style, background: `#efeee6` }}>
      <div className="mainRouteItem">
     <RegistrationPage />
      </div>
    </animated.div>
  );

  const Login_Page = ({ style }) => (
    <animated.div className="mainRoute" style={{ ...style, background: `#efeee6` }}>
      <div className="mainRouteItem">
       <LoginPage/>
      </div>
      
    </animated.div>
  )
  
  

const DashboardPage = ({ style }) => (
    <animated.div className="dashboardRoute" style={{ ...style, background: `#fbfaf4` }}>
      <div className="dashboardRouteItem">
     <Dashboard />
      </div>
      <Route
        render={({ location }) => (
          <div>
            <Transition
              native
              config={config.slow}
              keys={location.pathname}
              from={{ transform: 'translateY(500px)', opacity: 0 }}
              enter={{ transform: 'translateY(0px)', opacity: 1 }}
              leave={{ transform: 'translateY(500px)', opacity: 0 }}>
              {style => (
                <Switch location={location}>
                  <Route exact path="/dashboard/create-event" render={props => UltraRed({ ...props, style })} />
                </Switch>
              )}
            </Transition>
          </div>
        )}
      />
    </animated.div>
  )

const UltraRed = ({ style }) => (
  <animated.div className="subRoute" style={{ ...style, background: '#ef5350' }}>
    Ultra Red
  </animated.div>
)




