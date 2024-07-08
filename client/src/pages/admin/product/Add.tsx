import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductFormComponent from "src/components/ProductForm";
import { Category, ProductForm } from "src/types/Product";

function AdminProductAdd() {
  const nav = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSubmit = async (values: ProductForm) => {
    console.log(values);
    await axios.post("http://localhost:3000/products", values);
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
          initialValues={{ isShow: true }}
          submitButtonLabel="Add Product"
        />
      </Container>
    </>
  );
}

export default AdminProductAdd;
