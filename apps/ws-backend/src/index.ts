//supposed to initialse the websocket server

//i was supposed to create server not ckient
// import WebSocket from "ws";
// const ws = new WebSocket("",{
// });
// ws.on('error',console.error);
// ws.on('open' , function open(){
//     ws.send('something');
// });
// ws.on('message' , function message(data){
//     console.log('received : %s'  , data);
// })

import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({port : 8080});

wss.on('connection' , function connection(ws , request){
    const url = request.url; //ws://localhost:3000?token=wojbvwjor
    if(!url){
        return;
    }

    //this URLsearchParams is a class
    const queryParams = new URLSearchParams(url.split('?')[1]); 
    const token = queryParams.get('token') || "";

    const decoded = jwt.verify(token , JWT_SECRET );

    if(typeof decoded == "string"){
        return;
    }

    if(!decoded || !(decoded as JwtPayload).userId){
        ws.close();
        return;
    }


    ws.on('error' , console.error);

    ws.on('message' , function message(data){
        console.log('received : %s' , data);
    });

    ws.send('something');
});