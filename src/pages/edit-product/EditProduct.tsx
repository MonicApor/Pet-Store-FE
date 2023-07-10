import React, { useState, useEffect } from "react";
import "./editproduct.scss";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IProduct } from "../../types/global.typing";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";

const EditProduct = () => {
  const [product, setProduct] = useState<Partial<IProduct>>({
    title: "",
    brand: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios.get(`${baseUrl}/${id}`).then((response) =>
      setProduct({
        title: response.data.title,
        brand: response.data.brand,
      })
    );
  }, [id]);

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
      .put(`${baseUrl}/${id}`, data)
      .then((response) =>
        navigate("/products", {
          state: { message: "Product Updated Successfully" },
        })
      )
      .catch((error) => alert("Errors"));
  };

  const handleBackBtnClick = () => {
    navigate("/products");
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
              Edit Product
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

export default EditProduct;
