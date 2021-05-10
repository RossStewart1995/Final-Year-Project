const router = require("express").Router();
const Poll = require("../models/pollsModel");
const PollChoices = require("../models/pollChoicesModel");
const PollResults = require("../models/pollResultsModel");

//create the poll
router.post("/createpoll", async (req, res) => {
    try{
    //create variables
        let {title, description} = req.body;

    //Check if data has been entered in required fields
    if(!title || !description)
    return res
    .status(400)
    .json({ msg: "Not all fields have been filled in."})

    //Create Election
    const newPoll = new Poll({
        title,
        description,
    });

    //Store the vote for later use
    const savedPoll = await newPoll.save();
    res.json(savedPoll);

}catch(err){
    res.status(500).json({error: err.message});
}

});

//create the polls choices
router.post("/poll_choices", async (req, res) => {
    try{
    //create variables
        let {poll_id, choiceName, orderNum} = req.body;

    //Check if data has been entered in required fields
    if(!poll_id || !choiceName)
    return res
    .status(400)
    .json({ msg: "Not all fields have been filled in."})

    //Create Election
    const newPollChoice = new PollChoices({
        poll_id,
        orderNum,
        choiceName,
    });

//Store the vote for later use
    const savedPollChoice = await newPollChoice.save();
    res.json(savedPollChoice);

}catch(err){
    res.status(500).json({error: err.message});
}

});

//find the correct poll and corresponding choices
router.get("/get_poll", async (req, res) => {
    try{
    //create variables
    let {pollID} = req.body;

    //Check for exisiting poll in DB
    const existingPoll = await Poll.find({_id: pollID});
    if(!existingPoll)
        return res
        .status(400)
        .json({ msg: "A poll with this ID does not exist"});

    //Check for exisiting choices for the poll
    const existingPollChoice = await PollChoices.find({poll_id: pollID}).sort({orderNum: 1});
    if(!existingPollChoice)
        return res
        .status(400)
        .json({ msg: "choices matching this pollID do not exist"});

        res.json({existingPoll, existingPollChoice});

    }catch(err){
        res.status(500).json({error: err.message});
    }
});

//take users choice and store it
router.post("/store_poll_result", async (req, res) => {
    try{
    //create variables
    let {choice_id, user_id} = req.body;

    //Check for exisiting user in DB
    const user = await User.findOne({_id: user_id});
    if(!user)
        return res
        .status(400)
        .json({ msg: "A user with this ID does not exist"});

    //Check for exisiting choices for the poll
    const choice = await PollChoices.findOne({_id: choice_id});
    if(!choice)
        return res
        .status(400)
        .json({ msg: "choices matching this ID do not exist"});

        //store users selection
        const newResult = {poll_id: choice.poll_id};
        
        res.json(newResult);

    }catch(err){
        res.status(500).json({error: err.message});
    }
});

//get the poll and how many votes have been made
router.get("/count_all_votes", async (req, res) => {
    try{
    //create variables
    let {poll_id} = req.body;

    //Check for exisiting poll in DB
    let numOfVotes = await PollResults.countDocuments({poll_id: poll_id});
    if(!numOfVotes)
        return res
        .status(400)
        .json({ msg: "No Votes for this poll"});
    
        res.json({numOfVotes});

    }catch(err){
        res.status(500).json({error: err.message});
    }
});

//get all polls
router.get("/get_all_polls", async (req,res) => {
    try{
    //create variables

    //Check for exisiting poll in DB
    let polls = await Poll.find();
    //let numOfPolls = await Poll.countDocuments();
    
        res.json({polls});

    }catch(err){
        res.status(500).json({error: err.message});
    }
});

// get all polls, WIP
router.get("/get_poll_with_choices", async (req, res) => {
    try{
    //create variables
    let {pollID} = req.body;

    //Check for exisiting poll in DB
    const existingPoll = await Poll.find({_id: pollID});
    if(!existingPoll)
        return res
        .status(400)
        .json({ msg: "A poll with this ID does not exist"});

    //Check for exisiting choices for the poll
    const existingPollChoice = await PollChoices.find({poll_id: pollID});
    if(!existingPollChoice)
        return res
        .status(400)
        .json({ msg: "choices matching this pollID do not exist"});

        res.json({existingPoll, existingPollChoice})

    }catch(err){
        res.status(500).json({error: err.message});
    }
});

//get how many votes have been made for a choice.
router.get("/get_vote_count", async (req, res) => {
    try{
    //create variables
    let {poll_id, choice_id} = req.body;

    //Check for exisiting poll in DB
    let numOfVotes = await PollResults.countDocuments({poll_id: poll_id, choice_id: choice_id});
    
        res.json({numOfVotes});

    }catch(err){
        res.status(500).json({error: err.message});
    }
});

//gets each poll and the choices
router.get("/get_all_polls_and_choices", async (req, res) => {
    //Check for exisiting poll in DB
    let polls = await Poll.find();
    let choices = await PollChoices.find().sort({orderNum: 1});
    let allDetails = [];
    polls.map((poll, i) => {
        let rightChoice = [];
        choices.map((choice, i) => {
            if(poll.id != choice.poll_id){
            }else{
                rightChoice.push(
                    {
                        name: choice.choiceName,
                        id: choice._id,
                        poll_id: poll._id
                })
            }
        });

        if (rightChoice && rightChoice.length) {    
            allDetails.push(
                {
                poll_id: poll.id,
                title: poll.title,
                description: poll.description,
                choices: rightChoice
                })
         } else { 
             
         } 
    });
    console.log(allDetails)

    res.json({polls: allDetails})
});

module.exports = router;