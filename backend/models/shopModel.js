import mongoose from 'mongoose';

const shopSchema=new mongoose.Schema({
    shopName:{type:String,required:true},
    shopDetails:{type:mongoose.Schema.Types.ObjectId,
        ref:'Seller',required:true},
},{
  timestamps:true,
}
);


const Shop=mongoose.model("Shop",shopSchema);
export default Shop;