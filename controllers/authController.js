import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController=async(req,res)=>{
    try {
        const {name,email,password,address}=req.body;
        if(!email){
            return res.send({error:'email is Required'})
        }
        if(!name){
            return res.send({error:'Name is Required'})
        }
        if(!password){
            return res.send({error:'password is Required'})
        }
        if(!address){
            return res.send({error:'address is Required'})
        }

        //exisiting user
        const exisitingUser =await userModel.findOne({"email":email});
        if(exisitingUser){
            return res.status(200).send({
                success:false,
                message:'Already Registre please login'
            })
        }
        //register user
        const hashedPassword=await hashPassword(password)
        //save
        const user= await new userModel({name,email,address,password:hashedPassword}).save()
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Errro in Registeration',
            error
        })
    }
};

export const loginController=async(req,res)=>{
    try {
        const{name,password}=req.body;
        if(!name || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid name or password'
            })
        }
        //check user
        const user= await userModel.findOne({name})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'name is not registerd'
            })
        }
        const match= await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }
        //token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
                name: user.name,
                email:user.email
            },
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await userModel.findOne({ email });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };
  

//test controller
export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };