const { Router } = require('express');
const userRouter = require('./apis/users.router');
const express = require('express');
const router = Router();
const app = express(); 

app.use('/api/users', userRouter);
app.use("/api/products", () => {});
app.use("/api/carts", () => {});
app.use("/api/views", () => {});

module.exports = app; 