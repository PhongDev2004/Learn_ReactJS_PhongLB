import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductFormComponent from "src/components/ProductForm";
import { Category, Product, ProductForm } from "src/types/Product";

function AdminProductEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async (id: string) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const handleSubmit = async (values: ProductForm) => {
    if (!id) return;
    console.log(values);
    await axios.put("/products/" + id, values);
    nav("/admin/product/list");
  };

  return (
    <>
      <Container>
        <Typography variant="h2" mb={3}>
          Add product
        </Typography>
        <ProductFormComponent
          onSubmit={handleSubmit}
          categories={categories}
          submitButtonLabel="Edit Product"
          initialValues={product}
        />
      </Container>
    </>
  );
}

export default AdminProductEdit;
