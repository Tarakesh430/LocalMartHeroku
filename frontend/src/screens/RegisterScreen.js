import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const RegisterScreen=(props)=>{
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');

    const redirect=props.location.search ?props.location.search.split('=')[1]:'/';
    const dispatch=useDispatch();
    const userRegister=useSelector(state=>state.userRegister);
    const {userInfo,loading,error}=userRegister;


    const submitHandler=(e)=>{
     e.preventDefault();
     if(password!==confirmPassword)
        alert('Password and Confirm Password are not matched')
    else
     dispatch(register(name,email,password));
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
                  <h1>Create Account</h1>
              </div>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant='danger'>Invalid Email or Password</MessageBox>}
              <div>
                  <label htmlFor='name'>Name</label>
                  <input type="text" id="name" placeholder="Enter Name" required onChange={e=>setName(e.target.value)}></input>
              </div>
              <div>
                  <label htmlFor='email'>Email address</label>
                  <input type="email" id="email" placeholder="Enter email" required onChange={e=>setEmail(e.target.value)}></input>
              </div>
              <div>
                  <label htmlFor='password'>Password</label>
                  <input type="password" id="password" placeholder="Enter Password" required onChange={e=>setPassword(e.target.value)}></input>
              </div>
              <div>
                  <label htmlFor='confirmPassword'>Confirm Password</label>
                  <input type="password" id="confirmPassword" placeholder="Confirm Password" required onChange={e=>setConfirmPassword(e.target.value)}></input>
              </div>
              <div>
                  <label/>
                  <button className="primary" typt="submit">Register</button>
              </div>
              <div>
                <div>
                  <label/>
              </div>
              <div>
                  Already have an account?{' '}
                  <Link to={`/signin?redirect=${redirect}`}>Create your Account</Link>
              </div> 
              </div>
          </form>
      </div>   
    );
}
export default RegisterScreen;