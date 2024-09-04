import React, { useState } from "react";
import { Form } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    Username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handlecheckbox = (gender) => {
    setUser({ ...user, gender });
  };
  const onSubmitHandler =async(e) => {
    e.preventDefault();
    try {
     const res = await axios.post(`http://localhost:8080/api/v1/user/register`, user ,{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
     });
    if(res.data.success){
      navigate("/login");
     toast.success(res.data.message);
    }  
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error); 
    }
    setUser({
      fullName: "",
      Username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-300">Signup</h1>
        <Form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base text-red-100 font-bold  label-text">
                Full Name
              </span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full input-bordered h-10"
              type="text"
              border-gray-100
              placeholder="Name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base  text-red-100 font-bold  label-text">
                User Name
              </span>
            </label>
            <input
              value={user.Username}
              onChange={(e) => setUser({ ...user, Username: e.target.value })}
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input-bordered h-10"
              type="Password"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base  text-gray-100 font-bold  label-text">
                Confirm Password
              </span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full input-bordered h-10"
              type="Password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex item-center text-gray-100 font-bold">
              <p>Male:</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handlecheckbox("male")}
                defaultChecked
                className="checkbox  mx-2"
              />
            </div>
            <div className="flex item-center text-gray-100 font-bold">
              <p>Female:</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handlecheckbox("female")}
                defaultChecked
                className="checkbox  mx-2"
              />
            </div>
          </div>

          <p className="text-center my-2 text-yellow-300">
            Already have an Account?<Link to="/login">Login</Link>
          </p>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              Signup
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
