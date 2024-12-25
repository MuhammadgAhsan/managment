
import UserAdminHaeder from './UserAdminHaeder';
import { Outlet } from 'react-router-dom';

const UserAdminMainPage=()=>{
    return(<>
 
    <UserAdminHaeder/>
    <div className="layout-wrap">
        <Outlet/>
       
    </div>

    
    </>)
}

export default UserAdminMainPage;