require('dotenv').config();
require('express-async-errors');


const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const cors = require("cors");

app.use(cors());
app.use(express.json());

//  Routes
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const cartRouter = require('./routes/cartRoutes');
const paymentRouter = require('./routes/paymentRoutes');

app.use('/api/users', userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.post('/api/payment', paymentRouter);


app.use('/', (req, res) => {
  const date = new Date().toString().trim(20)
  res.send(`<h1> ${date} </h1>`);
});
app.use(notFoundMiddleware);
app.use(errorMiddleware);


const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`DB connection success! Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

