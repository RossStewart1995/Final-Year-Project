 import Polls from "../models/polls.js";
 import mongoose from "mongoose";
 
 export const getPolls = async (req, res) => {
    try{
        const polls = await Polls.find();
        res.status(200).json(polls);
    }catch(error){
        res.status(404).json({message: error.message});
    }
 };

 export const createPolls = async (req, res) => {
     const poll = req.body;
     const newPoll = new Polls({...poll, creator: req.adminId, createdAt: new Date().toISOString()});
    try{
        await newPoll.save();
        res.status(201).json(newPoll);
    }catch(error){
        res.status(409).json({message: error.message});
    }
 };

 export const updatePolls = async (req, res) => {
    const { pollid: _id } = req.params;
    const poll = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No poll found matching this ID");

    const updatedPoll = await Polls.findByIdAndUpdate(_id, {...poll, _id}, {new: true});

    res.json(updatedPoll);
 };

 export const deletePoll = async (req, res) => {
    const {pollid} = req.params;

    if(!mongoose.Types.ObjectId.isValid(pollid)) return res.status(404).send("No poll found matching this ID");

    await Polls.findByIdAndRemove(pollid);

    res.json({message: "Poll deleted."})
 }

 export const likePoll = async (req, res) => {
    const {pollid} = req.params;

    if(!req.userId) return res,json({message: "Unathenticated"});

    if(!mongoose.Types.ObjectId.isValid(pollid)) return res.status(404).send("No poll found matching this ID");

    const poll = await Polls.findById(pollid);

    const index = poll.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        poll.likes.push(req.userId);
    }else{
        poll.likes = poll.likes.filter((id) => id !== String(req.userId));
    }


    const updatedPoll = await Polls.findByIdAndUpdate(pollid, poll, {new: true});

    res.json(updatedPoll);
 }

 export const submitVote = async (req, res) => {
    const {pollid} = req.params;
    const data = req.body;
    console.log(data.choice.poll_id);
    console.log(data.choice.poll_choice);
    console.log(data.choice.user_id);

    if(!req.userId) return res.json({message: "User not authenticated"});
    

    if(!mongoose.Types.ObjectId.isValid(pollid)) return res.status(404).send("No poll found matching this ID");

    const poll = await Polls.findById(pollid);
    
    const index = poll.votes.findIndex((obj) => obj.userid === String(req.userId));
    console.log(index)
    if(index === -1) {
        ///vote on post
        poll.votes.push({userid: req.userId, pollid: data.choice.poll_id, choice: data.choice.poll_choice});
    }else{
        return res.json({message: "User already voted"});
    }
    
    const updatedPoll = await Polls.findByIdAndUpdate(pollid, poll, {new: true});


    res.json(updatedPoll);
 }