import {CREATE_PETITION, FETCH_ALL_PETITIONS, SUBMIT_SIGNATURE} from "../constants/actionTypes";

const petitionsReducer = (petitions = [], action) => {
    switch (action.type) {
        case CREATE_PETITION:
            return [...petitions, action.payload];
        case FETCH_ALL_PETITIONS: 
            return action.payload;
        case SUBMIT_SIGNATURE:
            return petitions.map((petition) => petition._id === action.payload._id ? action.payload : petition);
        default:
           return petitions;
    }
}

export default petitionsReducer
