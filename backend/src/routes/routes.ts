import express from 'express';
import * as controller from "../controllers/index";
const router = express.Router();

router.post('/createPoll', controller.createPoll);

router.get('/getPoll', controller.getPoll);

router.post('/addVote', controller.addVote);

router.get('/me', controller.getMyPolls);

router.get('/test', (req, res) => {
    res.status(200).json({
        msg:"HI",
    })
});

export default router