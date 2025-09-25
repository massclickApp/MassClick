import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    InputAdornment,
    IconButton,
    Autocomplete,
    Container,
    TextField
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MicIcon from "@mui/icons-material/Mic";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocation } from "../../redux/actions/locationAction";
import { getAllBusinessList } from "../../redux/actions/businessListAction";
import backgroundImage from "../../assets/background.png";

// Refined custom-styled TextField component
const CustomTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: "40px",
        height: "65px",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        boxShadow: "0px 8px 30px rgba(0,0,0,0.15)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255,255,255,0.4)",
        transition: "all 0.4s ease-in-out",
        "&:hover": {
            boxShadow: "0px 12px 40px rgba(0,0,0,0.2)",
            transform: "translateY(-2px)",
        },
        "&.Mui-focused": {
            boxShadow: `0 0 0 4px ${theme.palette.primary.light}, 0px 10px 35px rgba(0,0,0,0.2)`,
            border: `1px solid ${theme.palette.primary.main}`,
        },
    },
    "& .MuiInputBase-input": {
        padding: "15px 25px",
        fontSize: "1.1rem",
        color: "#333",
    },
}));

const HeroSection = ({ selectedLocation, setSelectedLocation, searchTerm, setSearchTerm }) => {
    const dispatch = useDispatch();
    const { location = [] } = useSelector((state) => state.locationReducer || {});
    const { businessList = [] } = useSelector((state) => state.businessListReducer || {});
    const [category, setCategory] = useState('');

    useEffect(() => {
        dispatch(getAllLocation());
        dispatch(getAllBusinessList());
    }, [dispatch]);

    const locationOptions = location.map((loc) => ({
        label: typeof loc.city === "object" ? loc.city.en : loc.city,
        id: loc._id,
    }));

    const businessOptions = businessList.map((bus) => ({
        label: typeof bus.businessName === "object" ? bus.businessName.en : bus.businessName,
        id: bus._id,
    }));



    const selectedLocationObject = locationOptions.find(
        (option) => option.label === selectedLocation
    );

    return (
        <Box
            sx={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
                backgroundSize: "cover", // keeps aspect ratio, fills box
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                minHeight: { xs: "80vh", sm: "85vh", md: "87vh" }, // <-- decreased height
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                textAlign: "center",
                pt: { xs: 6, sm: 8, md: 10 }, // <-- reduced padding to prevent overflow
                overflow: "hidden", // <-- optional: hide any accidental scroll
            }}
        >

            <Container maxWidth={false} disableGutters>
                <Box
                    sx={{
                        p: { xs: 3, sm: 6, md: 8 },
                        width: "100%",
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: { xs: 2, sm: 4 },
                        backgroundColor: "rgba(0,0,0,0.1)",
                        backdropFilter: "blur(3px)",
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            lineHeight: 1.2,
                            background: "linear-gradient(90deg, #FF7B00, #FFD166)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            letterSpacing: "2px",
                            textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
                            fontSize: { xs: "2rem", sm: "3.5rem", md: "4.5rem" },
                        }}
                    >
                        MassClick Find Your Local Business
                    </Typography>
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{
                            color: "white",
                            fontWeight: 400,
                            lineHeight: 1.6,
                            textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
                            fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.2rem" },
                            textAlign: "center",
                            maxWidth: { xs: "100%", sm: 650 },
                            mx: "auto",
                        }}
                    >
                        One of the most widely used local search engines in India, it offers user reviews, ratings, contact details, and directions.
                        <br />
                        MassClick provides information on a vast range of businesses, including restaurants, shops, service providers, and more.
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: { xs: 1.5, sm: 2 },
                            width: { xs: "100%", sm: "85%" },
                            maxWidth: 1000,
                            mt: { xs: 2, sm: 3 },
                            alignSelf: "flex-start",
                            justifyContent: "flex-start",
                            ml: { xs: 0, sm: 30 },

                        }}
                    >
                        {/* FIRST FIELD: Search Term */}
                        <CustomTextField
                            sx={{ flex: 1, minWidth: { xs: '100%', sm: 400 } }}
                            placeholder="Search for Spa, Salons..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon sx={{ color: "text.secondary", fontSize: 24 }} />
                                        <IconButton>
                                            <MicIcon sx={{ color: "#ea6d11" }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* SECOND FIELD: Category */}
                        <Autocomplete
                            freeSolo
                            disableClearable
                            options={businessOptions}
                            getOptionLabel={(option) => option.label || ""}
                            onChange={(event, newValue) => setCategory(newValue ? newValue.label : "")}
                            sx={{ flex: 1, minWidth: { xs: '100%', sm: 350 } }}
                            renderInput={(params) => (
                                <CustomTextField
                                    {...params}
                                    placeholder="Select Category"
                                    InputProps={{ ...params.InputProps }}
                                />
                            )}
                        />

                        {/* THIRD FIELD: Location */}
                        <Autocomplete
                            freeSolo
                            disableClearable
                            options={locationOptions}
                            getOptionLabel={(option) => option.label || ""}
                            value={selectedLocationObject || null}
                            onChange={(event, newValue) => setSelectedLocation(newValue ? newValue.label : "")}
                            sx={{ flex: 1, minWidth: { xs: '100%', sm: 250 } }}
                            renderInput={(params) => (
                                <CustomTextField
                                    {...params}
                                    placeholder="Location"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationOnIcon sx={{ color: "#ea6d11", fontSize: 24 }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />

                        {/* Search Button */}
                        <Button
                            variant="contained"
                            sx={{
                                flexShrink: 0,
                                width: { xs: "100%", sm: "15%" },
                                background: "linear-gradient(45deg, #FF7B00, #FFD166)",
                                color: "white",
                                textTransform: "none",
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                borderRadius: "40px",
                                height: "60px",
                                px: 5,
                                whiteSpace: "nowrap",
                                boxShadow: "0 6px 20px rgba(255, 123, 0, 0.4)",
                                "&:hover": { background: "linear-gradient(45deg, #FF5B00, #FFC044)" },
                            }}
                        >
                            Search
                            <SearchIcon sx={{ ml: 1, fontSize: 28 }} />
                        </Button>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
};

export default HeroSection;
