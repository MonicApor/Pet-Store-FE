import React, { useState, useEffect } from "react";
import "./products.scss";
import { IProduct } from "../../types/global.typing";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Modal from "react-modal";

const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [showModal, setshowModal] = useState(false);
  const [deleteItemId, setdeleteItemId] = useState("");

  const redirectToEditPage = (id: string) => {
    navigate(`/products/edit/${id}`);
  };
  const redirectToDeleteProduct = (id: string) => {
    setdeleteItemId(id);
    setshowModal(true);
  };

  const deleteItem = (id: string) => {
    try {
      axios.delete(`${baseUrl}/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      Swal.fire({
        icon: "success",
        title: "Product Deleted Successfully.",
      });
    } catch (error) {
      alert("Errors");
    }
  };

  const handleModalConfirm = () => {
    deleteItem(deleteItemId);
    setshowModal(false);
  };

  const handleModalCancel = () => {
    setshowModal(false);
  };

  const fetchProductsList = async () => {
    try {
      const response = await axios.get<IProduct[]>(baseUrl);
      const productsWithRelativeTime = response.data.map((product) => ({
        ...product,
        formattedCreatedAt: moment(product.createdAt).fromNow(),
        formattedUpdatedAt: moment(product.updatedAt).fromNow(),
      }));

      setProducts(productsWithRelativeTime);

      if (location.state) {
        Swal.fire({
          icon: "success",
          title: location.state.message,
        });
        navigate(location.pathname, { replace: true });
      }
    } catch (error) {
      alert("An Error Happened");
    }
  };

  useEffect(() => {
    fetchProductsList();
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "formattedCreatedAt", headerName: "Created At", width: 300 },
    { field: "formattedUpdatedAt", headerName: "Updated At", width: 300 },
    {
      field: "action",
      headerName: "Action",
      disableColumnMenu: true,
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            aria-label="edit"
            variant="outlined"
            color="warning"
            onClick={() => redirectToEditPage(params.row.id)}
          >
            <EditIcon />
          </Button>
          <Button
            aria-label="delete"
            variant="outlined"
            color="error"
            sx={{ mx: "1rem" }}
            onClick={() => redirectToDeleteProduct(params.row.id)}
          >
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="products">
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", paddingBottom: "2rem" }}
      >
        Products List
      </Typography>
      {products.length === 0 ? (
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", paddingBottom: "2rem" }}
        >
          No Products Available
        </Typography>
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={products}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  page: 0,
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      )}

      <Modal
        isOpen={showModal}
        onRequestClose={handleModalCancel}
        contentLabel="Delete Confirmation"
        className="delete_product"
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 500,
              height: 300,
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
              <Typography variant="h6" sx={{ my: "2rem", fontWeight: "bold" }}>
                Delete Product
              </Typography>
              <Typography variant="subtitle1" sx={{ my: "2rem" }}>
                Are you sure you want to delet this product?{" "}
              </Typography>
              <Stack direction="row">
                <Button
                  onClick={handleModalCancel}
                  variant="outlined"
                  sx={{ marginRight: "2rem" }}
                >
                  Don't delete
                </Button>
                <Button
                  onClick={handleModalConfirm}
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Modal>
    </div>
  );
};

export default Products;
