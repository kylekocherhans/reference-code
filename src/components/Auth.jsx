import { useState, useContext } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";

const Auth = () => {
    const authCtx = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.trim().length === 0 || password.trim().length === 0) {
            alert('Invalid username or password');
            return;
        }

        const body = {
            username,
            password
        }

        const url = register ? '/register' : '/login';

        axios.post(url, body)
        .then(res => {
            console.log(res.data);
            authCtx.login(res.data.token, res.data.exp, res.data.userId);
        })
        .catch(err => {
            console.log(err);
            alert(err.response.data);
        });
    };

    return (
        <div>
            <h2>{register ? "Create an account" : "Log in to your account"}</h2>
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>{register ? "Create Account" : "Login"}</button>
            </form>
            <button onClick={() => setRegister(!register)}>
                Need to {register ? "Login" : "Sign Up"}?
            </button>
        </div>
    );
};

export default Auth;
