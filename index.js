import express from 'express';
import cors from 'cors';
import initRoutes from './src/routes';


require("dotenv").config();
require('./connection_database')

const app = express();

// Bỏ vào use những middlware muốn conflic cho app

// chỉ cho nguồn từ origin vs method đc khai báo truy cập app
// app.use(cors({
//     origin: process.env.CLIENT_URL,
//     methods: ['GET','POST','PUT','DELETE']
// }));

// cho phép đọc json từ request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


initRoutes(app);

const PORT = process.env.PORT || 8888;
const listener = app.listen(PORT, () => {
    console.log(`server is running on the port ${listener.address().port}`);
})