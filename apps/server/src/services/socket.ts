import {Server} from 'socket.io';
import Redis from 'ioredis';

// import * as IORedis from 'ioredis';

// const pub = new IORedis({
//     host: "redis-960e789-barson0habra-7e01.a.aivencloud.com",
//     port: "18581",
//     username: "default",
//     password: "AVNS_YX__p4r3LdqnBmBK3Ug"
// });

// const sub = new IORedis({
//     host: "redis-960e789-barson0habra-7e01.a.aivencloud.com",
//     port: "18581",
//     username: "default",
//     password: "AVNS_YX__p4r3LdqnBmBK3Ug"
// });

const redisConfig = {
    host: "redis-960e789-barson0habra-7e01.a.aivencloud.com",
    port: 18581,
    username: "default",
    password: "AVNS_YX__p4r3LdqnBmBK3Ug"
};

const pub = new Redis(redisConfig);
const sub = new Redis(redisConfig);


class SocketService{
    private _io: Server;

    constructor(){
        console.log("Init Socket Service.....");
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            },
        });
        sub.subscribe('MESSAGES');
    }

    public initListener(){
        const io = this._io;
        console.log("Initializing Socket Listeners.....");

        io.on('connect', async socket => {
            console.log(`New Socket Connected`, socket.id);

            socket.on('event:message', async ({message}: {message: string}) => {
                console.log("Ne message recieved.", message);
                //publish this message to redis
                await pub.publish("MESSAGES", JSON.stringify({message}));
            });
        });

        sub.on('message', (channel, message) => {
            if (channel === message) {
                io.emit("message", message);
            }
        });
    }

    get io(){
        return this._io;
    }
}

export default SocketService;