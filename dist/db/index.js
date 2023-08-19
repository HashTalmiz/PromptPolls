"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./prisma");
const createPoll = async (pollData) => {
    const newPoll = await prisma_1.prisma.poll.create({
        data: Object.assign({}, pollData)
    });
    return newPoll.id;
};
const addVote = async (pollId, IPAddress, pollOption) => {
};
const getPollInfo = async (pollId) => {
    const result = await prisma_1.prisma.poill.findUnique({
        where: {
            id: pollId,
        }
    });
    return result;
};
const getPollStats = async (pollId) => {
};
exports.default = {
    createPoll,
    getPollInfo,
    getPollStats,
    addVote
};
//# sourceMappingURL=index.js.map