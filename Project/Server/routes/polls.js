import express from "express";
import {getPolls, createPolls, updatePolls, deletePoll, likePoll, submitVote} from "../controllers/polls.js";
import adminAuth from "../middleware/adminAuth.js";
import auth from "../middleware/auth.js";

const router = express.Router();  

router.get("/", getPolls);
router.post("/", auth, createPolls);
router.patch("/:pollid", updatePolls);
router.delete("/:pollid", deletePoll);
router.patch("/:pollid", likePoll);

router.patch("/:pollid/submitVote", auth, submitVote);



export default router;