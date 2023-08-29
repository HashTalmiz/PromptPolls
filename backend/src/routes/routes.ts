import express from 'express';
import * as controller from "../controllers/index";
import { Server as SocketIOServer, Socket } from 'socket.io';
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

// const createNamespaceRouter = (io: SocketIOServer) => {
//     const router = express.Router();

//     router.post('/createPoll', controller.createPoll);

//     router.get('/getPoll', controller.getPoll(io));

//     router.post('/addVote', controller.addVote);

//     return router;
// };

// export default createNamespaceRouter;

export default router