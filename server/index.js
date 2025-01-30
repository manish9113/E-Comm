import express from 'express'
import dotenv from 'dotenv';
import Connection from './database/dbconnection.js';
import insertProductsdata from './datainsertion/insertProductsdata.js';
import router from './routes/route.js';
import cors from 'cors'



dotenv.config()

const app=express();






const PORT=process.env.PORT 
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;


Connection(USERNAME,PASSWORD)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',router)


app.listen(PORT,(()=>{
    console.log(`app running at port ${PORT}`);
}))


insertProductsdata()