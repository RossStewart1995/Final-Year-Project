import * as api from "../api";
import {FETCH_ALL, CREATE, CLEAR, UPDATE, DELETE, LIKE, VOTE} from "../constants/actionTypes";
import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"});

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
})



//Action Creators
export const getPolls = () => async (dispatch) => {
    try{
        const {data} = await api.fetchPolls();

        dispatch({type: FETCH_ALL, payload: data});
    }catch(error){
        console.log(error);
    }
}

export const createPoll = (poll) => async (dispatch) => {
    try{
        const {data} = await api.createPoll(poll);
        console.log(data);
        dispatch({type: CREATE, payload: data});
    }catch(error){
        console.log(error);
    }
}

export const createPollNew = (poll) => {
    return dispatch => {
        return API.post("/polls", poll)
        .then(res => {
            dispatch(setNewPoll(res.data))
        })
        .catch(error => {
            throw error
        })
        .finally(() => {
            
        })
    }
}

export const setNewPoll = data => ({
    type: CREATE,
    payload: data

})

export const clearPoll = (polls) => async (dispatch) => {
        dispatch({type: CLEAR, payload: polls});
}

export const updatePoll = (id, poll) => async (dispatch) => {
    try{
        const {data} = await api.updatePoll(id, poll);
        dispatch({type: UPDATE, payload: data});
    }catch(error){
        console.log(error.message);
    }
}

export const deletePoll = (id) => async (dispatch) => {
    try{
        await api.deletePoll(id);
        dispatch({type: DELETE, payload: id})
    }catch(error){
        console.log(error)
    }
}

export const likePoll = (id, poll) => async (dispatch) => {
    try{
        const {data} = await api.likePoll(id, poll);
        dispatch({type: LIKE, payload: data});
    }catch(error){
        console.log(error);
    }
}

// export const submitVote = (id, choice) => async (dispatch) => {
//     try{
//         console.log("submit vote")
//         console.log(id)
//         const {data} = await api.submitVote(id, choice);
//         console.log("DATA");
//         console.log(data);
//         dispatch({type: VOTE, payload: data});
//         console.log("done")
//     }catch(error){
//         console.log(error.message);
//     }
// }

export const submitVoteNew = (id, choice) => {
    console.log(id)
    console.log(choice)
    return dispatch => {
        return API.patch(`/polls/${id}/submitVote`, choice)
        .then(res => {
            dispatch(setUserVote(res.data))
        })
        .catch(error => {
            throw error
        })
        .finally(()=>{

        });
    }
}

export const setUserVote = data => ({
    type: VOTE,
    payload: data
});