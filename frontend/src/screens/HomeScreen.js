import { useEffect, } from "react";
import Product from "../components/Product";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import {useDispatch, useSelector} from 'react-redux';
import { listProducts } from "../actions/productActions";
import { detailsShop, listShops } from "../actions/shopActions";
const HomeScreen=()=>{
  const dispatch=useDispatch(); 
  const productList=useSelector((state)=>state.productList);
  const {loading,error,products}=productList;


  useEffect(()=>{
   dispatch(listProducts({}));
   dispatch(listShops());
   dispatch(detailsShop("60d76672b1ae6928f8404bb5"));
  },[dispatch])
   return (
     <div>
       {loading?<LoadingBox></LoadingBox>:
       error?<MessageBox variant='danger'>{error}</MessageBox>:
       <div className='row center'>
         {
           console.log(products)
         }
       {
         products && products.map(x=>(
         <Product key={x._id} product={x}></Product>
          ))
        }
       </div>}
         
     </div>
   )
}
export default HomeScreen;