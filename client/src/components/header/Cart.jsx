import { Typography, Grid, Box, Paper, styled, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import GroupedButton from "./GroupButton";
import { removeFromCart,clearCart} from "../../redux/store.js";
import axios from "axios";


const StyledTypography = styled(Typography)`
  margin: 12px;
  color: rgb(151 128 128 / 87%);
`;

const FixedPaper = styled(Paper)`
  position: fixed;
`;

const EmptyCartMessage = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
`;

const Cart = () => {
  const [totalPrice, setPrice] = useState(0);
  const [totalDiscount, setDiscount] = useState(0);
  const [totalAmount, setAmount] = useState(0);

   const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Cart Items from Redux store:", cartItems); 

    let totalPrice = 0;
    let totalDiscount = 0;
    let totalAmount = 0;

    cartItems.forEach(({data,quantity}) => {
      totalPrice += (data.price.mrp)*quantity;
      totalDiscount += data.price.mrp * quantity -(data.price.cost * quantity);
      totalAmount += (data.price.cost)*quantity;
    });

    setPrice(totalPrice);
    setDiscount(totalDiscount);
    setAmount(totalAmount);
  }, [cartItems]); 

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id)); 
  };

  const handlePlaceOrder = async(totalAmount) => {
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
            dispatch(clearCart()); 
            alert("Payment successful! Your cart is now empty.");
          },
        };

      const razor= new window.Razorpay(options);
      razor.open();
    
    }
    catch(error){
      console.log(error);
    }
     
  };

  return (
    <div style={{ marginTop: 56 }}>
      {cartItems.length ? (
        <Grid container>
          <Grid item lg={9} md={9} sm={12} xs={12}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 12,
                textDecoration: "underline",
              }}
            >
              <Typography>My Cart ({cartItems.length})</Typography>
            </Box>
            {cartItems.map(({ data, quantity }) => (
              <Paper
                elevation={3}
                style={{ margin: 10, padding: 10, display: "flex" }}
                key={data.id}
              >
                <Box style={{ display: "flex", flexDirection: "column" }}>
                  <img
                    src={data.url}
                    alt={data.title?.longTitle || "No Title Available"} // Fallback if longTitle is undefined
                    style={{ height: 246, width: 256 }}
                  />
                  <Box
                    style={{
                      margin: 10,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <GroupedButton />
                  </Box>
                </Box>
                <Box>
                  <StyledTypography>
                    {data.title?.longTitle || "No Title Available"}
                  </StyledTypography>
                  <StyledTypography>
                    Price: Rs.{data.price.mrp}
                  </StyledTypography>
                  <StyledTypography>
                    Discount: {data.price.discount}
                  </StyledTypography>
                  <StyledTypography>
                    Cost: Rs.{data.price.cost}
                  </StyledTypography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveFromCart(data.id)}
                    style={{ marginTop: 10 }}
                  >
                    Remove from Cart
                  </Button>
                </Box>
              </Paper>
            ))}
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <FixedPaper style={{ margin: 20, padding: 10 }}>
              <Box style={{ display: "flex", margin: 10 }}>
                <Typography>Total Price ({cartItems.length} item):</Typography>
                <Typography>Rs. {totalPrice}</Typography>
              </Box>
              <Box style={{ display: "flex", margin: 10 }}>
                <Typography>Total Discount:</Typography>
                <Typography>Rs. {totalDiscount}</Typography>
              </Box>
              <Box style={{ display: "flex", margin: 10 }}>
                <Typography>Total Amount:</Typography>
                <Typography>Rs. {totalAmount}</Typography>
              </Box>
              {cartItems.length > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={()=>handlePlaceOrder(totalAmount)}
                  style={{ marginTop: 20, width: "100%" }}
                >
                  Place Order
                </Button>
              )}
            </FixedPaper>
          </Grid>
        </Grid>
      ) : (
        <EmptyCartMessage>
          <Typography variant="h5" color="textSecondary">
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Looks like you haven’t added anything to your cart yet.
          </Typography>
        </EmptyCartMessage>
      )}
    </div>
  );
};

export default Cart;
