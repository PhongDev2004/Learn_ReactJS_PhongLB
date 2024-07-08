import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import InputField from "src/components/elements/InputField";
import { Category, ProductForm } from "src/types/Product";

type ProductFormProps = {
  onSubmit: (values: ProductForm) => void;
  initialValues?: any;
  categories: Category[];
  submitButtonLabel: string;
};

const ProductFormComponent = ({
  onSubmit,
  initialValues,
  categories,
  submitButtonLabel,
}: ProductFormProps) => {
  const validate = (values: ProductForm) => {
    const errors: ValidationErrors = {};
    const { title, price } = values;
    if (!title) errors.title = "Please enter a title";
    if (price === undefined || price <= 0)
      errors.price = "Please enter a price greater than or equal to 0";
    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ values }) => (
        <Stack maxWidth={"400px"} gap={3}>
          <InputField name="title" label="Title" />
          <InputField name="price" label="Price" type="number" />
          <InputField name="description" label="Description" />
          <InputField name="image" label="Image" />
          <Field<boolean> name="isShow" type="checkbox">
            {({ input }) => (
              <FormControlLabel
                control={<Checkbox {...input} />}
                label="Show Product"
              />
            )}
          </Field>
          <Field<string> name="category">
            {({ input }) => (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select label="Category" {...input}>
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Field>
          <Button
            type="submit"
            variant="contained"
            onClick={() => onSubmit(values)}
          >
            {submitButtonLabel}
          </Button>
        </Stack>
      )}
    />
  );
};

export default ProductFormComponent;
