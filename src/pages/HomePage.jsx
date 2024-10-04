import { Button, Typography, Container, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar';

const Home = () => {
  var token = sessionStorage.getItem("token");
  if (token == null) {
      window.location.replace('/login');
  }
  const theme = useTheme();

  return (
    <div className="App">
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            marginTop: "-4rem",
            fontSize: "5rem",
            fontWeight: 700,
            letterSpacing: "-0.5rem",
            display: "inline-block",
            whiteSpace: "nowrap",
            [theme.breakpoints.down("sm")]: {
              fontSize: "4rem",
              letterSpacing: "-0.4rem",
            },
          }}
          gutterBottom
        >
          Welcome Back
        </Typography>
      </Container>
    </div>
  );
};
export default Home;