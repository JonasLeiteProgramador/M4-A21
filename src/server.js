import express from "express";
import { Message } from "./Message.class.js";

const app = express();
const port = 3090;
let messages = [];

app.use(express.json());

const retornarTudo = () => {
    return messages;
};

const createMessage = (name, content) => {
    const newMessage = new Message(name, content);
    messages.push(newMessage);
    return newMessage;
};

const updateMessage = (id, content) => {
    const messageIndex = messages.findIndex((message) => message.id === id);
    if (messageIndex !== -1) {
        messages[messageIndex].content = content;
        return true;
    }
    return false;
};

const deleteMessage = (id) => {
    const messageIndex = messages.findIndex((message) => message.id === id);
    if (messageIndex !== -1) {
        const deletedMessage = messages.splice(messageIndex, 1);
        return deletedMessage[0];
    }
    return null;
};

app.get("/messages", (req, res) => {
     ;
    res.status(200).json({ messagens:retornarTudo() });
});

app.post("/create-message", (req, res) => {
    const { name, content } = req.body;
    const newMessage = createMessage(name, content);
    res.status(201).json({ message: "Mensagem criada com sucesso!", newMessage });
});

app.patch("/update-message/:id", (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const updated = updateMessage(id, content);
    if (updated) {
        res.status(200).json({ message: "Mensagem atualizada com sucesso!" });
    } else {
        res.status(404).json({ message: "Mensagem não encontrada." });
    }
});

app.delete("/delete-message/:id", (req, res) => {
    const { id } = req.params;
    const deletedMessage = deleteMessage(id);
    if (deletedMessage) {
        res.status(200).json({ message: "Mensagem apagada com sucesso!", deletedMessage });
    } else {
        res.status(404).json({ message: "Mensagem não encontrada." });
    }
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
