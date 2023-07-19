import "./LoginScreen.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";


const LoginScreen = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
      
        // form function
        const handleSubmit = async (e) => {
          e.preventDefault();
          try {
            const res = await axios.post("/api/v1/auth/login", {
                name,
                password,
            });
            if (res && res.data.success) {
              toast.success(res.data && res.data.message);
              navigate("/dasboard");
            } else {
              toast.error(res.data.message);
            }
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
          }
        };
        function handleCallbackResponse(response){
          if(response){
          console.log(response.credential);
          var userObject=jwt_decode(response.credential);
          console.log(userObject);
          navigate("/dasboard");
        }
        }
        useEffect(()=>{
          window.google.accounts.id.initialize({
            client_id:"733696811420-0hkad5rb3gm6rgg4h1laodjcqu40hl00.apps.googleusercontent.com",
            callback: handleCallbackResponse
          });
          window.google.accounts.id.renderButton(
            document.getElementById("signindiv"),
            {theme:"outline", size:"large"}
          );
        },[]);
          
  return (
    <div className="login-screen">
      <div className="main-screen" />
       <Toaster position="top-right" reverseOrder={false} />
      <form >
      
      <button className="google-login-button">
        <b className="login-with-google-container" id="signindiv">
            <p className="login-with-google">login with google</p>
        </b>
      </button>
      </form>
      <div className="line-or">
        <b className="or">OR</b>
        <div className="line-or-child" />
        <div className="line-or-item" />
      </div>
      <form onSubmit={handleSubmit}>
      <input
        className="name"
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        />
        <input
            className="password"
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button className="submit-button">
        <b className="start-using-filterpixel">Submit</b>
      </button>
      </form>
      <header className="nav-bar">
        <div className="newlogo-1-parent">
          <img className="newlogo-1-icon" alt="" src="/newlogo-1.svg" />
          <div className="filterpixel">FilterPixel</div>
        </div>
        <button className="buttonprimary">
            <NavLink to="/register" className="start-using-filterpixel">
            Sign Up
            </NavLink>
        </button>
      </header>
    </div>
  );
};

export default LoginScreen;
