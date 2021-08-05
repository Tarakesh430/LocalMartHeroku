import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from '../Constants/userConstants';

export default  function ProfileScreen(){
   const [name,setName]=useState('');
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const [confirmPassword,setConfirmPassword]=useState('');

    const dispatch=useDispatch();
    const userSignin=useSelector(state=>state.userSignin);
    const {userInfo}=userSignin;
    const userDetails=useSelector(state=>state.userDetails);
    const {loading,error,user}=userDetails;

    const userUpdateProfile=useSelector(state=>state.userUpdateProfile);
    const {success:successUpdate,error:errorUpdate,loading:loadingUpdate}=userUpdateProfile;
    useEffect(()=>{
       if(!user){
       // dispatch({type:})
       dispatch({type:USER_UPDATE_PROFILE_RESET})
        dispatch(detailsUser(userInfo._id));

       }
       else{
           setName(user.name);
           setEmail(user.email);
       }
       console.log({successUpdate,errorUpdate,loadingUpdate});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch, user, userInfo]);
    const submitHandler=(event)=>{
        event.preventDefault();
        //TODO
        if(password!==confirmPassword)
        alert('Password and Confirm Password not matched');
        else{
            dispatch(updateUserProfile({userId:user._id,
                name,email,password
            }));
        }
    }
    return (
        <div>
           <form className="form" onSubmit={submitHandler}>
               <div><h1>User Profile</h1></div>
               {
                   loading?<LoadingBox></LoadingBox> :
                   error?<MessageBox variant='danger'>{errorUpdate}</MessageBox> :
                   <>
                 
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
                {successUpdate && <MessageBox variant='success'>Profile Updated Successfully</MessageBox>}
                       <div>
                           <label htmlfor='name'>Name</label>
                           <input id='name' type='text' 
                             placeholder='Enter name' value={name}
                             onChange={(e)=>setName(e.target.value)}
                             >
                            </input>  
                       </div>
                       <div>
                           <label htmlfor='email'>Email</label>
                           <input id='email' type='email' 
                             placeholder='Enter email' value={email}
                             onChange={(e)=>setEmail(e.target.value)}
                             >
                            </input>  
                       </div>
                       <div>
                           <label htmlfor='password'>Password</label>
                           <input id='password' type='password' 
                             placeholder='Enter Password'
                             onChange={(e)=>setPassword(e.target.value)}
                             >
                            </input>  
                       </div>
                       <div>
                           <label htmlfor='confirmPassword'>Confirm Password</label>
                           <input id='confirmPassword' type='password' 
                             placeholder='Confirm Password'
                             onChange={(e)=>setConfirmPassword(e.target.value)}
                              >
                            </input>  
                       </div>
                      <div>
                          <label/>
                          <button className='primary' type='submit'>
                              Update
                          </button>
                      </div>

                   </>
               }
           </form>
        </div>
    )
} 