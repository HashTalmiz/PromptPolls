import { NextFunction, Request, Response } from "express";
import DB from "../db/index"
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import * as z from "../utils/zodSchemas";
import { asyncHandler } from "../utils/errorHandling";
import requestIp from "request-ip";

export const createPoll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const clientIp = requestIp.getClientIp(req); 
    const result = z.zodSafeParse(z.zPollTypeSchema, req.body)
    if(result.error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            reason: ReasonPhrases.BAD_REQUEST,
            error: result.error.issues,
        })
        return;
    }
    const poll = result.data as PollType;
    const newPoll = await DB.createPoll(poll);
    res.status(200).json(newPoll);
});

export const getPoll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
});

export const addVote = asyncHandler(async (req: Request, res: Response) => {
    //const result = zPollersSchema.safeParse(req.body);
    // if(!result.success) {
    //     res.status(StatusCodes.BAD_REQUEST).json({
    //         error: ReasonPhrases.BAD_REQUEST,
    //         msg: "Incorrect body"
    //     })
    // }

    const result = req.body
    const json = await DB.addVote(result.pollId, result.IPAddress, result.pollOption);
    res.status(StatusCodes.OK).json(json);
});