const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();

mongoose.connect(
   process.env.MONGO_URL
).then(()=>console.log('DB Connection Successfull!'))
.catch((error)=>{
    console.log(error);
});

app.use(express.json());

app.get('/api/v1/test', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);


app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})