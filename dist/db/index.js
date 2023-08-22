"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./prisma");
const redis_1 = __importDefault(require("./redis"));
const createPoll = async (pollData) => {
    const newPoll = await prisma_1.prisma.poll.create({
        data: Object.assign({}, pollData)
    });
    return newPoll;
};
const addVote = async (pollId, IPAddress, pollOption) => {
    await redis_1.default.pollersRepository.save({
        pollId,
        IPAddress,
        pollOption
    });
    const vote = await redis_1.default.optionsCountRepository.search().where('pollId').eq(pollId).and('pollOption').eq(pollOption).return.all();
    let result;
    if (vote.length !== 0) {
        const v = vote[0];
        v.count += 1;
        result = await redis_1.default.optionsCountRepository.save(v);
    }
    else {
        result = await redis_1.default.optionsCountRepository.save({
            pollId,
            pollOption,
            count: 1
        });
    }
    return result;
};
const getPollInfo = async (pollId) => {
    const result = await prisma_1.prisma.poll.findUnique({
        where: {
            id: pollId,
        }
    });
    return result;
};
const getPollStats = async (pollId) => {
    const options = await redis_1.default.optionsCountRepository.search().where('pollId').eq(pollId).return.all();
    const result = {};
    options.forEach((AbstractOption) => {
        const option = AbstractOption;
        result[option.pollOption] = option.count;
    });
    return result;
};
exports.default = {
    createPoll,
    getPollInfo,
    getPollStats,
    addVote
};
//# sourceMappingURL=index.js.map