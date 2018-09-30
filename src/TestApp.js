import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Transition, config, animated } from 'react-spring'
import { Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import RegistrationPage from './components/RegistrationPage';
import HeaderBar from './components/HeaderBar.js';
import LoginPage  from './components/LoginPage';
import Error404 from './components/Error404';



import createHistory from 'history/createBrowserHistory';
import './styles.css';
const history = createHistory();

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
                    config={{ tension: 1, friction: 10 }}
                    keys={location.pathname.split('/').filter(a => a)[0]}
                    from={{ transform: 'translateX(100%)', opacity: 1 }}
                    enter={{ transform: 'translateX(0px)', opacity: 1 }}
                    leave={{ transform: 'translateX(-100%)', opacity: 1 }}>
                    {style => (
                        <Switch location={location}>
                        <Route path="/home" render={props => Red({ ...props, style })} />
                        <Route path="/login" render={props => Green({ ...props, style })} />
                      
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
//#4bc8fd
const Red = ({ style }) => (
  <animated.div className="mainRoute" style={{ ...style, background: `#e6efef` }}>
    <div className="mainRouteItem">
   <LandingPage />
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
                <Route exact path="/red/ultra" render={props => UltraRed({ ...props, style })} />
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

const Green = ({ style }) => (
  <animated.div className="mainRoute" style={{ ...style, background: `#e6efef` }}>
    <div className="mainRouteItem">
     <LoginPage/>
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
                <Route exact path="/green/ultra" render={props => UltraGreen({ ...props, style })} />
              </Switch>
            )}
          </Transition>
        </div>
      )}
    />
  </animated.div>
)

const UltraGreen = ({ match: { params }, style }) => (
  <animated.div className="subRoute" style={{ ...style, background: `#388E3C` }}>
    Ultra Green
  </animated.div>
)