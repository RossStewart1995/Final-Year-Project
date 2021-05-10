import React,  {useContext, useEffect} from 'react';
import { useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Banner() {

    const history = useHistory();

    const {userData} = useContext(UserContext);
    
    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            history.push("/login");
        }
    });
    
    const polls = () => {
        history.push("/polls");
    };

    const viewPolls = () => {
        history.push("/viewpolls");
    };

    const viewResults = () => {
        history.push("/viewresults");
    };

    return (
        //check for a logged in user and display correct buttons
        
        <nav className="banner">
        {userData.user ? (
            <>
            <button onClick={polls}>Create Polls</button>
            <button onClick={viewPolls}>View Polls</button>
            <button onClick={viewResults}>View Results</button>
            </>
            ) : (
              <></>
            )}            
        </nav>
        
    );
}
