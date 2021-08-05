import mongoose from 'mongoose';

const sellerSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:Number,reqired:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false,required:true},
    shopName:{type:String,required:true},
    productList:[{ name : {type : String},
        image:{type:String},
        brand:{type:String},
        category:{type:String},
        description:{type:String},
        price:{type:Number,},
        countInStock:{type:Number,} 
    }],
    address:{type:String,required:true},
},{
  timestamps:true,
}
);

const Seller=mongoose.model("Seller",sellerSchema);
export default Seller;