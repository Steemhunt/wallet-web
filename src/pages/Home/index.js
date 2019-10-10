import React, { useEffect } from 'react';
import { scrollTop } from 'utils/scroller';

const Home = props => {
  useEffect(() => {
    scrollTop();
  }, []);
  return <div className="home"></div>;
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
