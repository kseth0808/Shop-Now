import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function Navbar() {
  const navigate = useNavigate();
  const loginPage = () =>{
    navigate("/login")
  }
  return (
    
    <div className='navbar'>
      <Link to="/"><h3>Shop-now</h3></Link>
      <div className="link">
        <ul>
          <li>
            <Link to="/Home"> <FavoriteBorderIcon/> </Link>
            <Link to=""> <ShoppingCartOutlinedIcon/> </Link>
          </li>
        </ul>
        <button onClick={loginPage}>Login</button>
      </div>
    </div>
  );
}

export default Navbar;
