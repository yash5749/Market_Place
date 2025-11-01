import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';



const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));


app.use(express.json({limit : '10mb'}));
app.use(express.urlencoded({ extended: true, limit : '1mb' }));
app.use(express.static('public'));
app.use(cookieParser());

// import userRouter from './routes/user.routes.js'
// app.use("/api/v1/users", userRouter)

import sellerRoute from './routes/seller.route.js'
import bikesRoute from './routes/bike.routes.js'
app.use("/api/v1/seller", sellerRoute)
app.use("/api/v1/bikes", bikesRoute)

app.post("/test", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});



export default app;