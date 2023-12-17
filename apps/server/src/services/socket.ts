import {Server} from 'socket.io';

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
    }

    public initListener(){
        const io = this._io;
        console.log("Initializing Socket Listeners.....");

        io.on('connect', async socket => {
            console.log(`New Socket Connected`, socket.id);

            socket.on('event:message', async ({message}: {message: string}) => {
                console.log("Ne message recieved.", message);
            });
        });
    }

    get io(){
        return this._io;
    }
}

export default SocketService;