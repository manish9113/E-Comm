import mongoose from 'mongoose'

const PaymentSchema=mongoose.Schema({
    razorpay_order_id:{
        required:true,
        type:String,
    },
    razorpay_payment_id: {
        required: true,
        type: String,
    },
    razorpay_signature: {
        required: true,
        type: String,
    }
})

const Payment=mongoose.model('Ecom-Payment',PaymentSchema)

export default Payment;