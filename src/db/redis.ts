
import { Schema as RedisSchema, Repository as RedisRepository } from 'redis-om';
import { createClient } from 'redis'
import { EntityId } from 'redis-om'


/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL
const redis = createClient()
async function init() {
    redis.on('error', (err) => console.log('Redis Client Error', err));
    await redis.connect();
}

const pollersSchema = new RedisSchema("Pollers", {
    pollId: { type: "string" },
    IPAddress: { type: "string" },
    pollOption : { type: "number" }
}, {
    dataStructure: 'HASH'
})

const optionsCountSchema = new RedisSchema("OptionsCount", {
    pollId: { type: "string" },
    pollOption: { type: "number" },
    count : { type: "number" }
}, {
    dataStructure: 'HASH'
})

const pollersRepository = new RedisRepository(pollersSchema, redis);
const optionsCountRepository = new RedisRepository(optionsCountSchema, redis);

(async () => {
    try {
        await init();
        await pollersRepository.createIndex();
        await optionsCountRepository.createIndex();
    } catch (e) {
        console.log("Error connecting to or creating indexes in redis");
    }
})();


export default { pollersRepository, optionsCountRepository };