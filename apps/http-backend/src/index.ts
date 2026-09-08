//suuposed to initialise a http server

//i guess i can start it right from inde.ts

import express from 'express'

const  app = express();

app.use(express.json());

app.listen(3001,()=>{
    console.log("Listening at port 3001");
})