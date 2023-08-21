"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_om_1 = require("redis-om");
const redis_1 = require("redis");
/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL;
async function init() {
    const redis = (0, redis_1.createClient)();
    redis.on('error', (err) => console.log('Redis Client Error', err));
    await redis.connect();
    const pollersSchema = new redis_om_1.Schema("Pollers", {
        pollId: { type: "string" },
        IPAdress: { type: "string" },
        pollOption: { type: "number" }
    }, {
        dataStructure: 'HASH'
    });
    const optionsCountSchema = new redis_om_1.Schema("OptionsCount", {
        pollId: { type: "string" },
        pollOption: { type: "number" },
        count: { type: "number" }
    }, {
        dataStructure: 'HASH'
    });
    const pollersRepository = new redis_om_1.Repository(pollersSchema, redis);
    const optionsCountRepository = new redis_om_1.Repository(optionsCountSchema, redis);
    await pollersRepository.createIndex();
    await optionsCountRepository.createIndex();
    return { pollersRepository, optionsCountRepository };
}
const DB = await init();
exports.default = DB;
//# sourceMappingURL=redis.js.map