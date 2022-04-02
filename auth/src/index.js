const express = require('express');
const { connectDb } = require('./helpers/db');
const axios = require('axios');
const app = express();
const { host, port, db, apiUrl} = require("./configuration");


const startServer = ()=>{
    app.listen(port, ()=>{
        console.log(`Started auth service on port: ${port}`);
        console.log(`On host: ${host}`);
        console.log(`Our database ${db}`);
    });
}

app.get('/test',(req, res)=>{
    res.send("Our auth server is working correctly");
});

app.get("/api/currentUser", (req, res)=>{
    res.json({
        id: "1234",
        email: "foo@gmail.com"
    });
})

app.get('/testwithapidata', (req, res)=>{
    // res.json({
    //     apiUrl: apiUrl
    // });
    axios.get(apiUrl + "/testapidata").then((response)=>{
        res.json({
            testapidata: response.data.testwithapi
        });
    });
})

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);