import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { UserContext } from '../../contexts/user.context';

import { ReactComponent as OlivasLogo } from '../../assets/olivas-logo.svg';

import { signOutUser } from '../../utils/firebase/firebase.utils'

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import './navigation.styles.scss';
import { CartContext } from '../../contexts/cart.context';


 
const Navigation = () => {
  const {currentUser} = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <OlivasLogo className='logo'/>
            </Link>
            <div className='nav-links-container'>
              <Link className='nav-link' to='/shop'> 
                SHOP
              </Link>
              {currentUser ? (
                  <span className="nav-link" onClick={signOutUser}> 
                    SIGN OUT 
                  </span>
                ):( 
                  <Link className='sign-in' to='/auth'> 
                    SIGN IN 
                  </Link>
                )}
                <CartIcon />
            </div>
            { isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    )
  }

export default Navigation;