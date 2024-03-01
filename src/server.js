import express from "express";
import { Message } from "./Message.class.js";

const app = express();

const port = 3090;

let messages = []

app.use(express.json())
let retornarTudo = () =>{
    return messages
}

let createMessage = (name,content) => {
    
  const newMessage = new Message(name,content)
  messages.push(newMessage)
  return newMessage
}
let updateMessage = (id,content) => {
    const message = messages.findIndex(message => message.id === id )
    const updatedMessage = messages[message].content == content 
    return updatedMessage
  }

  let deleteMessage = id => {
    const message = messages.findIndex(message => message.id === id )
    const deletedMessage =  messages.splice(messages[message],1)
    return deletedMessage
  }
app.get('/messages',(req,res)=>{
    const allMessages = retornarTudo()
    res.status(201).json({allMessages})
})

app.post('/create-message',(req,res)=>{
    const {name,content } = req.body;
    const newMessage = createMessage(name,content)
    res.status(201).json({message:'Messagem criada com sucesso!',newMessage})
})
app.patch('/update-message/:id',(req,res)=>{
    const {id} = req.params
    const {content } = req.body;
    const updatedMessage = updateMessage(id,content)
    res.status(201).json({message:'Messagem criada com sucesso!'})
})

app.delete('/delete-message/:id',(req,res)=>{
    const {id} = req.params;
    const deletedMessage = deleteMessage(id);
    res.status(201).json({message:'Messagem apagada com sucesso!',deletedMessage})
});








app.listen(port,()=> console.log(`Server running in port ${port}`))