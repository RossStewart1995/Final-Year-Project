import axios from "axios";

const API = axios.create({baseURL: "http://localhost:5000"});

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
})



export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

export const fetchPolls = () => API.get("/polls");
export const createPoll = (newPoll) => API.post("/polls", newPoll);
export const updatePoll = (id, updatedPoll) => API.patch(`/polls/${id}`, updatedPoll);
export const deletePoll = (id) => API.delete(`/polls/${id}`);
export const likePoll = (id) => API.patch(`/polls/${id}/likePoll`);

export const submitVote = (id, choice) => API.patch(`/polls/${id}/submitVote`, choice);

export const createPetition = (newPetition) => API.post("/petitions", newPetition);
export const fetchPetitions = () => API.get("/petitions");
export const submitSignature = (id, signature) => API.patch(`/petitions/${id}/submitSignature`, signature);