import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import sellerRouter from './routers/sellerRouter.js';
import shopRouter from './routers/shopRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';
dotenv.config();
const app = express();
const __dirname=path.resolve();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/GoLocal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});


app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID||'sb');
});
app.use('/api/uploads',uploadRouter);
app.use(express.static(path.join(__dirname,'/frontend/build')))
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,
    '/frontend/build/index.html')));
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders',orderRouter);
app.use('/api/seller',sellerRouter);
app.use('/api/shops',shopRouter);
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})

app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
/*
app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(x => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: "Product Not Found" });
    }
});*/
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server at http:localhost: ${port}`);
});
