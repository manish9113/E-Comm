import { Box, Paper, Typography } from "@mui/material";
import { navData } from "../../constants/data";

const ProductType = () => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EBE8E7",
      }}
    >
      {navData.map((data, index) => (
        <Paper
          key={data.id || index} // Use data.id if available, fallback to index
          style={{
            margin: 7,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={data.url} alt={data.text} />
          <Typography>{data.text}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default ProductType;
