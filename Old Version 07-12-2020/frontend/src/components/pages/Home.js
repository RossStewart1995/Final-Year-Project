import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";


export default function Home() {
    let history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            history.push("/login");
        }
    });

    return (
        <div className="register-page">
            Home Page
        </div>
    )
}
