import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

function PageContain({ 
  children, 
  color, 
  background,
  location: {
    state,
  },
}) {
  const cx = classNames({
    page: true,
    'page--prev': state && state.prev,
  })
  return (
    <section 
      className={cx}
      style={{
        color,
        background,
      }}
    >
      <div className="page__inner">
        {children}
      </div>
    </section>
  );
}

PageContain.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  background: PropTypes.string,
};

PageContain.defaultProps = {
  color: '#333',
  background: '#ffffff',
};

export default withRouter(PageContain);