import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinessList, createBusinessList } from "../../redux/actions/businessListAction";
import { getAllLocation } from "../../redux/actions/locationAction";
import { getAllCategory } from "../../redux/actions/categoryAction";
import CustomizedDataGrid from "../../components/CustomizedDataGrid";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    MenuItem
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

export default function Category() {
    const dispatch = useDispatch();
    const { businessList = [], loading, error } = useSelector(
        (state) => state.businessListReducer || {}
    );
    const { location = [] } = useSelector(
        (state) => state.locationReducer || {}
    );
     const { category = [] } = useSelector(
        (state) => state.categoryReducer || {}
      );
    const fileInputRef = useRef();
    const [businessvalue, setBusinessValue] = useState('');

    const [formData, setFormData] = useState({
        clientId: "",
        businessName: "",
        plotNumber: "",
        street: "",
        pincode: "",
        email: "",
        contact: "",
        contactList: "",
        gstin: "",
        whatsappNumber: "",
        experience: "",
        location: "",
        category: "",
        bannerImage: "",
        googleMap: "",
        website: "",
        facebook: "",
        instagram: "",
        youtube: "",
        pinterest: "",
        twitter: "",
        linkedin: "",
        businessDetails: "",
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

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'link', 'image', 'video'
    ];
    const handleBusinessChange = (content) => {
        setBusinessValue(content);
        setFormData((prev) => ({ ...prev, businessDetails: content }));
    };

    useEffect(() => {
        dispatch(getAllBusinessList());
        dispatch(getAllLocation());
        dispatch(getAllCategory())
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
                setFormData((prev) => ({ ...prev, bannerImage: reader.result }));
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = { ...formData, businessDetails: businessvalue };

        dispatch(createBusinessList(payload))
            .then(() => {
                setFormData({
                    clientId: "",
                    businessName: "",
                    plotNumber: "",
                    street: "",
                    pincode: "",
                    email: "",
                    contact: "",
                    contactList: "",
                    gstin: "",
                    whatsappNumber: "",
                    experience: "",
                    location: "",
                    category: "",
                    bannerImage: "",
                    googleMap: "",
                    website: "",
                    facebook: "",
                    instagram: "",
                    youtube: "",
                    pinterest: "",
                    twitter: "",
                    linkedin: "",
                    businessDetails: "",
                });
                setBusinessValue("");
                setPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                dispatch(getAllBusinessList());
            })
            .catch((err) => console.error("Create BusinessList failed:", err));
    };


    const rows = businessList.map((bl, index) => ({
        id: bl._id || index,
        clientId: bl.clientId || "-",
        businessName: bl.businessName || "-",
        plotNumber: bl.plotNumber || "-",
        street: bl.street || "-",
        pincode: bl.pincode || "-",
        email: bl.email || "-",
        contact: bl.contact || "-",
        contactList: bl.contactList || "-",
        gstin: bl.gstin || "-",
        whatsappNumber: bl.whatsappNumber || "-",
        experience: bl.experience || "-",
        location: bl.location || "-",
        category: bl.category || "-",
        bannerImage: bl.bannerImage || null,
        googleMap: bl.googleMap || "-",
        website: bl.website || "-",
        facebook: bl.facebook || "-",
        instagram: bl.instagram || "-",
        youtube: bl.youtube || "-",
        pinterest: bl.pinterest || "-",
        twitter: bl.twitter || "-",
        linkedin: bl.linkedin || "-",
        businessDetails: bl.businessDetails || "-"
    }));


    const businessListTable = [
        { field: "clientId", headerName: "ClientId", flex: 1 },
        {
            field: "bannerImage",
            headerName: "Banner Image",
            flex: 1,
            renderCell: (params) =>
                params.value ? <Avatar src={params.value} alt="img" /> : "-",
        },
        { field: "businessName", headerName: "Business Name", flex: 1 },
        // { field: "plotNumber", headerName: "Plot Number", flex: 1 },
        // { field: "street", headerName: "Street", flex: 1 },
        // { field: "pincode", headerName: "Pincode", flex: 1 },
        // { field: "email", headerName: "Email", flex: 1 },
        // { field: "contact", headerName: "Contact", flex: 1 },
        // { field: "contactList", headerName: "Contact List", flex: 1 },
        // { field: "gstin", headerName: "GSTIN", flex: 1 },
        // { field: "whatsappNumber", headerName: "Whatsapp Number", flex: 1 },
        // { field: "experience", headerName: "Experience", flex: 1 },
        { field: "location", headerName: "Location", flex: 1 },
        { field: "category", headerName: "Category", flex: 1 },
        { field: "isActive", headerName: "Status", flex: 1 },

        // { field: "googleMap", headerName: "Google Map", flex: 1 },
        // { field: "website", headerName: "Website", flex: 1 },
        // { field: "facebook", headerName: "Facebook", flex: 1 },
        // { field: "instagram", headerName: "Instagram", flex: 1 },
        // { field: "youtube", headerName: "Youtube", flex: 1 },
        // { field: "pinterest", headerName: "Pinterest", flex: 1 },
        // { field: "twitter", headerName: "Twitter", flex: 1 },
        // { field: "linkedin", headerName: "LinkedIn", flex: 1 },
        // { field: "businessDetails", headerName: "Business Details", flex: 1 },
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
                    Add New Business
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={8}>
                        {/* Client ID */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Client ID"
                                name="clientId"
                                variant="standard"
                                value={formData.clientId}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>

                        {/* Business Name */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                label="Business Name"
                                name="businessName"
                                variant="standard"
                                value={formData.businessName}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}

                            />
                        </Grid>

                        {/* Plot Number */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Plot Number"
                                name="plotNumber"
                                variant="standard"
                                value={formData.plotNumber}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}

                            />
                        </Grid>

                        {/* Street */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Street"
                                name="street"
                                variant="standard"
                                value={formData.street}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>

                        {/* Pincode */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Pincode"
                                name="pincode"
                                variant="standard"
                                value={formData.pincode}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>

                        {/* Email */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                variant="standard"
                                value={formData.email}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>

                        {/* Contact */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Contact"
                                name="contact"
                                variant="standard"
                                value={formData.contact}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>

                        {/* Contact List */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Contact List"
                                name="contactList"
                                variant="standard"
                                value={formData.contactList}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>

                        {/* GSTIN */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="GSTIN"
                                name="gstin"
                                variant="standard"
                                value={formData.gstin}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>

                        {/* Whatsapp Number */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Whatsapp Number"
                                name="whatsappNumber"
                                variant="standard"
                                value={formData.whatsappNumber}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>

                        {/* Experience */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                label="Experience"
                                name="experience"
                                variant="standard"
                                value={formData.experience}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />

                        </Grid>

                        {/* Location */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                fullWidth
                                label="Location"
                                name="location"
                                variant="standard"
                                value={formData.location}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            >
                                {location.map((loc) => (
                                    <MenuItem key={loc._id} value={loc.city}>
                                        {loc.city}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>


                        {/* Category */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                select
                                fullWidth
                                label="Category"
                                name="category"
                                variant="standard"
                                value={formData.category}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            >

                                     {category.map((cat) => (
                                    <MenuItem key={cat._id} value={cat.category}>
                                        {cat.category}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* Google Map */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Google Map"
                                name="googleMap"
                                variant="standard"
                                value={formData.googleMap}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>

                        {/* Website */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Website"
                                name="website"
                                variant="standard"
                                value={formData.website}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>

                        {/* Facebook */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Facebook"
                                name="facebook"
                                variant="standard"
                                value={formData.facebook}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>

                        {/* Instagram */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Instagram"
                                name="instagram"
                                variant="standard"
                                value={formData.instagram}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>

                        {/* YouTube */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="YouTube"
                                name="youtube"
                                variant="standard"
                                value={formData.youtube}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>

                        {/* Pinterest */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Pinterest"
                                name="pinterest"
                                variant="standard"
                                value={formData.pinterest}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>

                        {/* Twitter */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Twitter"
                                name="twitter"
                                variant="standard"
                                value={formData.twitter}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>

                        {/* LinkedIn */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="LinkedIn"
                                name="linkedin"
                                variant="standard"
                                value={formData.linkedin}
                                onChange={handleChange}
                                sx={textFieldStyle}
                                style={{ minWidth: 260 }}
                            />
                        </Grid>
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
                        {/* Business Details */}


                    </Grid>
                    <Grid item xs={12}>
                        <ReactQuill
                            theme="snow"
                            value={businessvalue}
                            onChange={handleBusinessChange}
                            modules={modules}
                            formats={formats}
                            placeholder="Type business details here..."
                            style={{ height: '200px' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                mt: 10,
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                sx={{ minWidth: 150 }}
                            >
                                {loading ? <CircularProgress size={24} /> : "Create Business"}
                            </Button>
                        </Box>
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
                    BusinessList Table
                </Typography>
                <Box sx={{ height: 500, width: "100%" }}>
                    <CustomizedDataGrid rows={rows} columns={businessListTable} />
                </Box>
            </Paper>
        </Container>
    );
}