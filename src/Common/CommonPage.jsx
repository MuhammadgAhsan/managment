
import Topheader from './Topheader';
import { Outlet } from 'react-router-dom';

const CommonPage=()=>{
    return(<>
 
    <Topheader/>
    <div className="layout-wrap">
        <Outlet/>
       
    </div>

    
    </>)
}

export default CommonPage;