import logo from '../assats/logo.webp'

import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
const Topheader=()=>{
    const naviagte=useNavigate()

    const routeHanel=(url)=>{

        naviagte(url)

    }



return(<>
    
    <div className="wrap-top-header">
       <div className="left-side">

     
        <div  className="logo">
            <div className='logo-wrap-img'>
            <img src={logo} alt="logo"/>
            </div>
            <div onClick={()=>routeHanel("/")}>
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
       
        
        <div onClick={()=>routeHanel('login')}>
            Login
        </div>
       
   
    </div>




    </div>

    </>)


}

export default Topheader;