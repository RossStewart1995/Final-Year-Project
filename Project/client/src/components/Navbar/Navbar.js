import React, {useState, useEffect} from "react";
import {AppBar, Typography, Toolbar, Button} from "@material-ui/core";
import useStyles from "./styles";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {LOGOUT, CLEAR} from "../../constants/actionTypes";
import decode from "jwt-decode";


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



import poll from "../../images/poll.png"

const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();


    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        dispatch({type: LOGOUT});
        dispatch({type: CLEAR});
        history.push("/auth");
    };

    const handleNavToPolls = () => {
        handleClose();
        if(location.pathname !== "/poll"){
            dispatch({type: CLEAR});
            history.push("/poll");
        }
        
    };

    const handleNavToMyAccount = () => {
        handleClose();
        if(location.pathname !== "/account"){
            dispatch({type: CLEAR});
            history.push("/account");
        }
        
    };

    const handleClear = () => {
        if(location.pathname !== "/"){
            dispatch({type: CLEAR});
        }
    }

    useEffect(() => {
        console.log(user);
        const token = user?.token;

        if(token){
            const decodedToken = decode(token);
            console.log(decodedToken);

        if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));

    }, [dispatch, location, user]);


    return (
        <>
        <AppBar className={classes.appBar} position="static" color="inherit">

                <div className={classes.brandContainer}>
                <img className={classes.image} src={poll} alt="memories" height="60" />
                <Typography component={Link} to="/" onClick={handleClear} className={classes.heading} variant="h4" align="center">DG98 Voting App</Typography>
                </div>
                

                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div>
                        
                        <Button aria-controls="simple-menu" variant="contained" aria-haspopup="true" onClick={handleClick}>
                                                        Navigation
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleNavToPolls}>View Polls</MenuItem>
                          <MenuItem onClick={handleNavToMyAccount}>My account</MenuItem>
                          <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                        </div>
                        
                    ) : (
                        <div>
                        </div>
                    )}
                </Toolbar>
        </AppBar>
        
            

        </>
    )
}

export default Navbar
