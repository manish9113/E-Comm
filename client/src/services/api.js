import axios from 'axios'

const URL = 'https://e-comm-backend-sst3.onrender.com';

export const AuthenticateNewUserSignUp=async(Data)=>{
    try{
      return  await axios.post(`${URL}/signup`,Data)
    }catch(error){
        console.log('error while creating newUser',error)
    }
    
}


export const AuthenticateSignin=async(Data)=>{
     try{
       return await axios.post(`${URL}/signin`,Data)
     }catch(error){
      console.log('error while signin',error)
     }
}


