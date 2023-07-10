import React from "react";
import "./homepage.scss";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import puppies from "../../assets/puppies.jpeg";
import { Typography } from "@mui/material";

const HomePage = () => {
  const redirect = useNavigate();

  return (
    <div className="home">
      <Typography variant="h3">Welcome to Pet Store </Typography>;
      <Button
        variant="outlined"
        color="primary"
        onClick={() => redirect("/products")}
        style={{ marginBottom: "2rem" }}
      >
        List of Products
      </Button>
      <img src={puppies} alt="puppies" />
    </div>
  );
};

export default HomePage;
