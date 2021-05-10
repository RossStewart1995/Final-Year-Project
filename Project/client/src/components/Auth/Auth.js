import React, {useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import {GoogleLogin} from "react-google-login";
import Icon from "./icon";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {AUTH} from "../../constants/actionTypes";
import {signInNew, signUpNew} from "../../actions/auth"

import { useSnackbar } from 'notistack';


import Input from "./Input";

const initialState = {firstName: "", lastName: "", email: "", password: "", confirmPassword: ""};

const Auth = () => {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);


    const handleShowPassword = () => setShowPassword(!showPassword);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignUp){
            dispatch(signUpNew(formData, history)).then(() => {
                enqueueSnackbar("User Created and Logged In!", {
                    variant: 'success'
                });
            }).catch((error) => {
                enqueueSnackbar(`Uh-Oh Something went wrong`, {
                    variant: 'error'
                });
                throw error;
            })
            
        }else{
            dispatch(signInNew(formData, history)).then(() => {
                enqueueSnackbar("Login Successful!", {
                    variant: 'success'
                });
            }).catch((error) => {
                enqueueSnackbar(`Login Failed: Check credentials and try again`, {
                    variant: 'error'
                });
                throw error;
            })
        }
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false);
    };


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try{

            dispatch({type: AUTH, data: {result, token}});

            history.push("/");

        }catch(error){
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log("Google Sign In failed.")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                        <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                        </>
                            )}

                            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/> 
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                            { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} > {isSignUp ? "Sign Up" : "Sign In"}</Button>

                    <GoogleLogin  
                        clientId="619163240990-3545rvqn6i56q7o7fuk4vlqp56b4u4q9.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                            Sign In with Google</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                        />

                    
                    <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>{isSignUp ? "If you have already created an account. Click here to sign in." : "If you do not already have an account. Click here to sign up."}</Button>
                            </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
