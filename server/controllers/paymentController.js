import Razorpay from "razorpay"
import crypto from "crypto";
import dotenv from 'dotenv';
import Payment from "../models/paymentSchema.js";
dotenv.config();


export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,

});

export const checkout=async(req,res)=>{
   try{
     
       var options = {
           amount: Number(req.body.totalAmount * 100),
           currency: "INR",

       };
       const order = await instance.orders.create(options)

       res.status(200).json({
           success: true,
           order,
       })
   }
   catch(error){
    console.log(error);
      res.status(500).json({message:error.message});
   }
    
}


export const PaymentVerification = async (req, res) => {
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {

            await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });

            res.redirect(
                `https://e-comm-frontend-ubxq.onrender.com/cart`
            );

        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}

export const getapikey=(req,res)=>{
    res.status(200).json({
        api_key: process.env.RAZORPAY_API_KEY})
}
