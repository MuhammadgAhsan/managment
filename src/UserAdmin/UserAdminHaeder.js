import logo from '../assats/logo.webp'

import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
const UserAdminHaeder=()=>{
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
            {/* <div onClick={()=>routeHanel("/")}>
                Hospital Management System
            </div> */}
            <div>    </div>
            <div onClick={()=>routeHanel("dashboard")} className='ml-20'>
                Dasboard
            </div>
        </div>

    </div>
    
    <div className="right-side">
        <div onClick={()=>routeHanel('patient')}>Resgister Patients</div>
        <div onClick={()=>routeHanel("doctor")}>
            Resgister Doctors
        </div>
        <div  onClick={()=>routeHanel("register")}>
        Resgister Admin
        </div>
       
       
   
    </div>




    </div>

    </>)


}

export default UserAdminHaeder;