
import validSignup from "../models/signupSchema.js"



const setSignup=async(request,response)=>{
      try{
          const exist=await validSignup.findOne({Email:request.body.Email})
          if(exist){
            return response.status(401).json({message:'user already exist'})
          }
          const user=request.body
          const newUser=new validSignup(user)
          await newUser.save();
          response.status(200).json({message:user})
      }catch(error){
          response.status(500).json({message:error})
      }
}

export default setSignup