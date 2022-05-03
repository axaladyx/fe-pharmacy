import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  OutlinedInput,
} from "@mui/material";

function ProductDetails() {
  const [product, setProduct] = useState({ priceStrip: "" });
  const [categories, setCategories] = useState([]);
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const onEditClick = () => {
    setIsEdit(true);
  };

  const onSaveClick = () => {
    updateData();
    setIsEdit(false);
  };

  const onCancelClick = () => {
    setIsEdit(false);
  };

  const updateData = async () => {
    try {
      const formData = new FormData();
      formData.append("id", product.id);
      formData.append("productPhoto", image);
      formData.append("productName", product.productName);
      formData.append("priceStrip", product.priceStrip);
      formData.append("dose", product.dose);
      formData.append("description", product.description);
      formData.append("category_id", product.category_id);
      formData.append("isLiquid", product.isLiquid);
      if (product.isLiquid === 1) {
        formData.append("qtyBoxTotal", product.qtyBoxTotal);
        formData.append("qtyBottleTotal", product.qtyStripTotal);
      } else {
        formData.append("qtyBoxTotal", product.qtyBoxTotal);
        formData.append("qtyStripTotal", product.qtyStripTotal);
        formData.append("qtyPcsTotal", product.qtyPcsTotal);
      }
      const res = await axios.put(`/products/${params.id}`, formData);
      console.log(params.id);
      alert("Update Data Success");
      window.location.reload();
      console.log({ res });
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/products/${params.category}/${params.id}`);
      const { data } = res;
      setProduct(data.result[0]);
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`/categories`);
      const { data } = res;
      setCategories(data);
    } catch (error) {
      console.log(alert(error.message));
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [isEdit]);

  const type = product.isLiquid ? "ml" : "mg";

  return (
    <Box sx={{ padding: "0 24px 0 24px", ml: "240px" }}>
      {!isEdit ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            mt: "20px",
          }}
        >
          <img src={product.productPhoto} alt="Gambar Obat" width={320} />
          <Box padding="24px 0 0 64px" sx={{ width: "40%" }}>
            <Typography variant="h4" fontWeight={600}>
              {product.productName} {product.dose}
              {type}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: "12px",
                borderBottom: "1px solid black",
                paddingBottom: "12px",
              }}
            >
              Rp{product.priceStrip.toLocaleString("id")}
            </Typography>
            <Box>
              <Box paddingBottom="12px" borderBottom={1} mb="20px">
                <Typography variant="h5" mb="4px">
                  Category
                </Typography>
                <Typography variant="h6">{product.name}</Typography>
              </Box>
              <Box borderBottom={1} paddingBottom="12px" mb="20px">
                <Typography variant="h5" mb="4px">
                  Description
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "18px" }}>
                  {product.description}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="h5">Stock</Typography>
            </Box>
            {product.isLiquid ? (
              <Box display="flex" justifyContent="space-around" mt="12px">
                <Box display="flex" justifyContent="space-between" width="72px">
                  <Typography variant="h6">Box :</Typography>
                  <Typography variant="h6">{product.qtyBoxTotal}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" width="88px">
                  <Typography variant="h6">Bottle :</Typography>
                  <Typography variant="h6">{product.qtyStripTotal}</Typography>
                </Box>
              </Box>
            ) : (
              <Box display="flex" justifyContent="space-around" mt="12px">
                <Box display="flex" justifyContent="space-between" width="72px">
                  <Typography variant="h6">Box :</Typography>
                  <Typography variant="h6">{product.qtyBoxTotal}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" width="72px">
                  <Typography variant="h6">Strip :</Typography>
                  <Typography variant="h6">{product.qtyStripTotal}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" width="72px">
                  <Typography variant="h6">Pcs :</Typography>
                  <Typography variant="h6">{product.qtyPcsTotal}</Typography>
                </Box>
              </Box>
            )}

            <Box display="flex" justifyContent="center" mt="32px" mb="24px">
              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={onEditClick}
                sx={{
                  width: "80px",
                  color: "white",
                  backgroundColor: "#ff5252",
                }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            mt: "20px",
          }}
        >
          <Box>
            <img src={product.productPhoto} alt="Gambar Obat" width={320} />
            <Box>
              <input type="file" onChange={onImageChange} />
            </Box>
          </Box>
          <Box padding="24px 0 0 64px" sx={{ width: "40%" }}>
            <Box
              display="flex"
              flexWrap="wrap"
              sx={{
                mb: "12px",
                borderBottom: "1px solid black",
                paddingBottom: "12px",
              }}
            >
              <TextField
                variant="outlined"
                label={null}
                name="productName"
                value={product.productName}
                onChange={handleChange}
                size="small"
                sx={{ width: "200px", mr: "24px" }}
              />

              <TextField
                name="dose"
                value={product.dose}
                onChange={handleChange}
                size="small"
                sx={{ width: "64px" }}
              />
              <TextField
                name="priceStrip"
                value={product.priceStrip}
                onChange={handleChange}
                size="small"
                sx={{ width: "200px" }}
              />
            </Box>
            <Box>
              <Box paddingBottom="12px" borderBottom={1} mb="20px">
                <Typography variant="h5" mb="4px">
                  Category
                </Typography>
                <Select
                  defaultValue={product.category_id}
                  name="category_id"
                  onChange={handleChange}
                  sx={{ width: "200px" }}
                  size="small"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box borderBottom={1} paddingBottom="12px" mb="20px">
                <Typography variant="h5" mb="4px">
                  Description
                </Typography>
                <TextField
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  size="small"
                  multiline
                  rows={5}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant="h5">Stock</Typography>
            </Box>
            {product.isLiquid ? (
              <Box display="flex" justifyContent="space-around" mt="12px">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="120px"
                >
                  <Typography variant="h6">Box :</Typography>
                  <TextField
                    name="qtyBoxTotal"
                    value={product.qtyBoxTotal}
                    onChange={handleChange}
                    type="number"
                    size="small"
                    sx={{ width: "62px" }}
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="138px"
                >
                  <Typography variant="h6">Bottle :</Typography>
                  <TextField
                    name="qtyStripTotal"
                    value={product.qtyStripTotal}
                    onChange={handleChange}
                    type="number"
                    size="small"
                    sx={{ width: "62px" }}
                  />
                </Box>
              </Box>
            ) : (
              <Box display="flex" justifyContent="space-around" mt="12px">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="120px"
                >
                  <Typography variant="h6">Box :</Typography>
                  <TextField
                    name="qtyBoxTotal"
                    value={product.qtyBoxTotal}
                    onChange={handleChange}
                    type="number"
                    size="small"
                    sx={{ width: "62px" }}
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="120px"
                >
                  <Typography variant="h6">Strip :</Typography>
                  <TextField
                    name="qtyStripTotal"
                    value={product.qtyStripTotal}
                    onChange={handleChange}
                    type="number"
                    size="small"
                    sx={{ width: "62px" }}
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="120px"
                >
                  <Typography variant="h6">Pcs :</Typography>
                  <TextField
                    name="qtyPcsTotal"
                    value={product.qtyPcsTotal}
                    onChange={handleChange}
                    type="number"
                    size="small"
                    sx={{ width: "62px" }}
                  />
                </Box>
              </Box>
            )}

            <Box
              display="flex"
              justifyContent="space-around"
              mt="32px"
              mb="24px"
            >
              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={onSaveClick}
                sx={{
                  width: "80px",
                  color: "white",
                  backgroundColor: "#ff5252",
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                size="small"
                color="warning"
                onClick={onCancelClick}
                sx={{
                  width: "80px",
                  color: "white",
                  backgroundColor: "#ff5252",
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ProductDetails;