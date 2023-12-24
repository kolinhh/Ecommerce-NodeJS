require('dotenv').config();
const express = require('express'),
 app = express(),
mongoose = require('mongoose');



mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.PORT}`)
app.use(express.json())

const permitRouter = require('./routes/permit');


app.use('/permits', permitRouter);

app.use((err, req,res, next) => {
    err.status = err.status || 500;
    res.status(err.status).json({ con: false, msg: err.message })
})


app.listen(process.env.PORT, console.log(`Sever is running at port ${process.env.PORT}`));