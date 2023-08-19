import { Request, Response } from "express";
import db from "../db/index"


export const createPoll = async (req: Request, res: Response) => {
    const poll: PollType = req.body
        
}