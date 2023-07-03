import React from 'react'
import './styles.css'
export default function Header() {
    const logoutFunc=()=>{
        alert("logout")
    }
  return (
   <>
   <div className='navbar'>
    <p className='logo'>FundWise.</p>
    <p className='logo link'onClick={logoutFunc}>Logout</p>
   </div>
   </>
  )
}
