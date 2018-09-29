import React from 'react';
import Route from 'react-router-dom/Route';

import { spring,AnimatedSwitch} from 'react-router-transition';
import styled from 'styled-components';

import RegistrationPage from './components/RegistrationPage';
import LoginPage  from './components/LoginPage';
import LandingPage from './components/LandingPage';
import Error404 from './components/Error404';

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

function mapStyles(styles) {
    return {
    //   opacity: styles.opacity,
      transform: `translateX(${styles.offset}px)`,
    };
  }

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


export default () => (
  
  
      <AnimatedSwitch
       css={switchRule}
        {...pageTransitions}
        mapStyles={mapStyles}
      >    
           <Route exact path="/" component={LandingPage} />
           <Route exact path="/login" component={LoginPage} />
           <Route exact path="/register" component={RegistrationPage} />
          
      </AnimatedSwitch>
 

);