
import { Schema as RedisSchema, Repository as RedisRepository, Entity, Repository } from 'redis-om';
import { createClient } from 'redis'
import { EntityId } from 'redis-om'

type PollInput = {
    pollTitle: String;
    pollOptions: String[];
}

interface PollInfo {
    pollId: String;
    pollTitle: String;
    pollOptions: String[];
}

/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL

export const connectRedis = async () => {
    const redis = createClient()
    redis.on('error', (err) => console.log('Redis Client Error', err));
    await redis.connect();

    const pollersSchema = new RedisSchema("Pollers", {
        pollId: { type: "string" },
        IPAdress: { type: "string" },
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

    const pollersRepository = new RedisRepository(pollersSchema, redis) 
    const optionsCountRepository = new RedisRepository(optionsCountSchema, redis) 

    return { pollersRepository, optionsCountRepository}
};

export default await connectRedis();
