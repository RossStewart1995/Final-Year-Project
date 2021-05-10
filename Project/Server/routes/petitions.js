import express from "express";
import {createPetitions, getPetitions, submitSignature} from "../controllers/petitions.js"
import adminAuth from "../middleware/adminAuth.js";
import auth from "../middleware/auth.js";

const router = express.Router();  

router.post("/", auth, createPetitions);
router.get("/", getPetitions);
router.patch("/:petitionid/submitSignature", auth, submitSignature);

export default router;