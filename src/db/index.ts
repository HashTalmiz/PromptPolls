import { Entity } from "redis-om";
import { prisma } from "./prisma"
import redis from "./redis";
import redisDB from "./redis"


const createPoll = async (pollData: PollType): Promise<String> => {
    const newPoll = await prisma.poll.create({
        data: {
            ...pollData
        }
    });
    return newPoll.id;
}

const addVote = async (pollId: String, IPAddress: String, pollOption: number) => {

}

const getPollInfo = async(pollId: String) => {
    const result: PollType = await prisma.poill.findUnique({
        where: {
          id: pollId,
        }
    });
    return result;
}

const getPollStats = async(pollId: String) => {
    
}


export default {
    createPoll,
    getPollInfo,
    getPollStats,
    addVote
}

