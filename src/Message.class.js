import { v4 as uuidv4 } from 'uuid';

export class Message {
    constructor(name, content){
        this.id = uuidv4();
        this.name = name;
        this.content = content;
        this.criado_em = new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    }
}
