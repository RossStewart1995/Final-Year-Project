import {FETCH_ALL, CREATE, CLEAR, UPDATE, DELETE, LIKE, VOTE} from "../constants/actionTypes";

const pollsReducer = (polls = [], action) => {
    switch (action.type) {
        case UPDATE:
            return polls.map((poll) => poll._id === action.payload._id ? action.payload : poll);
        case LIKE:
            return polls.map((poll) => poll._id === action.payload._id ? action.payload : poll);
        case VOTE:
            console.log(action.payload)
            return polls.map((poll) => poll._id === action.payload._id ? action.payload : poll);
        case FETCH_ALL: 
            return action.payload;
        case CREATE:
            return [...polls, action.payload];
        case DELETE:
            return polls.filter((poll) => poll._id !== action.payload);
        case CLEAR:
            return polls = [];
        
        default:
           return polls;
    }
}

export default pollsReducer
