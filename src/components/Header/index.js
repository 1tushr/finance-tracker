import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "../../firebase"
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';



export default function Header() {
  const [user, loading] = useAuthState(auth);
const navigate=useNavigate();
useEffect(()=>{
  if(user){
    navigate("/dashboard");
  }
},[user,loading]);

const logoutFunc=()=>{
 try{
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    navigate("/")
  }).catch((error) => {
    // An error happened.
  });
 } 
 catch(e){
  console.log(e.message)

 }

    }

  return (
   <>
   <div className='navbar'>
    <p className='logo'>FundWise.</p>
    {user&& <p className='logo link'onClick={logoutFunc}>Logout</p>
}
       </div>
   </>
  )
}
