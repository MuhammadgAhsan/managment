import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Home from './Common/Home';
import About from './Common/About';
import Contact from './Common/Contacts';
import SignLogin from './Common/SignLogin';
// common user
import CommonPage from "./Common/CommonPage";



//main user
import AdminRegister from "./UserAdmin/AdminRegister";
import PatientRegister from "./UserAdmin/PatientRegister";
import DocotorRegister from "./UserAdmin/DocotorRegister";
import UserAdminMainPage from "./UserAdmin/UserAdminMainPage";
import Dashboard from "./UserAdmin/Dashboard";

// admin route
import AdminMainPage from "./Admin/AdminMainPage";
import AdminAllAppointments from "./Admin/AdminAllAppointments";
import AllDoctor from "./Admin/AllDoctor";
// MainPagePatient
import MainPagePatient from "./patient/MainPagePatient";
import AppointmentsTable  from './patient/AppointmentsTable';
import TakeAppointments  from "./patient/TakeAppointments";

// MainPage Docotor
import MainPageDoctor from "./doctor/MainPageDoctor";
import AppointmentFOrDoctor from "./doctor/AppointmentFOrDoctor";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* common routes*/}
        <Route path="/" element={<CommonPage/>}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/login" element={<SignLogin />}/>
          </Route>
{/* admin routes */}

<Route path="/admin" element={<AdminMainPage/>}>

          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About/>}/>
          <Route path="Contact" element={<Contact/>}/>
          <Route path="appointments" element={<AdminAllAppointments/>}/>
          <Route path="doctor" element={<AllDoctor/>}/>
          
          <Route path="Logout" element={<SignLogin />}/>
</Route>
{/* patient routes  */}

<Route path="/patient" element={<MainPagePatient/>}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About/>}/>
          <Route path="Contact" element={<Contact/>}/>
          <Route path="appointments" element={<AppointmentsTable/>}/>
          <Route path="take-appointments" element={<TakeAppointments/>}/>
          <Route path="Logout" element={<SignLogin />}/>
</Route>

{/* all docotor routes */}
<Route path="/doctor" element={<MainPageDoctor/>}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About/>}/>
          <Route path="Contact" element={<Contact/>}/>
          <Route path="appoinment" element={<AppointmentFOrDoctor/>}/>
          <Route path="Logout" element={<SignLogin />}/>
</Route>
{/* main admin Dashboard */}
         <Route path="/user" element={<UserAdminMainPage />}>
          <Route index element={<Dashboard/>} />
          <Route path="register" element={<AdminRegister />} />
          <Route path="doctor" element={<DocotorRegister/>} />
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="patient" element={<PatientRegister/>} />
   
        </Route>

    
      </Routes>
    </BrowserRouter>
  );
};

export default App;
