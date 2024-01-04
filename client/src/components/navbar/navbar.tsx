import React, { useState } from 'react'
import './navbar.scss';
import logo from "../../icons/logo.svg";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navbarOptions = [{
   onClick : () =>{},
    text: 'Home'
  },
  {
   onClick : () =>{},
    text: 'Weeks'
  },
  {
   onClick : () =>{},
    text: 'Videos'
  },
  {
   onClick : () =>{},
    text: 'Topics'
  },
  {
   onClick : () =>{},
    text: 'Assignments'
  },
  {
    onClick : () =>{},
     text: 'Notes'
   }]
  return (
    <div className="navbar">
      <img
        className="navbar-logo" src={logo} alt="" />
      <div className="navbar-options-container">
        {
          navbarOptions.map((navOption, index) => {
            return <button onClick={()=> setActiveIndex(index)} key={index} className={`navbar-option ${activeIndex === index && 'navbar-active-option'}`}>
              {navOption.text}
            </button>
          })
        }
      </div>
      <img className="navbar-avatar" src="https://img.freepik.com/premium-vector/avatar-graduate-student-icon-vector-illustration-flat-style-isolated-white_647193-1773.jpg?w=2000" alt="" />
    </div>
  )
}

export default Navbar