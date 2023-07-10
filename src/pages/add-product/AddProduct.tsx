import React, { useState } from "react";
import "./addproduct.scss";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IProduct } from "../../types/global.typing";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants/url.constant";
import { error } from "console";

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<Partial<IProduct>>({
    title: "",
    brand: "",
  });

  const redirect = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveBtnClick = () => {
    if (product.title === "" || product.brand === "") {
      alert("Enter Values");
      return;
    }

    const data: Partial<IProduct> = {
      brand: product.brand,
      title: product.title,
    };
    axios
      .post(baseUrl, data)
      .then((response) =>
        redirect("/products", {
          state: { message: "Product Successfully Created" },
        })
      )
      .catch((error) => alert("Errors"));
  };

  const handleBackBtnClick = () => {
    redirect("/products");
  };

  return (
    <div className="add-product">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 800,
            height: 800,
          },
        }}
      >
        <Paper elevation={3}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h5" sx={{ my: "2rem" }}>
              Add New Product
            </Typography>

            <TextField
              autoComplete="off"
              label="Brand"
              variant="outlined"
              sx={{ width: "50%", mx: "auto" }}
              name="brand"
              value={product.brand}
              onChange={onChangeHandler}
            />
            <TextField
              autoComplete="off"
              label="Title"
              variant="outlined"
              sx={{ width: "50%", mx: "auto" }}
              name="title"
              value={product.title}
              onChange={onChangeHandler}
            />
            <Stack direction="row" spacing={5}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleSaveBtnClick}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleBackBtnClick}
              >
                Back
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
};

export default AddProduct;
