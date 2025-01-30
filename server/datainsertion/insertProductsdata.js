import { productsData } from "../constants/data.js"
import ValidProducts from "../models/productSchema.js"



const insertProductsdata=async()=>{
      try{
         await ValidProducts.insertMany(productsData)
         console.log("data imported successfully")
      }catch(error){
          console.log("error while inserting productsdata",error.message)
      }
}

export default  insertProductsdata


