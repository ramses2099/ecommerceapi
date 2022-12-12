const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./routes/users');

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

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})