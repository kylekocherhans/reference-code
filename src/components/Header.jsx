import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";

const Header = () => {
    const authCtx = useContext(AuthContext);

    return (
        <div>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/add'>Add Reference</NavLink>
            <button className="logout-btn" onClick={() => authCtx.logout()}>Logout</button>
        </div>
    );
};

export default Header;