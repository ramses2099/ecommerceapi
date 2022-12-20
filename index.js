const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const prodRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');

const app = express();

mongoose.connect(
   process.env.MONGO_URL
).then(()=>console.log('DB Connection Successfull!'))
.catch((error)=>{
    console.log(error);
});

//active cors
app.use(cors());
app.use(express.json());

app.get('/api/v1/test', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', prodRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/orders', orderRouter);


app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})