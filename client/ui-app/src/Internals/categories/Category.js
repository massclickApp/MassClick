import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, createCategory } from "../../redux/actions/categoryAction";
import CustomizedDataGrid from "../../components/CustomizedDataGrid";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  Avatar,
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Input from '@mui/material/Input';

export default function Category() {
  const dispatch = useDispatch();
  const { category = [], loading, error } = useSelector(
    (state) => state.categoryReducer || {}
  );
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    categoryImage: "",
    category: "",
    categoryType: "",
    subCategoryType: "",
    title: "",
    keywords: "",
    description: "",
  });

  const [preview, setPreview] = useState(null);

  const textFieldStyle = {
    "& .MuiInputBase-root": {
      height: 50,
      fontSize: "1.1rem",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1rem",
    },
  };
  const subCategories = [
    "Services", "Construction Company", "Travels", "Restaurants", "Medical",
    "Events", "Education", "Garments", "Hotels", "Spa", "Real Estate",
    "Interior Designer", "Dealers", "Building Materials", "Shop", "CCTV",
    "Manufacturer", "Hostels"
  ];


  const menuItemStyle = {
    fontSize: "1rem",
    height: "40px",
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (row) => {
    console.log("Edit row:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete row:", row);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, categoryImage: reader.result }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.categoryType === "Sub Category" &&
      !formData.subCategoryType.trim()
    ) {
      alert("Sub Category Type is required!");
      return;
    }

    dispatch(createCategory(formData))
      .then(() => {
        setFormData({
          categoryImage: "",
          category: "",
          categoryType: "",
          subCategoryType: "",
          title: "",
          keywords: "",
          description: "",
        });
        setPreview(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        dispatch(getAllCategory());
      })

      .catch((err) => console.error("Create category failed:", err));
  };

  const rows = category.map((cat, index) => ({
    id: cat._id || index,
    categoryImage: cat.categoryImage,
    category: cat.category,
    categoryType: cat.categoryType,
    subCategoryType: cat.subCategoryType,
    title: cat.title || "-",
    keywords: cat.keywords || "-",
    description: cat.description || "-",
  }));

  const categoryList = [
    {
      field: "categoryImage",
      headerName: "Category Image",
      flex: 1,
      renderCell: (params) =>
        params.value ? <Avatar src={params.value} alt="img" /> : "-"
    },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "categoryType", headerName: "Category Type", flex: 1 },
    { field: "subCategoryType", headerName: "Sub Category Type", flex: 1 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "keywords", headerName: "Keywords", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            <EditRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteOutlineRoundedIcon fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add New Category
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={6}>
            {/* Category Field */}
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Category"
                name="category"
                variant="standard"
                value={formData.category}
                onChange={handleChange}
                sx={textFieldStyle}
              />
            </Grid>

            <FormControl variant="standard" sx={textFieldStyle} style={{ minWidth: 220 }} required>
              <InputLabel id="category-type-label">Category Type</InputLabel>
              <Select
                labelId="category-type-label"
                value={formData.categoryType}
                onChange={(event) =>
                  setFormData({ ...formData, categoryType: event.target.value })
                }
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Primary Category" sx={menuItemStyle}>
                  Primary Category
                </MenuItem>
                <MenuItem value="Sub Category" sx={menuItemStyle}>
                  Sub Category
                </MenuItem>
              </Select>
            </FormControl>

            {formData.categoryType === "Sub Category" && (
              <Grid item xs={12} sm={4}>
                <FormControl variant="standard" sx={textFieldStyle} style={{ minWidth: 220 }} required>
                  <InputLabel id="sub-category-type-label">Sub Category Type</InputLabel>
                  <Select
                    labelId="sub-category-type-label"
                    value={formData.subCategoryType}
                    onChange={(event) =>
                      setFormData({ ...formData, subCategoryType: event.target.value })
                    }
                    input={<Input />}
                  >
                    {subCategories.map((sub) => (
                      <MenuItem key={sub} value={sub} sx={menuItemStyle}>
                        {sub}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}


            {/* Title Field */}
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Title"
                name="title"
                variant="standard"
                value={formData.title}
                onChange={handleChange}
                sx={textFieldStyle}
              />
            </Grid>

            {/* Keywords Field */}
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Keywords"
                name="keywords"
                variant="standard"
                value={formData.keywords}
                onChange={handleChange}
                sx={textFieldStyle}
              />
            </Grid>

            {/* Description Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Description"
                name="description"
                variant="standard"
                value={formData.description}
                onChange={handleChange}
                sx={textFieldStyle}
              />
            </Grid>

            {/* Image Upload Field */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  fullWidth
                  type="file"
                  label="Image"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ accept: "image/*" }}
                  onChange={handleImageChange}
                  variant="standard"
                  sx={textFieldStyle}
                  inputRef={fileInputRef}

                />
                {preview && (
                  <Avatar
                    src={preview}
                    sx={{ width: 56, height: 56 }}
                  />
                )}
              </Box>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: "flex-end",
                  mt: 4,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ minWidth: 150 }}
                >
                  {loading ? <CircularProgress size={24} /> : "Create Category"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {typeof error === "string" ? error : error.message || JSON.stringify(error)}
          </Typography>
        )}
      </Paper>

      {/* Category Table */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Category Table
        </Typography>
        <Box sx={{ height: 500, width: "100%" }}>
          <CustomizedDataGrid rows={rows} columns={categoryList} />
        </Box>
      </Paper>
    </Container>
  );
}