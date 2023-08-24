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

const addVote = async (data: pollersSchema) => {
    await redisDB.pollersRepository.save(data);
    const vote = await redisDB.optionsCountRepository.search().where('pollId').eq(data.pollId).and('pollOption').eq(data.pollOption).return.all();
    let result;
    if(vote.length !== 0) {
        const v = vote[0] as optionsCountSchema;
        v.count += 1;
        result = await redisDB.optionsCountRepository.save(v);
    } else {
        result = await redisDB.optionsCountRepository.save({
            pollId: data.pollId,
            pollOption: data.pollOption,
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

const hasAlreadyVoted = async(data: pollersSchema) => {
    const vote = await redisDB.pollersRepository.search().where('pollId').eq(data.pollId).and('IPAddress').eq(data.IPAddress).return.all();
    if(vote.length === 0) {
        return null;
    }
    return vote[0];
}

export default {
    createPoll,
    getPollInfo,
    getPollStats,
    addVote,
    hasAlreadyVoted
}

