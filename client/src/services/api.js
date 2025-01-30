import axios from 'axios'

const URL = 'http://localhost:8000';

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


