import { Entity } from "redis-om";
import { prisma } from "./prisma"

import redisDB from "./redis"


const createPoll = async (pollData: PollType) => {
    const newPoll: PollType = await prisma.poll.create({
        data: {
            ...pollData
        }
    });
    if(newPoll === null) {
        //throw error
        return;
    }
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
    const pollInfo: PollType | null = await prisma.poll.findUnique({
        where: {
          id: pollId,
        }
    });
    if(pollInfo === null) {
        // throw some custom error
        return;
    }
    const options = await redisDB.optionsCountRepository.search().where('pollId').eq(pollId).return.all();
    const accumulatedVotes = {};
    options.forEach((AbstractOption) => {
        const option = AbstractOption as optionsCountSchema;
        accumulatedVotes[option.pollOption] = option.count;
    });
    const op = pollInfo.options;
    const newOptions: OptionType[] = []
    for(let i = 0; i < op.length; i++) {
        if(!accumulatedVotes[i]) {
            accumulatedVotes[i] = 0;
        }
        newOptions.push({
            "title": op[i],
            "count":  accumulatedVotes[i]
        });
    }
    const newData: any = pollInfo;
    newData.options = newOptions;
    return newData as PollStats;
}


const hasAlreadyVoted = async(data) => {
    const vote = await redisDB.pollersRepository.search().where('pollId').eq(data.pollId).and('IPAddress').eq(data.IPAddress).return.all();
    if(vote.length === 0) {
        return null;
    }
    const existingEntry: votedInfo = {
        pollId: vote[0].pollId as string,
        pollOption :vote[0].pollOption as number
    }
    return existingEntry;
}

const getCreatedPolls = async(ip: string) => {
    const pollInfo: PollType[] | null = await prisma.poll.findMany({
        where: {
          createdBy: ip,
        }
    });
    if(pollInfo === null) {
        // throw some custom error
        return;
    }
    return pollInfo;
}

export default {
    createPoll,
    getPollInfo,
    addVote,
    hasAlreadyVoted,
    getCreatedPolls
}

