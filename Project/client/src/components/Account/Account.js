import React, {useEffect, useState} from 'react';
import {Avatar, Button, Grow, Paper, Grid, Typography, Container} from "@material-ui/core";
import decode from "jwt-decode";
import {useHistory, useLocation} from "react-router-dom";
import {LOGOUT, CLEAR} from "../../constants/actionTypes";
import {useDispatch} from "react-redux";
import { useSnackbar } from 'notistack';
import useStyles from "./styles";


const Account = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    const handleLogout = () => {
        try{
            dispatch({ type: LOGOUT })
            enqueueSnackbar("Timed out, Account logged out", {
              variant: 'info'
          });
          }catch(error){
            enqueueSnackbar(`Logout Failed`, {
              variant: 'error'
            });
            throw error;
          }
        dispatch({type: CLEAR});
        history.push("/auth");
    };

    useEffect(() => {
        console.log(user);
        const token = user?.token;
        if(!localStorage.getItem("profile")){
            dispatch({type: CLEAR});
            history.push("/auth");
        } 
        if(token){
            const decodedToken = decode(token);
            console.log(decodedToken);
        if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [dispatch, location]);

    

    return (
        <>
            <Grow in>
                <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper} elevation={3}>
                        <Typography> 
                            Email: {user.result.email}
                        </Typography>
                        <Typography> 
                            Full Name: {user.result.name}
                        </Typography> 
                        <Typography> 
                            User ID: {user.result._id}
                        </Typography> 
                        <Typography>
                            Account Type: {user.result.type}
                        </Typography>
                    </Paper>
                </Container>
            </Grow>
        </>
    )
}

export default Account
