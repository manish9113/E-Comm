import { Paper } from "@mui/material";

const TableData = ({ product }) => {
  if (!product) {
    return <div>No product details available</div>;
  }

  const {
    price: { mrp, discount, cost } = {},
    quantity,
    description,
    discount: discountTagline,
    tagline,
  } = product;

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "60vw", margin: "0 auto" }}
    >
      <h2>Product Details</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ padding: "8px" }}>MRP</td>
            <td style={{ padding: "8px" }}>₹{mrp}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>Discount</td>
            <td style={{ padding: "8px" }}>{discount}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>Cost</td>
            <td style={{ padding: "8px" }}>₹{cost}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>Quantity</td>
            <td style={{ padding: "8px" }}>{quantity}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>Description</td>
            <td style={{ padding: "8px" }}>{description}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>Discount Tagline</td>
            <td style={{ padding: "8px" }}>{discountTagline}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>Tagline</td>
            <td style={{ padding: "8px" }}>{tagline}</td>
          </tr>
        </tbody>
      </table>
    </Paper>
  );
};

export default TableData;
