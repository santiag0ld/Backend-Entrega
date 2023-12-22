const express = require("express");
const appRouter = require('./routes');
const { connectDb } = require("./config/config");

const app = express();
const PORT = 8080;

connectDb()
app.use(express.json)
app.use(express.urlencoded({extended: true}))

app.use(appRouter)

app.listen(PORT, err => {
    if(err){
        console.log(err)
    }
    console.log(`Escuchando en el puerto: ${PORT}`);
});