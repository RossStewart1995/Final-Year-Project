import {combineReducers} from "redux";

import posts from "./posts";
import auth from "./auth";
import polls from "./polls";
import petitions from "./petitions"

export default combineReducers({posts, auth, polls, petitions});