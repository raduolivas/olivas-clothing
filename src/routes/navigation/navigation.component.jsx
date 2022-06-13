import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { UserContext } from '../../contexts/user.context';

import './navigation.styles.scss';

import { ReactComponent as OlivasLogo } from '../../assets/olivas-logo.svg'
 
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <OlivasLogo className='logo'/>
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'> Shop</Link>
                <Link className='sign-in' to='/auth'> Signin </Link>
            </div>
        </div>
        <Outlet />
      </Fragment>
    )
  }

export default Navigation;