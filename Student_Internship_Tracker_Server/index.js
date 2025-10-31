import express from 'express';

import {connectDB} from "./configs/dbConfig.js";


const app = express();

app.get("/", (request,response)=>{
    response.send("test express");
    console.log("get request processed");
});

app.listen(4400,()=>{
    connectDB();
    console.log("express server started");
});