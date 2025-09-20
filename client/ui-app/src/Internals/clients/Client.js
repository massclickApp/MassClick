import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersClient,
  createUserClient,
  editUserClient,
  deleteUserClient,
} from "../../redux/actions/userClientAction.js";
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
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

export default function UserClients() {
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector(
    (state) => state.userClientReducer || {}
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const [formData, setFormData] = useState({
    clientId: "",
    name: "",
    contact: "",
    emailId: "",
    businessName: "",
    businessAddress: "",
  });

  useEffect(() => {
    dispatch(getAllUsersClient());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      clientId: "",
      name: "",
      contact: "",
      emailId: "",
      businessName: "",
      businessAddress: "",
    });
    setIsEditMode(false);
    setEditUserId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode && editUserId) {
      // 🔹 Edit existing client
      dispatch(editUserClient(editUserId, formData))
        .then(() => {
          resetForm();
          dispatch(getAllUsersClient());
        })
        .catch((err) => console.error("Update client failed:", err));
    } else {
      // 🔹 Create new client
      dispatch(createUserClient(formData))
        .then(() => {
          resetForm();
          dispatch(getAllUsersClient());
        })
        .catch((err) => console.error("Create client failed:", err));
    }
  };

  const handleEdit = (row) => {
    setFormData({
      clientId: row.clientId,
      name: row.name,
      contact: row.contact,
      emailId: row.emailId,
      businessName: row.businessName,
      businessAddress: row.businessAddress,
    });
    setEditUserId(row.id);
    setIsEditMode(true);
  };

  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
      dispatch(deleteUserClient(row.id))
        .then(() => dispatch(getAllUsersClient()))
        .catch((err) => console.error("Delete failed:", err));
    }
  };

  const rows = users.map((user, index) => ({
    id: user._id || index,
    clientId: user.clientId,
    name: user.name,
    emailId: user.emailId,
    contact: user.contact,
    businessName: user.businessName || "-",
    businessAddress: user.businessAddress || "-",
  }));

  const clientList = [
    { field: "clientId", headerName: "Client ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "emailId", headerName: "Email", flex: 1 },
    { field: "contact", headerName: "Contact", flex: 1 },
    { field: "businessName", headerName: "Business Name", flex: 1 },
    { field: "businessAddress", headerName: "Business Address", flex: 1 },
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

  const fields = [
    { label: "Client ID", name: "clientId", required: true, type: "text" },
    { label: "Name", name: "name", required: true, type: "text" },
    { label: "Contact", name: "contact", required: true, type: "text" },
    { label: "Email", name: "emailId", required: true, type: "email" },
    { label: "Business Name", name: "businessName", required: true, type: "text" },
    { label: "Business Address", name: "businessAddress", required: true, type: "text" },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Form */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {isEditMode ? "Edit Client" : "Add New Client"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {fields.map((field, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <TextField
                  required={field.required}
                  fullWidth
                  type={field.type}
                  label={field.label}
                  name={field.name}
                  variant="standard"
                  value={formData[field.name]}
                  onChange={handleChange}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 50,
                      fontSize: "1.1rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "1rem",
                    },
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "flex-end", sm: "flex-start" },
                  mt: 4,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ minWidth: 150 }}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : isEditMode ? (
                    "Update Client"
                  ) : (
                    "Create Client"
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {typeof error === "string"
              ? error
              : error.message || JSON.stringify(error)}
          </Typography>
        )}
      </Paper>

      {/* Table */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Client Table
        </Typography>
        <Box sx={{ height: 500, width: "100%" }}>
          <CustomizedDataGrid rows={rows} columns={clientList} />
        </Box>
      </Paper>
    </Container>
  );
}
