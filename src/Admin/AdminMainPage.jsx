
import Topheader from './Topheader';
import { Outlet } from 'react-router-dom';

const AdminMainPage=()=>{
    return(<>
 
    <Topheader/>
    <div className="layout-wrap">
        <Outlet/>
       
    </div>

    
    </>)
}

export default AdminMainPage;