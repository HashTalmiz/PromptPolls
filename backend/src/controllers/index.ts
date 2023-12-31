import { NextFunction, Request, Response } from "express";
import DB from "../db/index"
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import * as z from "../utils/zodSchemas";
import { asyncHandler } from "../utils/errorHandling";
import requestIp from "request-ip";


export const createPoll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const clientIp = requestIp.getClientIp(req);
    const data = {...req.body, createdBy: clientIp};
    const result = z.zodSafeParse(z.zPollTypeSchema, data)
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
    const clientIP = requestIp.getClientIp(req);
    const id = req.query.pollId as string;
    if(!id) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: ReasonPhrases.BAD_REQUEST,
            msg: "Expected Poll ID"
        })
        return;
    }
    const pollInfoAndStats = await DB.getPollInfo(id);
    const hasVoted = await DB.hasAlreadyVoted({"pollId": id, "IPAddress": clientIP})
    res.status(StatusCodes.OK).json({...pollInfoAndStats, "hasVoted": hasVoted });
});

export const addVote = asyncHandler(async (req: Request, res: Response) => {
    const result = z.zodSafeParse(z.zPollersSchema, req.body);
    const pollsIO = req.app.get("pollsIO");
    if(!result.data) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: ReasonPhrases.BAD_REQUEST,
            msg: result.error
        })
        return;
    }
    const clientIP = requestIp.getClientIp(req);
    const data = {...result.data, "IPAddress": clientIP}

    const hasVoted = await DB.hasAlreadyVoted(data as pollersSchema);
    if(hasVoted !== null) {
        res.status(StatusCodes.FORBIDDEN).json({
            error: ReasonPhrases.FORBIDDEN,
            msg: "You have already voted!",
            pollOption: hasVoted.pollOption
        })
        return;
    }
    
    const newVote = await DB.addVote(data as pollersSchema);
    const newPollStats = await DB.getPollInfo(data.pollId);
    pollsIO.to(data.pollId).emit("pollStatsChange", newPollStats);
    res.status(StatusCodes.OK).json(newVote);
});

export const getMyPolls = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const clientIp = requestIp.getClientIp(req); 
    const allPolls = await DB.getCreatedPolls(clientIp);
    res.status(200).json(allPolls);
});
