import { useSelector } from "react-redux/es/exports";
import { Outlet } from "react-router-dom"
import LogIn from "../LogIn/LogIn";

const PrivateRoutes = () => {
    // const { loged } = useAuth();
    const { loged } = useSelector(state => state.auth)

    return loged ? <Outlet/> : <LogIn/>


}

export default PrivateRoutes