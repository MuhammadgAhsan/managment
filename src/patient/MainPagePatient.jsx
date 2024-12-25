
import Topheader from "./Topheader";
import { Outlet } from 'react-router-dom';

const MainPagePatient=()=>{
    return(<>
 
    <Topheader/>
    <div className="layout-wrap">
        <Outlet/>
       
    </div>

    
    </>)
}

export default MainPagePatient;