
import { Schema as RedisSchema, Repository as RedisRepository, Entity, Repository } from 'redis-om';
import { createClient } from 'redis'
import { EntityId } from 'redis-om'


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

    const pollersRepository = new RedisRepository(pollersSchema, redis);
    const optionsCountRepository = new RedisRepository(optionsCountSchema, redis);

    await pollersRepository.createIndex();
    await optionsCountRepository.createIndex();


    return { pollersRepository, optionsCountRepository}
};

export default await connectRedis();
