import logo from '../assats/logo.webp'

import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
const Topheader=()=>{
    const naviagte=useNavigate()

    const routeHanel=(url)=>{
        if(url==="login"){
            const userId = localStorage.removeItem("userId"); 
            naviagte("/")
            return;
        }
        else{
            naviagte(url)
        }
     

    }



return(<>
    
    <div className="wrap-top-header">
       <div className="left-side">

     
        <div  className="logo">
            <div className='logo-wrap-img'>
            <img src={logo} alt="logo"/>
            </div>
            <div onClick={()=>routeHanel("home")}>
                Hospital Management System
            </div>
        </div>
        
        <div onClick={()=>routeHanel("about")}>
            About Us
        </div>
        <div onClick={()=>routeHanel('contact')}>
            Contact Us
        </div>

    </div>
    
    <div className="right-side">
        {/* <div onClick={()=>routeHanel('patient')}>View Patients</div> */}
        <div onClick={()=>routeHanel("doctor")}>
            View Doctors
        </div>
        <div onClick={()=>routeHanel('appointments')}>
            Check All Appointments
        </div>
      
        <div onClick={()=>routeHanel('login')}>
            Logout
        </div>
   
    </div>




    </div>

    </>)


}

export default Topheader;