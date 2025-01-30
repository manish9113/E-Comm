import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductDetails } from "../../redux/store.js";
import { Grid, Typography, Button, Box, Paper } from "@mui/material";
import TableData from "./Table.jsx";
import { addToCart } from "../../redux/store.js"; 
import axios from "axios";

const Detailview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const {productDetails} = useSelector((state) => state.products);


  const addItemToCart = useCallback(() => {
    const cartItem = productDetails;
    dispatch(addToCart(cartItem));
    navigate("/cart");
  }, [dispatch,productDetails, navigate]);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);


  const handleorder=async(totalAmount)=>{
    try{
        const {data:{order}}=await axios.post("http://localhost:8000/checkout",{totalAmount});
        const {api_key} = await axios.get("http://localhost:8000/getapikey");
        
    
        const options = {
          key: api_key, // Replace with your Razorpay key_id
          amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "username of sender",
          description: "Test Transaction",
          order_id: order.id, // This is the order_id created in the backend
          callback_url: "http://localhost:8000/paymentverification", // Your success URL
          prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#F37254",
          },
          handler: async function () {
            alert("Payment successful! order placed");
          },
        };

      const razor= new window.Razorpay(options);
      razor.open();
    
    }
    catch(error){
      console.log(error);
    }
  }



  return (
    <div style={{ marginTop: 56, backgroundColor: "#EBE8E7" }}>
      {productDetails ? (
        <Grid container spacing={1}>
          <Grid
            item
            xs={6}
            md={5}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: 12,
            }}
          >
            <Paper>
              <img
                src={productDetails.detailUrl}
                alt={productDetails.id}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 20,
                  height: "75vh",
                  width: "30vw",
                }}
              />
            </Paper>
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                style={{
                  margin: 5,
                  width: 140,
                  height: 45,
                  backgroundColor: "orange",
                }}
                onClick={addItemToCart}
              >
                ADD TO CART
              </Button>
              <Button
                variant="contained"
                style={{
                  margin: 5,
                  width: 140,
                  height: 45,
                  backgroundColor: "red",
                }}
                onClick={() => handleorder(productDetails.price.cost)}
              >
                BUY NOW
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6} md={7}>
            <Typography
              style={{
                fontSize: 22,
                fontWeight: 600,
                textDecorationLine: "underline",
                margin: 15,
              }}
            >
              {productDetails.title?.longTitle}
            </Typography>
            <TableData product={productDetails} />
          </Grid>
        </Grid>
      ) : (
        <div>No product found</div>
      )}
    </div>
  );
};

export default Detailview;
