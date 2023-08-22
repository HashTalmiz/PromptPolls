import { Entity } from "redis-om";
import { prisma } from "./prisma"

import redisDB from "./redis"


const createPoll = async (pollData: PollType): Promise<Entity> => {
    const newPoll = await prisma.poll.create({
        data: {
            ...pollData
        }
    });
    return newPoll;
}

const addVote = async (pollId: string, IPAddress: string, pollOption: number) => {
    await redisDB.pollersRepository.save({
        pollId,
        IPAddress,
        pollOption
    });
    const vote = await redisDB.optionsCountRepository.search().where('pollId').eq(pollId).and('pollOption').eq(pollOption).return.all();
    let result;
    if(vote.length !== 0) {
        const v = vote[0] as optionsCountSchema;
        v.count += 1;
        result = await redisDB.optionsCountRepository.save(v);
    } else {
        result = await redisDB.optionsCountRepository.save({
            pollId,
            pollOption,
            count: 1
        });
    }
    return result;
}

const getPollInfo = async(pollId: string) => {
    const result: PollType | null = await prisma.poll.findUnique({
        where: {
          id: pollId,
        }
    });
    return result;
}

const getPollStats = async(pollId: string) => {
    const options = await redisDB.optionsCountRepository.search().where('pollId').eq(pollId).return.all();
    const result = {};
    options.forEach((AbstractOption) => {
        const option = AbstractOption as optionsCountSchema;
        result[option.pollOption] = option.count;
    });
    return result;
}


export default {
    createPoll,
    getPollInfo,
    getPollStats,
    addVote
}

