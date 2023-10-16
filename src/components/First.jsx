import React from 'react'
import { useNavigate } from 'react-router-dom'

function First() {
  const navigate = useNavigate();
  const seller = () =>{
    navigate("/Items")
  }
  const coustmer = () =>{
    navigate("/Home")
  }
  return (
    <div>
     <button onClick={seller}>seller</button>
     <button onClick={coustmer}>coustmer</button>
    </div>
  )
}

export default First
