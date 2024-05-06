import { BadRequestException, Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { REDIS_CLIENT, RedisClient } from './redis-client.type';
import { SetRedisDto } from './dto/set-redis.dto';


@Injectable()
export class RedisService implements OnModuleDestroy{
  constructor(@Inject(REDIS_CLIENT)private readonly redisClient:RedisClient,){

  }
 
  onModuleDestroy() {
    this.redisClient.quit()
  }

  ping(){
    return this.redisClient.ping()
  }

  async set(setRedisDto:SetRedisDto):Promise<string>{
 const{key,value}=setRedisDto;
 const keyExists=await this.redisClient.exists(key);
 console.log(keyExists);
 if(keyExists){
  throw new BadRequestException('Bunday OTP mavjud')
 }
 await this.redisClient.set(key,value,{EX:10});

 return `set value to Redis:${value}`
  }

async get (key:string):Promise<string>{
  // console.log(await this.redisClient.)
  const retrievedValue=await this.redisClient.getDel(key);

  return `Get value from Redis:${retrievedValue}`
}

 
}
