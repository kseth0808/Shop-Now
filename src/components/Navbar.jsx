import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Auth } from 'firebase/auth';

function Navbar() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false); 
  const loginPage = () => {
    navigate("/login");
  };

  const Seller = () => {
    navigate("/Items");
  };

  return (
    <div className='navbar'>
      <Link to="/"><h3>Shop-now</h3></Link>
      <div className="link">
        <ul>
          <li>
            <Link to="/"> <FavoriteBorderIcon/> </Link>
            <Link to="/"> <ShoppingCartOutlinedIcon/> </Link>
          </li>
        </ul>
        {!isAuth ? (
          <Link to="Login">Login</Link>
        ) : (
          <>
            <Link to="/CreatePost">CreatePost</Link>
            <button onClick={Seller}>Become a Seller</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;