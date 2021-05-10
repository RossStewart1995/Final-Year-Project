import React from 'react';
import {Link} from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
import Banner from "../auth/Banner";

export default function Header() {
    return (
        <div>
        <header id="header">
            <Link to="/">
                <h1 className="title" >DG98 Voting App</h1>
            </Link>
            <AuthOptions></AuthOptions>
        </header>
        <Banner>

        </Banner>
        </div>
    )
}
