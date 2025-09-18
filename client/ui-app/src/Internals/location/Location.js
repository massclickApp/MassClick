import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocation, createLocation } from "../../redux/actions/locationAction.js";
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
    IconButton
} from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

export default function Location() {
    const dispatch = useDispatch();
    const { location = [], loading, error } = useSelector(
        (state) => state.locationReducer || {}
    );


    const [formData, setFormData] = useState({
        country: "",
        state: "",
        district: "",
        city: "",
        pincode: "",
        addressLine1: "",
        addressLine2: "",
    });

    useEffect(() => {
        dispatch(getAllLocation());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createLocation(formData))
            .then(() => {
                setFormData({
                    country: "",
                    state: "",
                    district: "",
                    city: "",
                    pincode: "",
                    addressLine1: "",
                    addressLine2: "",

                });
                dispatch(getAllLocation());
            })
            .catch((err) => console.error("Create location failed:", err));
    };
    const handleEdit = (row) => {
        console.log("Edit row:", row);
    };

    const handleDelete = (row) => {
        console.log("Delete row:", row);
    };
    const rows = location.map((location, index) => ({
        id: location._id || index,
        country: location.country,
        state: location.state,
        district: location.district,
        city: location.city,
        pincode: location.pincode || "-",
        addressLine1: location.addressLine1 || "-",
        addressLine2: location.addressLine2 || "-",

    }));

    const locationList = [
        { field: "country", headerName: "Country", flex: 1 },
        { field: "state", headerName: "State", flex: 1 },
        { field: "district", headerName: "District", flex: 1 },
        { field: "city", headerName: "City", flex: 1 },
        { field: "pincode", headerName: "Pincode", flex: 1 },
        { field: "addressLine1", headerName: "AddressLine1", flex: 1 },
        { field: "addressLine2", headerName: "AddressLine2", flex: 1 },
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
        { label: "Country", name: "country", required: true, type: "text" },
        { label: "State", name: "state", required: true, type: "text" },
        { label: "District", name: "district", required: true, type: "text" },
        { label: "City", name: "city", required: true, type: "text" },
        { label: "PinCode", name: "pincode", required: true, type: "text" },
        { label: "AddressLine1", name: "addressLine1", required: true, type: "text" },
        { label: "AddressLine2", name: "addressLine2", required: true, type: "text" },

    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Add New Location
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {fields.map((field, i) => (
                            <Grid
                                item
                                xs={12}
                                // sm={field.name === "userName" || field.name === "contact" ? 6 : 12}
                                key={i}
                            >
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
                                    display: 'flex',
                                    justifyContent: { xs: 'flex-end', sm: 'flex-start' },
                                    mt: 4,
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    sx={{ minWidth: 150 }}
                                >
                                    {loading ? <CircularProgress size={24} /> : "Create Location"}
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

            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Location Table
                </Typography>
                <Box sx={{ height: 500, width: "100%" }}>
                    <CustomizedDataGrid rows={rows} columns={locationList} />
                </Box>
            </Paper>
        </Container>
    );
}