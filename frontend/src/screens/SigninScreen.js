import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {signin} from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const SigninScreen=(props)=>{
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    
    const redirect=props.location.search ?props.location.search.split('=')[1]:'/';
    const dispatch=useDispatch();
    const userSignin=useSelector(state=>state.userSignin);
    const {userInfo,loading,error}=userSignin;


    const submitHandler=(e)=>{
     e.preventDefault();
     dispatch(signin(email,password));
    }
    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect);
        }
    },[props.history, redirect, userInfo]);
    return (
      <div>
          <form className="form" onSubmit={submitHandler}>
              
              <div>
                  <h1>Sign In</h1>
              </div>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant='danger'>Invalid Email or Password</MessageBox>}
              <div>
                  <label htmlFor='email'>Email address</label>
                  <input type="email" id="email" placeholder="Enter email" required onChange={e=>setEmail(e.target.value)}></input>
              </div>
              <div>
                  <label htmlFor='password'>Password</label>
                  <input type="password" id="password" placeholder="Enter Password" required onChange={e=>setPassword(e.target.value)}></input>
              </div>
              <div>
                  <label/>
                  <button className="primary" typt="submit">Sign In</button>
              </div>
              <div>
                <div>
                  <label/>
              </div>
              <div>
                  New Customer?{' '}
                  <Link to={`/register?redirect=${redirect}`}>Create your Account</Link>
              </div>
              </div>
          </form>
      </div>  
    );
}
export default SigninScreen;