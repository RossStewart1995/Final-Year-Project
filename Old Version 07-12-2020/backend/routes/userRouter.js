const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");

//testing router
router.get("/test", (req, res) => {
    res.send("Hello, it's working");
});

//Register a new user - ROUTE
router.post("/register", async (req, res) => {
    try{
   
    //create variables
    let {email, password, passwordCheck, displayName} = req.body;
    

    //VALIDATION
    //Check if data has been entered in required fields
    if(!email || !password || !passwordCheck)
    return res
    .status(400)
    .json({ msg: "Not all fields have been filled in."})

    //Check if password meets required length
    if(password.length < 8)
    return res
    .status(400)
    .json({ msg: "Password not accepted as it does not meet length requirements"});

    //Check if password and passwordCheck match
    if(password !== passwordCheck)
    return res
    .status(400)
    .json({ msg: "Passwords do not match"});

    //Check for exisiting user in DB
    const existingUser = await User.findOne({email: email});
    if(existingUser)
        return res
        .status(400)
        .json({ msg: "An account with this email already exists"});

    //Check for display name
    if(!displayName) displayName = email;

    //Hash Password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        
    //Create User
        const newUser = new User({
            email,
            password: passwordHash,
            displayName
        });

    //Store the user for later use
        const saveduser = await newUser.save();
        res.json(saveduser); 

    }catch(err){
        res.status(500).json({error: err.message});
    }
});


//Log in a user - ROUTE
router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;


        //validation to ensure password and email are not blank
    if(!email || !password)
    return res
    .status(400)
    .json({ msg: "Not all fields have been filled in."});

    //find user that matches email
    const user = await User.findOne({email: email});
    if(!user)
    return res
    .status(400)
    .json({ msg: "Account matching this email could not be found."});

    //check password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)
    return res
    .status(400)
    .json({ msg: "Invalid Log-In Credentials."});


    //issue JSON web token to logged in user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
        token,
        user_id: user._id,
        displayName: user.displayName,
    })

    }catch(err){
        res.status(500).json({error: err.message});
    }
});


//Deleting a user from our database.
router.delete("/delete", auth, async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});


//check for a valid token
router.post("/tokenIsValid", async (req, res) => {
    try{
        const token = req.header("x-auth-token");
        if(!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if(!user) return res.json(false);

        //If all check pass then, token is valid
        return res.json(true);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});


//get logged in user
router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        displayName: user.displayName,
        id: user._id,
    });
});
module.exports = router;