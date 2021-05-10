import React,{useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Polls from "./components/pages/Polls";
import ViewPolls from "./components/pages/ViewPolls";
import ViewPollResults from "./components/pages/ViewPollResults";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";

import "./style.css";


export default function App() {

    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    useEffect(() => {
        const checkLoggedIn = async () => {

            //hold the token
            let token = localStorage.getItem("auth-token");
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            
            //check for valid token from backend
            const tokenResponse = await Axios.post(
            "http://localhost:5000/users/tokenIsValid",
             null, 
             {headers: {"x-auth-token": token}}
            );
            
            //get user data from backend
            if(tokenResponse.data){
                const userResponse = await Axios.get(
                    "http://localhost:5000/users/",
                    {headers: {"x-auth-token": token},
                });

                //set the userData = to the user logged in
                setUserData({
                    token,
                    user: userResponse.data,
                })
            }
        };

        checkLoggedIn();
    }, []);

    return <>
    <BrowserRouter>
    <UserContext.Provider value={{userData, setUserData}}>
    <Header/>
    <div className="container">
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/polls" component={Polls}/>
            <Route path="/viewpolls" component={ViewPolls}/>
            <Route path="/viewresults" component={ViewPollResults}/>

        </Switch>
    </div>
    </UserContext.Provider>
    </BrowserRouter>
    </>;
}
