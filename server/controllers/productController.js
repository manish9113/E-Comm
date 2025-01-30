import ValidProducts from "../models/productSchema.js"



export const getProductsSlider=async(request,response)=>{
      try{
          const products=await ValidProducts.find({})
        //   console.log(products)
          response.status(200).json(products)
      }catch(error){
        response.status(500).json({message:error.message})

      }
}


export const getProductById=async(request,response)=>{
   try{
    const id=request.params.id
    const product=  await ValidProducts.findOne({'id':id})
      response.status(200).json(product)
   }catch(error){
      response.status(500).json({message:error.message})
   }
}
