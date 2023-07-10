import React from 'react';
import Navbar from './Navbar';

function Home(props) {
  return (
    <>
      <Navbar />
      <div className='home'>
        <input type="search" placeholder='search items' />
        <div className="items">
        {props.imageList.map((URL) => (
        <img src={URL} key={URL} alt="Uploaded" />
      ))}
              <h3>Jacket</h3>
              <p>2000$</p>
            </div>
        </div>
    </>
  );
}

export default Home;
