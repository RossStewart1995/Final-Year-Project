import * as api from "../api";
import {CREATE_PETITION, FETCH_ALL_PETITIONS, SUBMIT_SIGNATURE} from "../constants/actionTypes";
import axios from "axios";
import {URL} from '../constants/endpoints';


const API = axios.create({baseURL: URL});

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
})

//Action Creators
export const getPetitions = () => async (dispatch) => {
    try{
        const {data} = await api.fetchPetitions();
        console.log(data)

        dispatch({type: FETCH_ALL_PETITIONS, payload: data});
    }catch(error){
        console.log(error);
    }
}

// export const createPetition = (petition) => async (dispatch) => {
//     try{
//         console.log(petition)
//         const {data} = await api.createPetition(petition);
//         console.log("Petition Data")
//         console.log(data);
//         dispatch({type: CREATE_PETITION, payload: data});
//     }catch(error){
//         console.log(error);
//     }
// }

export const createPetitionNew = (petition) => {
    return dispatch => {
        return API.post("/petitions", petition)
        .then(res => {
            dispatch(setPetition(res.data))
        })
        .catch(error => {
            throw error
        })
        .finally(()=>{

        });
    }
}

export const setPetition = data => ({
    type: CREATE_PETITION,
    payload: data
})

export const submitPetitionSignature = (id, signature) => async (dispatch) => {
    try{
        console.log("Petition ID")
        console.log(id)
        console.log("Signature Details")
        console.log(signature)

        const {data} = await api.submitSignature(id, signature);
        console.log("DATA");
        console.log(data);
        dispatch({type: SUBMIT_SIGNATURE, payload: data});
        console.log("done")
    }catch(error){
        console.log(error.message);
    }
}

export const submitPetitionSignatureNew = (id, signature) => {
    return dispatch => {
        return API.patch(`/petitions/${id}/submitSignature`, signature)
        .then(res => {
            dispatch(setSignature(res.data))
        })
        .catch(error => {
            throw error
        })
        .finally(() => {

        })
    }
}

export const setSignature = data => ({
    type: SUBMIT_SIGNATURE,
    payload: data}
)

