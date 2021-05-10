import React, {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

export default function Login() {
    //state variables to hold logged in user
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const [error, setError] = useState();

    //function to backend
    const submitLoginDetails = async (e) => {
        e.preventDefault();

        try{
        const loginUser = {email, password};
        const loginResponse = await Axios.post(
            "http://localhost:5000/users/login",
            loginUser
        );

        setUserData({
            token: loginResponse.data.token,
            user: loginResponse.data.user_id,
            displayName: loginResponse.data.displayName
        });
        localStorage.setItem("auth-token", loginResponse.data.token);
        localStorage.setItem("user-id", loginResponse.data.user_id);
        localStorage.setItem("display-name", loginResponse.data.displayName);
        
        history.push("/");
    }catch(err){
        err.response.data.msg && setError(err.response.data.msg);
    };
    
    };


    return (
        <div className="login-page">
            <h2>Login</h2>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)}/>
            )}
            <form className="form" onSubmit={submitLoginDetails}>
                <label htmlFor="login-email">Email</label>
                <input id="login-email" type="email"
                onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password"
                onChange={(e) => setPassword(e.target.value)} 
                 />

                <input type="submit" value="Login" />
            </form>
        </div>
    )
}
