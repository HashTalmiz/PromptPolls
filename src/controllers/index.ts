import { Request, Response } from "express";
import DB from "../db/index"
import { zPollersSchema, zPollTypeSchema } from "../utils/zodSchemas";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';


export const createPoll = async (req: Request, res: Response) => {
    //const result = zPollTypeSchema.safeParse(req.body);
    // if(!result.success) {
    //     res.status(StatusCodes.BAD_REQUEST).json({
    //         error: ReasonPhrases.BAD_REQUEST,
    //         msg: "Expected title and poll options"
    //     })
    // }
    const poll: PollType = req.body;
    const newPoll = await DB.createPoll(poll);
    res.status(200).json(newPoll);
}

export const getPoll = async (req: Request, res: Response) => {
    const id = req.body.pollId;
    if(!id) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: ReasonPhrases.BAD_REQUEST,
            msg: "Expected Poll ID"
        })
    }
    const data = await DB.getPollInfo(id);
    const stats = await DB.getPollStats(id);
    const result = {...data, ...stats};
    res.status(StatusCodes.OK).json(result);
}

export const addVote = async (req: Request, res: Response) => {
    //const result = zPollersSchema.safeParse(req.body);
    // if(!result.success) {
    //     res.status(StatusCodes.BAD_REQUEST).json({
    //         error: ReasonPhrases.BAD_REQUEST,
    //         msg: "Incorrect body"
    //     })
    // }

    const result = req.body
    await DB.addVote(result.pollId, result.IPAddress, result.pollOption);
}