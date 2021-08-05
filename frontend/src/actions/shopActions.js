import Axios from "axios";
import { SHOP_DETAILS_FAIL, SHOP_DETAILS_REQUEST, SHOP_DETAILS_SUCCESS, SHOP_LIST_FAIL, SHOP_LIST_REQUEST, SHOP_LIST_SUCCESS } from "../Constants/shopConstants";

export const listShops=()=>async(dispatch)=>{
    dispatch({
        type:SHOP_LIST_REQUEST
    });
    try{
        const {data}=await Axios.get('/api/shops');
        dispatch({type:SHOP_LIST_SUCCESS,payload:data});
    }catch(error){
        dispatch({type:SHOP_LIST_FAIL,payload:error.message});
    }
}
export const detailsShop=(shopId)=>async(dispatch)=>{
   dispatch({type:SHOP_DETAILS_REQUEST,payload:shopId});
   try{
      const {data}=await Axios.get(`/api/shops/${shopId}`);
      dispatch({type:SHOP_DETAILS_SUCCESS,payload:data});
   }
   catch(error){
       dispatch({type:SHOP_DETAILS_FAIL,
        payload:error.response &&
         error.response.data.message
         ? error.response.data.message:error.message});
   }
}
