import Redis from 'ioredis';

let redisClient: Redis | null = null;

const isRedisEnabled = process.platform !== 'win32' && process.env.REDIS_ENABLED === 'true';

if (isRedisEnabled) {
    redisClient = new Redis({
        host: 'localhost',
        port: 6379,
    });

    redisClient.on('connect', () => {
        console.log('Connected to Redis server');
    });

    redisClient.on('error', (err: any) => {
        console.error('Redis connection error:', err);
    });
}

export default redisClient;