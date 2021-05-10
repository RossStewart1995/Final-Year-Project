import React,  {useContext} from 'react';
import { useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function AuthOptions() {

    const {userData, setUserData} = useContext(UserContext);

    const history = useHistory();

    const register = () => {
        history.push("/register");
    };
    const login = () => {
        history.push("/login");
    };
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
        localStorage.setItem("user-id", "");
        localStorage.setItem("display-name", "");
        history.push("/");
    };

    return (
        //check for a logged in user and display correct buttons
        
        <nav className="auth-options">
        {userData.user ? (
            <>
            <p className="display-name">Welcome: {localStorage.getItem("display-name")}</p>
            <button onClick={logout}>Log Out</button>
            </>
            ) : (
              <>
                <button onClick={register}>Register</button>
                <button onClick={login}>Log In</button>
              </>
            )}            
        </nav>
        
    );
}
