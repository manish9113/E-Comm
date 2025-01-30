import { Grid, Typography,styled,Box } from "@mui/material";

const Footer = () => {
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit', // Optional: to inherit the color from the parent
  };

const Styledli=styled('li')({
    marginBottom:5,
})
 

  return (
    <Box style={{ marginTop:25}}>
    <Grid container spacing={3} style={{ padding: '20px 0',backgroundColor:'#EBE8E7' }}>
      <Grid item xs={4}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: '100%' }}
        >
          <Typography style={{ fontWeight: 535, marginBottom: 10,fontSize:18,textDecorationLine:'underline' }}>
            Company Information
          </Typography>
          <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
            <Styledli><a href='/about' style={linkStyle}>About Us</a></Styledli>
            <Styledli><a href='/careers' style={linkStyle}>Careers</a></Styledli>
            <Styledli><a href='/blog' style={linkStyle}>Blog</a></Styledli>
          </ul>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: '100%' }}
        >
          <Typography style={{ fontWeight: 535, marginBottom: 10,fontSize:18,textDecorationLine:'underline' }}>
            Legal Information
          </Typography>
          <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
            <Styledli><a href='/privacy-policy' style={linkStyle}>Privacy Policy</a></Styledli>
            <Styledli><a href='/terms' style={linkStyle}>Terms & Conditions</a></Styledli>
            <Styledli><a href='/cookie-policy' style={linkStyle}>Cookie Policy</a></Styledli>
          </ul>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: '100%' }}
        >
          <Typography style={{ fontWeight: 535, marginBottom: 10,fontSize:18,textDecorationLine:'underline' }}>
            Customer Service
          </Typography>
          <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
            <Styledli><a href='/contact' style={linkStyle}>Contact Us</a></Styledli>
            <Styledli><a href='/faq' style={linkStyle}>FAQ</a></Styledli>
            <Styledli><a href='/returns' style={linkStyle}>Returns & Exchanges</a></Styledli>
          </ul>
        </Grid>
      </Grid>
    </Grid>
    </Box>
  );
};

export default Footer;
