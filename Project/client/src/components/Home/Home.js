import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {Grow} from "@material-ui/core";
import {CLEAR} from "../../constants/actionTypes";
import useStyles from "./styles";
import '../Polls/grid.css'

import AccountNavCard from "../NavCards/AccountNavCard";
import PollsNavCard from "../NavCards/PollsNavCard";
import CreatePetitionNavCard from "../NavCards/CreatePetitionNavCard";
import ViewPetitionsNavCard from "../NavCards/ViewPetitionNavCard";
import LogoutNavCard from "../NavCards/LogoutNavCard";

const Home = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if(!localStorage.getItem("profile")){
            dispatch({type: CLEAR});
            history.push("/auth");
        }
    }, [dispatch])
    return (
        <>
        <div className={classes.title}>
            Welcome! <br/> {user ? user.result.name : ""}
        </div>

        <div class="items">
            <PollsNavCard />
            <CreatePetitionNavCard />
            <ViewPetitionsNavCard />
            <AccountNavCard />  
            <LogoutNavCard />
        </div>
        </>
    )
}

export default Home
