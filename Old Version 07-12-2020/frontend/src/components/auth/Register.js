import React, {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import ErrorNotice from "../misc/ErrorNotice";

export default function Register() {
    //state variables to hold logged in user
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const [error, setError] = useState();

    //function to backend
    const submitUserDetails = async (e) => {
        e.preventDefault();

        try{
        const newUser = {email, password, passwordCheck, displayName};

        await Axios.post(
            "http://localhost:5000/users/register",
            newUser
        );
        const loginResponse = await Axios.post(
            "http://localhost:5000/users/login",
            {email, password}
        );
        setUserData({
            token: loginResponse.data.token,
            user: loginResponse.data.user
        });
        localStorage.setItem("auth-token", loginResponse.data.token);
        history.push("/");

        }catch(err){
            err.response.data.msg && setError(err.response.data.msg);
        };
    };


    return (
        <div className="register-page">
            <h2>Register</h2>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)}/>
            )}
            <form className="form" onSubmit={submitUserDetails}>
                <label htmlFor="register-email">Email</label>
                <input id="register-email" type="email"
                onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password"
                onChange={(e) => setPassword(e.target.value)} 
                 />
                <input type="password" placeholder="Confirm Password" 
                onChange={(e) => setPasswordCheck(e.target.value)}/>

                <label htmlFor="register-displayname">Display Name</label>
                <input id="register-displayname" type="text"
                onChange={(e) => setDisplayName(e.target.value)}
                />

                <input type="submit" value="Register" />
            </form>
        </div>
    )
}
