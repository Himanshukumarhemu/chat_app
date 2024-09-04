import React, { useState } from "react";
import { Form } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
    const [user, setUser] = useState({
        Username: "",
        password: "",
      });
      const dispatch =useDispatch();
      const navigate = useNavigate(); 
      
      const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/user/login`, user ,{
             headers:{
               "Content-Type":"application/json"
             },
             withCredentials:true
            });
             navigate("/");
             dispatch(setAuthUser(res.data));
           } catch (error) {
            toast.error(error.response.data.message);
             console.log(error); 
           }
        setUser({
          Username: "",
          password: "",
         
        });
      };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-300">Login</h1>
        <Form onSubmit={onSubmitHandler} action="">
         
          <div>
            <label className="label p-2">
              <span className="text-base  text-red-100 font-bold  label-text">
                User Name
              </span>
            </label>
            <input
            value={user.Username}
            onChange={(e)=>setUser({...user,Username:e.target.value})}
              className="w-full input-bordered h-10"
              type="text"
              placeholder="UserName"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base  text-gray-100 font-bold  label-text">
                Password
              </span>
            </label>
            <input
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
              className="w-full input-bordered h-10"
              type="Password"
              placeholder="Password"
            />
          </div>
         
         
         
          <p className="text-center my-2 text-yellow-300">Don't have Account?<Link to="/signup">Login</Link></p>
          
         
         
          <div>
            <button type="submit" className="btn btn-block btn-xl mt-2 border border-slate-700">Login</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
