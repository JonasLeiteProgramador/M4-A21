import express from "express";

const app = express();

const port = 3090;


app.get('/message',(req,res)=>{
    res.status(201).json({message:'Jonas me adota?'})
})
app.use(express.json())


app.listen(port,()=> console.log(`Server running in port ${port}`))