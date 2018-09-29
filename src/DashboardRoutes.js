import React from 'react';
import Route from 'react-router-dom/Route';

import { spring,AnimatedSwitch} from 'react-router-transition';
import styled from 'styled-components';

import Dashboard from './components/Dashboard';
import NewEventMain from './components/Events/newEventMain';
import GuestEventForm from './components/Events/GuestEventForm';
import Error404 from './components/Error404';

const switchRule = styled.div`
  position: relative;
  & > div {
    position: absolute;
  }
`;


function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    // transform: `translateX(${styles.offset}px)`,
  };
}

function glide(val) {
  return spring(val, {
    stiffness: 174,
    damping: 19,
  });
}

const pageTransitions = {
  atEnter: {
    // offset: 200,
    opacity: 0,
  },
  atLeave: {
    // offset: glide(-100),
    opacity: glide(0),
  },
  atActive: {
    // offset: glide(0),
    opacity: glide(1),
  },
};

export default () => (
  
  
      <AnimatedSwitch
        css={switchRule}
        {...pageTransitions}
       
        mapStyles={mapStyles}
       
      >
          <Route exact path="/dashboard" component={Dashboard} />
           <Route exact path="/create-event" component={NewEventMain} />
           <Route exact path="/guestevents/:eventId" component={GuestEventForm} />
           <Route component={Error404}/>
      </AnimatedSwitch>
 

);