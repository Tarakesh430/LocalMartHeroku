import express from 'express';
import data from '../data.js';
import bcrypt from 'bcryptjs';

import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils.js';
import Seller from '../models/sellerModel.js';
import Product from '../models/productModel.js';
const sellerRouter = express.Router();

sellerRouter.get('/seed',
    expressAsyncHandler(async (req, res) => {
        // await seller.remove({});   
        const createdSellers= await Seller.insertMany(data.sellers);
        res.send({ createdSellers});
    }));

sellerRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const seller = await Seller.findOne({ email: req.body.email });
    if (seller) { 
        if (bcrypt.compareSync(req.body.password, seller.password)) {
            res.send({
                _id: seller._id,
                name: seller.name,
                email: seller.email,
                phone:seller.phone,
                isAdmin: seller.isAdmin,
                address:seller.address,
                shopName:seller.shopName,
                productList:seller.productList,
                token: generateToken(seller),
            });
            return;
        }
    }
    res.status(401).send({message:'Invalid email or password'});
}))
sellerRouter.post('/register',expressAsyncHandler(async(req,res)=>{
    const newProductList=[{name:req.body.email,
        brand:req.body.email,
         category:req.body.email,
        description:req.body.email,
       image:req.body.email,
         }];
    
    const seller=new Seller({name:req.body.name,email:req.body.email,
        phone:req.body.phone,
    password:bcrypt.hashSync(req.body.password,8),
    productList:newProductList,
    isAdmin:false,
      address:req.body.address});
    const  createdSeller=await seller.save();
    res.send({
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        phone:seller.phone,
        isAdmin: seller.isAdmin,
        address:seller.address,
        productList:seller.productList,
        token: generateToken(createdSeller),
    });
}


));
sellerRouter.post('/addProduct',expressAsyncHandler(async(req,res)=>{
    //qty,
    const product=await Product.findOne({name:req.body.name});
    const qty=req.body.addToStock;
    if(product){
        const count=product.countInStock;
       await  Product.updateOne(
            { "name" : req.body.name }, // specifies the document to update
            {
              $set: {  "countInStock" : count+qty }
            }
        );
    }else
    {
        const newProduct=new Product({
            name:req.body.name,
           brand:req.body.brand,
            category:req.body.category,
           description:req.body.description,
            price:req.body.price,
            countInStock:req.body.countInStock
        });
       await newProduct.save();
    }
    const seller=await Seller.findOne({email:req.body.email});
   const {prdoudctList}=seller;
  if(prdoudctList && prdoudctList.find(x=>x.name===req.body.name)){
   const prod= prdoudctList.find(x=>x.name===req.body.name)
       const updatedStock=qty+prod.countInStock;
    const updatedProductList=await Seller.updateOne({
        "email":req.body.email,
        "prdoudctList.name":req.body.name
    },
    {
        $set:{"prdoudctList.$.countInStock":updatedStock}
    });
    res.send(updatedProductList);
   }
    else{
       const sellerUpdate= await Seller.updateOne(
           { "email":req.body.email },
           {$push:{"prdoudctList":{name:req.body.name,brand:req.body.brand,
            image:req.body.image,
            category:req.body.category,
            description:req.body.description,
            price:req.body.price,
            countInStock:req.body.countInStock}},
       });
   
    
    res.send(sellerUpdate);
}
}
));
sellerRouter.post('/deleteProduct/',expressAsyncHandler(async(req,res)=>{
    const qty=req.body.deleteStock;
    const seller=await Seller.findOne({email:req.body.email});
    if(seller){
        const {prdoudctList}=seller;
        if(prdoudctList && prdoudctList.find(x=>x.name===req.body.name)){
            const prod= prdoudctList.find(x=>x.name===req.body.name)
            if(qty<=prod.countInStock){
                const updatedStock=prod.countInStock-qty;
                 await Seller.updateOne({
                    "email":req.body.email,
                    "prdoudctList.name":req.body.name
                },
                {
                    $set:{"prdoudctList.$.countInStock":updatedStock}
                });
            }
            else{
                wrongHandler("Required Deleted range is higher than the available range");
            }
        }
        else{
            wrongHandler("Seller has no productList in the ");
        }
    }
    else{
        wrongHandler("No seller Found with given mail");
    }
    var a=1;
    async function wrongHandler(msg){
        // const suggest=await Seller.find({"productList.countInStock":{$gte: qty}});
         a=0;
        res.status(401).send({message:msg});
        return;
    }
    if(a===0){
        const product=await Product.findOne({name:req.body.name});
        if(product){
            const count=product.countInStock;
            if(count>=qty)
            await  Product.updateOne(
                { "name" : req.body.name }, // specifies the document to update
                {
                    $set: {  "countInStock" : count-qty }
                }
            );
        }
        res.send("good");
    }
    // res.send("suggest");
}));

sellerRouter.get('/',(req,res)=>{res.send('hvcjhchjc')});
export default sellerRouter;