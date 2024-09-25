import {Router as router } from "express";

const Router= router();

Router.get('/random',(req,res)=>{
    res.status(200).send({message:"insomnia gets me"});
})

// cors check (debug use)
Router.get('/',(req,res)=>{
    res.status(200).send({message:"wassup from backend"});
})

Router.post('/', async (req,res)=>{
    const data= await req.body;
    if(data)
    {
        console.log(data.name);
        res.status(200).send({message:"data received"});
    }
    else{
        res.status(400).send({message:"no data sent"});
    }
})

export default Router;