import express from 'express'
import amqplib from 'amqplib'
import { validate } from 'email-validator';

const app = express();
const port=3000
app.use(express.json());
const queue = 'tasks';

let ch2;



async function connectMQ(){
    const conn = await amqplib.connect('amqp://localhost:5672');
    ch2 = await conn.createChannel();
}

app.post('/users',async (req,res)=>{
    console.log(req.body)
    if(!(req.body.name&&req.body.email&&req.body.age)){
        res.status(400).send('Enter all fields')
        return
    }
    if(!validate(req.body.email)){
        res.status(400).send('Enter a correct Email Address')
        return
    }
    
    ch2.sendToQueue(queue, Buffer.from(JSON.stringify(req.body)));
    res.status(200).send('Success');
})

connectMQ();
app.listen(port,()=>{
    console.log('server listening');
})