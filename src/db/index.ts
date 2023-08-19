import { Entity, EntityData } from "redis-om";
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

const addVote = async (pollId: string, IPAddress: string, pollOption: number) => {
    await redisDB.pollersRepository.save({
        pollId,
        IPAddress,
        pollOption
    });
    const vote = await redisDB.optionsCountRepository.search().where('pollId').eq(pollId).and('IPAddress').eq(IPAddress).return.all();
    if(vote.length !== 0) {
        const v = vote[0] as optionsCountSchema;
        v.count += 1;
        await redisDB.optionsCountRepository.save(v);
    } else {
        await redisDB.optionsCountRepository.save({
            pollId,
            pollOption,
            count: 1
        });
    }
}

const getPollInfo = async(pollId: string) => {
    const result: PollType = await prisma.poll.findUnique({
        where: {
          id: pollId,
        }
    });
    return result;
}

const getPollStats = async(pollId: string) => {
    
}


export default {
    createPoll,
    getPollInfo,
    getPollStats,
    addVote
}

