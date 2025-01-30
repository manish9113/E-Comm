
import validSignup from "../models/signupSchema.js"



const setSingin=async(request,response)=>{
     try{
         const validuser=await validSignup.findOne({Email:request.body.Email})
         
         if(validuser){
            return response.status(200).json({FirstName:validuser.FirstName})
         }

     }catch(error){
        response.status(500).json({message:error})
     }
}

export default setSingin