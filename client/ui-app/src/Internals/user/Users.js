import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, createUser, editUser, deleteUser } from "../../redux/actions/userAction.js";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

export default function User() {
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector((state) => state.userReducer || {});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    userName: "",
    contact: "",
    businessLocation: "",
    businessCategory: "",
    emailId: "",
    role: "",
  });

  // 🔹 Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (isEditMode && editUserId) {
      dispatch(editUser(editUserId, formData))
        .then(() => {
          resetForm();
          dispatch(getAllUsers());
        })
        .catch((err) => console.error("Update user failed:", err));
    } else {
      dispatch(createUser(formData))
        .then(() => {
          resetForm();
          dispatch(getAllUsers());
        })
        .catch((err) => console.error("Create user failed:", err));
    }
  };
  const validateForm = () => {
    let newErrors = {};
    if (!formData.userName) newErrors.userName = "User Name is required";
    if (!formData.contact) newErrors.contact = "Contact is required";
    if (!formData.emailId) newErrors.emailId = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.emailId)) newErrors.emailId = "Invalid email format";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.businessLocation) newErrors.businessLocation = "Business Location is required";
    if (!formData.businessCategory) newErrors.businessCategory = "Business Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleEdit = (row) => {
    setFormData({
      userName: row.userName,
      contact: row.contact,
      role: row.role,
      emailId: row.emailId,
      businessLocation: row.businessLocation,
      businessCategory: row.businessCategory,
    });
    setEditUserId(row.id);
    setIsEditMode(true);
  };

  const resetForm = () => {
    setFormData({
      userName: "",
      contact: "",
      businessLocation: "",
      businessCategory: "",
      emailId: "",
      role: "",
    });
    setEditUserId(null);
    setIsEditMode(false);
  };

  const handleDeleteClick = (row) => {
    setSelectedUser(row);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      dispatch(deleteUser(selectedUser.id))
        .then(() => {
          dispatch(getAllUsers());
          setDeleteDialogOpen(false);
          setSelectedUser(null);
        })
        .catch((err) => console.error("Delete failed:", err));
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const rows = users
    .filter((user) => user.isActive)
    .map((user, index) => ({
      id: user._id || index,
      userName: user.userName,
      contact: user.contact,
      emailId: user.emailId,
      role: user.role,
      businessLocation: user.businessLocation || "-",
      businessCategory: user.businessCategory || "-",
      isActive: user.isActive,

    }));

  const userList = [
    { field: "userName", headerName: "User Name", flex: 1 },
    { field: "emailId", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "businessLocation", headerName: "Business Location", flex: 1 },
    { field: "businessCategory", headerName: "Business Category", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <IconButton color="primary" size="small" onClick={() => handleEdit(params.row)}>
            <EditRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton color="error" size="small" onClick={() => handleDeleteClick(params.row)}>
            <DeleteOutlineRoundedIcon fontSize="small" />
          </IconButton>
        </div>
      ),
    },
  ];

  const fields = [
    { label: "UserName", name: "userName", required: true, type: "text" },
    { label: "Contact", name: "contact", required: true, type: "text" },
    { label: "Role", name: "role", required: true, type: "text" },
    { label: "EmailId", name: "emailId", required: true, type: "email" },
    { label: "BusinessLocation", name: "businessLocation", required: true, type: "text" },
    { label: "BusinessCategory", name: "businessCategory", required: true, type: "text" },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {isEditMode ? "Edit User" : "Add New User"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {fields.map((field, i) => (
              <Grid item xs={12} sm={field.name === "userName" || field.name === "contact" ? 6 : 12} key={i}>
                <TextField
                  fullWidth
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  variant="standard"
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={Boolean(errors[field.name])}
                  helperText={errors[field.name] || ""}
                  sx={{
                    "& .MuiInputBase-root": { height: 50, fontSize: "1.1rem" },
                    "& .MuiInputLabel-root": { fontSize: "1rem" },
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-end', sm: 'flex-start' }, mt: 4 }}>
                <Button type="submit" variant="contained" disabled={loading} sx={{ minWidth: 150 }}>
                  {loading ? <CircularProgress size={24} /> : isEditMode ? "Update User" : "Create User"}
                </Button>
                {isEditMode && (
                  <Button variant="outlined" color="secondary" onClick={resetForm} sx={{ ml: 2 }}>
                    Cancel
                  </Button>
                )}
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

      {/* User Table */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          User Table
        </Typography>
        <Box sx={{ height: 500, width: "100%" }}>
          <CustomizedDataGrid rows={rows} columns={userList} />
        </Box>
      </Paper>

      {/* 🔹 Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{selectedUser?.userName || "this user"}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
