import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
 export default function OrderHistoryScreen(props){
     const orderMineList=useSelector(state=>state.orderMineList)
     const {loading,error,orders}=orderMineList;
     const dispatch=useDispatch();
     
     useEffect(()=>{
         dispatch(listOrderMine());
     },[dispatch]);
     return (
         <div>
             <h1>Order History</h1>
             <h1>{console.log(orders)}</h1>
             {loading?<LoadingBox></LoadingBox>:
               error?<MessageBox variant='danger'>{error}</MessageBox>:
               (
                   <table className='table'>
                       <thead>
                           <tr>
                               <th>ID</th>
                               <th>DATE</th>
                               <th>TOTAL</th>
                               <th>PAID</th>
                               <th>DELIVERED</th>
                               <th>ACTIONS</th>
                           </tr>
                       </thead>
                       <tbody>
                           {
                             // eslint-disable-next-line array-callback-return
                             orders.map(order=>{
                                 return(
                                 <tr key={order._id}>
                                     <td>{order._id}</td>
                                     <td>{order.createdAt.substring(0,10)}</td>
                                     <td>{order.totalPrice}</td>
                                     <td>{order.isPaid?order.paidAt:'No'}</td>
                                     <td>{order.isDelivered?order.deliveredAt.substring(0,10):'No'}</td>
                                     <td>
                                         <button type='button' className='small' 
                                          onClick={()=>{props.history.push(`/order/${order._id}`)}}>
                                              Details
                                          </button>
                                     </td>
                                     
                                 </tr>)
                             })
                           }
                       </tbody>
                   </table>
               )
             }
         </div>
        )
 }