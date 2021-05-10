const router = require("express").Router();
const Vote = require("../models/voteModel")

//create the vote
router.post("/createvote", async (req, res) => {
    try{
    //create variables
        let {question, description, responses} = req.body;

    //Check if data has been entered in required fields
    if(!question || !responses)
    return res
    .status(400)
    .json({ msg: "Not all fields have been filled in."})

    //Create Election
    const newVote = new Vote({
        question,
        description,
        responses
    });

//Store the vote for later use
    const savedVote = await newVote.save();
    res.json(savedVote);

}catch(err){
    res.status(500).json({error: err.message});
}

});

//post users response to vote into the DB
router.post("/postresponse", async (req, res) => {
    
    const {voteID, _userID, userChoice} = req.body;

    try{
    //find vote that matches
    const vote = await Vote.findOneAndUpdate({_id: voteID},
        {
            $addToSet: {
                responses:{
                    name: userChoice,
                    userID: _userID,
                }
            }
        });
        if(!vote)
        return res
        .status(400)
        .json({ msg: "Vote matching this ID could not be found."});

    res.json(vote);

}catch(err){
    res.status(500).json({error: err.message});
}

});



module.exports = router;