import { FactoryProvider } from '@nestjs/common';
import { createClient } from 'redis';
import { REDIS_CLIENT, RedisClient } from './redis-client.type';

export const redisClientFactory: FactoryProvider<Promise<RedisClient>>={
provide :REDIS_CLIENT,
useFactory  :async()=>{
    const client =createClient({
        url: "redis://default:SugHXHFxJP1Gg4TgpGQyCDwbGM1bPN26@redis-17074.c266.us-east-1-3.ec2.redns.redis-cloud.com:17074"
    })

    await client.connect();
    return client;
}
}

