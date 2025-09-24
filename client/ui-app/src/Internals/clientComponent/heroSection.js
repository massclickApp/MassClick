import React, { useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    InputAdornment,
    IconButton,
    Container,
    Autocomplete
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';
import { styled } from '@mui/system';
import { getAllLocation } from '../../redux/actions/locationAction';
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinessList } from "../../redux/actions/businessListAction";

const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '30px',
        height: '60px',
        backgroundColor: theme.palette.background.default,
        boxShadow: '0px 4px 15px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
            boxShadow: '0px 6px 20px rgba(0,0,0,0.12)',
        },
        '&.Mui-focused': {
            boxShadow: `0 0 0 3px ${theme.palette.primary.light}`,
        }
    },
    '& .MuiInputBase-input': {
        padding: '12px 14px',
        fontSize: '1rem',
    }
}));

const HeroSection = ({ selectedLocation, setSelectedLocation, searchTerm, setSearchTerm }) => {
    const dispatch = useDispatch();
    const { location = [] } = useSelector((state) => state.locationReducer || {});
    const { businessList = [] } = useSelector(
        (state) => state.businessListReducer || {}
    );

    useEffect(() => {
        dispatch(getAllLocation());
        dispatch(getAllBusinessList());
    }, [dispatch]);

    const locationOptions = location.map((loc) => ({
        label: typeof loc.city === 'object' ? loc.city.en : loc.city,
        id: loc._id
    }));

    const businessOptions = businessList.map((bus) => ({
        label: typeof bus.businessName === 'object' ? bus.businessName.en : bus.businessName,
        id: bus._id
    }));

    const selectedLocationObject = locationOptions.find(
        (option) => option.label === selectedLocation
    );

    return (
        <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            p: 4,
                            borderRadius: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                                mb: 3,
                                gap: 2,
                            }}
                        >
                            <Typography
                                variant="h3"
                                component="h1"
                                sx={{ fontWeight: 700, lineHeight: 1.2, flex: '1 1 auto', minWidth: 250 }}
                            >
                                India's Best Local Business Search Engine
                            </Typography>

                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{
                                    bgcolor: 'secondary.main',
                                    color: 'white',
                                    py: 1,
                                    px: 3,
                                    borderRadius: '20px',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    boxShadow: '0px 4px 12px rgba(255, 87, 34, 0.3)',
                                    '&:hover': {
                                        bgcolor: '#e64a19',
                                    },
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Advertise Business
                            </Button>
                        </Box>

                        {/* Description */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                                MassClick provides information on a vast range of businesses, including restaurants, shops, service providers, and more.
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                One of the most widely used local search engines in India, it offers user reviews, ratings, contact details, and directions.
                            </Typography>
                        </Box>

                        {/* Search Bar */}
                        <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <Autocomplete
                                freeSolo
                                disableClearable
                                options={locationOptions}
                                getOptionLabel={(option) => option.label || ''}
                                value={selectedLocationObject || null}
                                onChange={(event, newValue) => {
                                    setSelectedLocation(newValue ? newValue.label : '');
                                }}
                                sx={{
                                    width: { xs: '100%', sm: 250 },
                                    flexShrink: 0
                                }}
                                renderInput={(params) => (
                                    <CustomTextField
                                        {...params}
                                        label="Location"
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationOnIcon sx={{ color: 'text.secondary', fontSize: 24 }} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: params.InputProps.endAdornment,
                                        }}
                                    />
                                )}
                            />

                            <Autocomplete
                                freeSolo
                                fullWidth
                                options={businessOptions}
                                getOptionLabel={(option) => option.label || ''}
                                onChange={(event, newValue) => {
                                    setSearchTerm(newValue ? newValue.label : '');
                                }}
                                renderInput={(params) => (
                                    <CustomTextField
                                        {...params}
                                        placeholder="Search for Spa & Salons"
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: null,
                                            endAdornment: (
                                                <>
                                                    <InputAdornment position="end">
                                                        <IconButton>
                                                            <SearchIcon color="primary" sx={{ fontSize: 28 }} />
                                                        </IconButton>
                                                        <IconButton>
                                                            <MicIcon color="primary" sx={{ fontSize: 28 }} />
                                                        </IconButton>
                                                    </InputAdornment>
                                                </>
                                            ),
                                        }}
                                    />
                                )}
                                renderOption={(props, option) => (
                                    <Box component="li" {...props} key={option.id}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                            <SearchIcon color="primary" sx={{ mr: 2, fontSize: '20px' }} />
                                            <Typography variant="body1">{option.label}</Typography>
                                        </Box>
                                    </Box>
                                )}
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}></Grid>
            </Grid>
        </Container>
    );
};

export default HeroSection;