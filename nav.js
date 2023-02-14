import react from 'react';

import {Link} from 'react-router-dom';
const Nav=()=>{
    return(
<nav className="navbar navbar-expand-sm navbar-dark bg-light sticky-top p-1">
  <div className="container-fluid">

    <a className="navbar-brand text-dark" ><i className='fa fa-shopping-bag fa-lg '> </i> Medical Planet  </a>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse " id="mynavbar">
      <ul className="navbar-nav mx-auto">
        <li className="navbar-brand ">
          <Link  className="nav-link text-dark" to="/"> 
          <i className='fa fa-home fa-sm'> </i> Brand </Link>
        </li>

        <li className="navbar-brand">
          <Link className="nav-link text-dark" to="/category" >
             <i className='fa fa-lock fa-md'> </i> Category </Link>
        </li>
        <li className="navbar-brand">
          <Link className="nav-link text-dark" to="/product" >
             <i className='fa fa-lock fa-md'> </i> product </Link>
        </li>
      </ul>
    </div>
  </div>
  </nav>
    )
};
export default Nav;