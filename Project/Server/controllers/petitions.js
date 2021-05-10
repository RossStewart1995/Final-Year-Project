import Petitions from "../models/petitions.js";
import mongoose from "mongoose";

export const getPetitions = async (req, res) => {
    try{
        const petitions = await Petitions.find();
        res.status(200).json(petitions);
        console.log("Petitions gathered.")
    }catch(error){
        res.status(404).json({message: error.message});
    }
 };

export const createPetitions = async (req, res) => {
        const petition = req.body;
        const newPetition = new Petitions({...petition, creator: req.userId, createdAt: new Date().toISOString()});
    try{
        await newPetition.save();
        res.status(201).json(newPetition);
        console.log(`New Petition Added by: ${req.userId}`)
    }catch(error){
        res.status(409).json({message: error.message});
    }
};

export const submitSignature = async (req, res) => {
    console.log("BACKEND - submitSignature")
    const {petitionid} = req.params;
    const data = req.body;
    console.log(petitionid);
    console.log(data);

    if(!req.userId) return res.json({message: "User not authenticated"});

    if(!mongoose.Types.ObjectId.isValid(petitionid)) return res.status(404).send("No poll found matching this ID");

    const petition = await Petitions.findById(petitionid);
    console.log(petition)

    const index = petition.signatures.findIndex((obj) => obj.userid === String(req.userId));
    console.log(index)
    if(index === -1) {
        ///sign petition
        petition.signatures.push({userid: req.userId, petitionid: data.signatureDetails.petition_id, reason: data.signatureDetails.reason});
    }else{
        return res.json({message: "User already signed petition"});
    }

    const updatedPetition = await Petitions.findByIdAndUpdate(petitionid, petition, {new: true});

    res.json(updatedPetition);
 }