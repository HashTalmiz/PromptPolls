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
        return;
    }
    const data = await DB.getPollInfo(id);
    if(!data) {
        return;
    }
    const stats = await DB.getPollStats(id);
    const op = data?.options;
    const newOptions: Array<Record<string, number>> = []
    for(let i = 0; i < op.length; i++) {
        if(!stats[i]) {
            stats[i] = 0;
        }
        newOptions.push({ 
            [op[i]]: stats[i] 
        });
    }
    const newData: any = data;
    newData.options = newOptions;
    res.status(StatusCodes.OK).json(newData);
});

export const addVote = asyncHandler(async (req: Request, res: Response) => {
    const result = z.zodSafeParse(z.zPollersSchema, req.body);
    if(!result.data) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: ReasonPhrases.BAD_REQUEST,
            msg: result.error
        })
        return;
    }

    const hasVoted = await DB.hasAlreadyVoted(result.data as pollersSchema);
    if(hasVoted !== null) {
        res.status(StatusCodes.FORBIDDEN).json({
            error: ReasonPhrases.FORBIDDEN,
            msg: "You have already voted!",
            pollOption: hasVoted.pollOption
        })
        return;
    }
    const json = await DB.addVote(result.data as pollersSchema);
    res.status(StatusCodes.OK).json(json);
});