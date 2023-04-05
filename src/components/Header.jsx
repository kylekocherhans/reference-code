import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";

const Header = () => {
    const authCtx = useContext(AuthContext);

    return (
        <header>
            <h1>Reference Code</h1>
            <nav>
                <NavLink to='/'><button>Home</button></NavLink>
                <NavLink to='/add'><button>Add Reference</button></NavLink>
                <button id="logout-btn" onClick={() => authCtx.logout()}>Logout</button>
            </nav>
        </header>
    );
};

export default Header;