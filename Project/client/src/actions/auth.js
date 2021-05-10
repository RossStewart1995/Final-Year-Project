import {AUTH} from "../constants/actionTypes";
import {SIGN_IN, SIGN_UP} from "../constants/endpoints";
import axios from "axios";
import Dotenv from 'dotenv';

Dotenv.config();

//Action Creators
// export const signIn = (formData, history) => async (dispatch) => {
//     try{
//         //sign in the user
//         const {data} = await api.signIn(formData);

//         dispatch({type: AUTH, data});
        
//         history.push("/");
//     }catch(error){
//         console.log("Error Occured")
//         console.log(error);
//     }
// }

// export const signUp = (formData, history) => async (dispatch) => {
//     try{
//         //sign up the user
//         const {data} = await api.signUp(formData);

//         dispatch({type: AUTH, data});

//         history.push("/");
//     }catch(error){
//         console.log(error);
//     }
// }

export const signInNew = (formData, history) => {
    return dispatch => {
        return axios.post(SIGN_IN, formData)
        .then(res => {
            dispatch(setUserProfile(res.data));
            history.push("/");
        })
        .catch(error => {
            throw error
        })
        .finally(()=>{

        });
    }
};

export const signUpNew = (formData, history) => {
    return dispatch => {
        return axios.post(SIGN_UP, formData)
        .then(res => {
            dispatch(setUserProfile(res.data));
            history.push("/");
        })
        .catch(error => {
            throw error
        })
        .finally(()=>{

        });
    }
};

export const setUserProfile = data => ({
    type: AUTH,
    data
});
