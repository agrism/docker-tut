const express = require('express');
const axios = require('axios');
const { connectDb } = require('./helpers/db');
const app = express();
const { host, port, db, authApiUrl} = require("./configuration");
const { default: mongoose } = require('mongoose');

const postSchema = new mongoose.Schema({
    name: String
});
const Post = mongoose.model("Post", postSchema);

const startServer = ()=>{
    app.listen(port, ()=>{
        console.log(`Started api service on port: ${port}`);
        console.log(`On host: ${host}`);
        console.log(`Our database ${db}`);

        const silance = new Post({name: "Silance"});
    
        console.log(silance)
        silance.save(function(err, savedSilence){
            if(err) return console.log(err);
            console.log('savedSilance with volumes!', savedSilence);
        })

        // Post.find(function(err,posts){
        //     if(err) return console.error(err);
        //     console.log("posts", posts);
        // })
    });
}

app.get('/test',(req, res)=>{
    res.send("Our api server is working correctly");
});

app.get('/api/testapidata', (req, res)=>{
    res.json({
        testwithapi: true
    });
});

app.get('/testwithcurrentuser', (req, res)=>{

    console.log('authApiUrl', authApiUrl+'/currentUser');
    axios.get(authApiUrl+ "/currentUser").then(response=>{
        res.json({
            testwithcurrentuser: true,
            currentUserFromAuth: response.data
        })
    });
});

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);