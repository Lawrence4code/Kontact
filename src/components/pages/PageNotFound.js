import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div>
      <h3> The page you are looking is not available, something may have gone wrong, Please click for <Link to='/'> HomePage</Link> </h3>
    </div>
  )
}

export default PageNotFound;