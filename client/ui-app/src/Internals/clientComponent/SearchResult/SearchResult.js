
import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    Button,
    Chip,
    TextField,
    Stack,
    MenuItem,
    Divider,
    CardMedia,
    CardContent
} from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import StarIcon from '@mui/icons-material/Star';
import SortIcon from '@mui/icons-material/Sort';
import TuneIcon from '@mui/icons-material/Tune';
import GppGoodIcon from '@mui/icons-material/GppGood';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CardsSearch from '../CardsSearch/CardsSearch';

const MassclickColors = {
    PrimaryOrange: '#F98B22',
    PrimaryOrangeDark: '#e0791e',
    SecondaryBlue: '#0070c0',
    SuccessGreen: '#4caf50',
    BackgroundLight: '#f0f2f5',
    CardBackground: '#ffffff',
    AccentGray: '#e0e0e0',
};


const FilterBar = () => {
    return (
        <Stack
            direction="row"
            spacing={{ xs: 0.5, sm: 1.5 }}
            sx={{
                mb: 4,
                p: { xs: 1, sm: 2 },
                flexWrap: 'wrap',
                gap: { xs: 1, sm: 1.5 },
                bgcolor: MassclickColors.CardBackground,
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            }}
        >
            <Button
                variant="outlined"
                startIcon={<SortIcon />}
                size="medium"
                sx={{
                    color: MassclickColors.PrimaryOrange,
                    borderColor: MassclickColors.PrimaryOrange,
                    fontWeight: 600,
                    borderRadius: '8px',
                    '&:hover': {
                        bgcolor: MassclickColors.PrimaryOrange,
                        color: 'white',
                        borderColor: MassclickColors.PrimaryOrangeDark
                    }
                }}
            >
                Sort By
            </Button>

            <Chip
                label="Top Rated"
                icon={<StarIcon />}
                clickable
                sx={{
                    bgcolor: MassclickColors.PrimaryOrange,
                    color: 'white',
                    fontWeight: 600,
                    height: 36,
                    borderRadius: '8px',
                    '&:hover': { bgcolor: MassclickColors.PrimaryOrangeDark }
                }}
            />

            <Chip
                label="Verified"
                icon={<GppGoodIcon />}
                clickable
                sx={{
                    color: MassclickColors.SecondaryBlue,
                    bgcolor: MassclickColors.BackgroundLight,
                    borderColor: MassclickColors.SecondaryBlue,
                    fontWeight: 600,
                    height: 36,
                }}
                variant="outlined"
            />

            <Chip label="Deals" icon={<PriceCheckIcon />} clickable variant="outlined" sx={{ height: 36, fontWeight: 500 }} />
            <Chip label="Quick Response" icon={<FlashOnIcon />} clickable variant="outlined" sx={{ height: 36, fontWeight: 500 }} />

            <TextField
                select
                label="Rating"
                variant="outlined"
                size="small"
                defaultValue="4.0+"
                sx={{ minWidth: 100, '.MuiOutlinedInput-root': { height: 36, borderRadius: '8px' } }}
            >
                <MenuItem value="4.5+">4.5+ ★</MenuItem>
                <MenuItem value="4.0+">4.0+ ★</MenuItem>
                <MenuItem value="3.0+">3.0+ ★</MenuItem>
            </TextField>

            <Box sx={{ width: { xs: '100%', sm: 'auto' }, mt: { xs: 1, sm: 0 } }}>
                <Button
                    variant="contained"
                    startIcon={<TuneIcon />}
                    size="medium"
                    sx={{
                        bgcolor: MassclickColors.SecondaryBlue,
                        borderRadius: '8px',
                        fontWeight: 700,
                        '&:hover': { bgcolor: MassclickColors.SecondaryBlueDark }
                    }}
                    fullWidth={true}
                >
                    All Filters
                </Button>
            </Box>
        </Stack>
    );
};

const SideContactForm = () => {
    return (
        <Card
            sx={{
                p: 4,
                borderRadius: '16px',
                bgcolor: MassclickColors.CardBackground,
                boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                borderTop: `5px solid ${MassclickColors.PrimaryOrange}`,
            }}
        >
            <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: MassclickColors.PrimaryOrange }}>
                    Instant Price Quotes
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: MassclickColors.SecondaryBlue }}>
                    Digital Marketing Services
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Fill the form to get the best seller list instantly!
                </Typography>
            </Box>

            <Stack spacing={2} sx={{ mb: 3 }}>
                <TextField
                    placeholder="Your Name"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    sx={{
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': { borderRadius: '8px', bgcolor: MassclickColors.BackgroundLight },
                        '& .MuiOutlinedInput-input': { fontWeight: 600 },
                    }}
                    InputProps={{ startAdornment: <Box sx={{ pr: 1 }}>👤</Box> }}
                />
                <TextField
                    placeholder="Mobile Number"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    sx={{
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': { borderRadius: '8px', bgcolor: MassclickColors.BackgroundLight },
                        '& .MuiOutlinedInput-input': { fontWeight: 600 },
                    }}
                    InputProps={{ startAdornment: <Box sx={{ pr: 1 }}>📱</Box> }}
                />
            </Stack>

            <Button
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
                sx={{
                    py: 1.5,
                    fontWeight: 800,
                    fontSize: '1rem',
                    borderRadius: '10px',
                    background: `linear-gradient(45deg, ${MassclickColors.PrimaryOrange}, ${MassclickColors.PrimaryOrangeDark})`,
                    boxShadow: `0 4px 15px 0 ${MassclickColors.PrimaryOrange}50`,
                    '&:hover': {
                        opacity: 0.9,
                        background: MassclickColors.PrimaryOrangeDark,
                        transform: 'translateY(-1px)',
                    }
                }}
                fullWidth
            >
                Connect with Top Sellers
            </Button>
        </Card>
    );
};


const BusinessCard = ({ business }) => {

    const businessData = {
        ...business,
        rating: business.rating || 4.0,
        ratingCount: business.ratingCount || 0,
        yearsInBusiness: business.yearsInBusiness || 1,
        isVerified: business.isVerified ?? true,
        isTopSearch: business.isTopSearch ?? false,
        services: business.services || ['Service 1', 'Service 2'],
        imageUrl: business.bannerImage
            ? business.bannerImage.startsWith("data:image")
                ? business.bannerImage
                : `data:image/png;base64,${business.bannerImage}`
            : 'https://via.placeholder.com/120x100?text=Logo',

        phoneNumber: business.phoneNumber || 'N/A',
    };
    const {
        businessName, location, rating, ratingCount, yearsInBusiness,
        isVerified, isTopSearch, services, imageUrl, phoneNumber,
    } = businessData;


    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                mb: 3,
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 15px 30px rgba(0,0,0,0.15)' },
                bgcolor: MassclickColors.CardBackground,
                overflow: 'hidden',
            }}
        >
            <Box sx={{
                display: 'flex', p: 3, flexGrow: 1,
                flexDirection: { xs: 'row', sm: 'row' },
                minWidth: { xs: '100%', md: '65%' },
                alignItems: 'flex-start'
            }}>
                <CardMedia
                    component="img"
                    sx={{
                        width: 100, height: 100,
                        borderRadius: '12px',
                        objectFit: 'cover',
                        border: `2px solid ${MassclickColors.AccentGray}`,
                        mr: 3,
                        flexShrink: 0
                    }}
                    image={imageUrl}
                    alt={`${businessName} logo`}
                />

                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                        <Typography variant="h5" component="div" sx={{ fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.5rem' }, color: '#222' }}>
                            {businessName}
                        </Typography>
                        {isTopSearch && (
                            <Chip
                                label="Featured"
                                size="small"
                                sx={{
                                    bgcolor: MassclickColors.PrimaryOrange,
                                    color: 'white',
                                    fontWeight: 700,
                                    height: 24,
                                    borderRadius: '4px'
                                }}
                            />
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1.5 }}>
                        <Chip
                            icon={<StarIcon sx={{ color: 'white!important', fontSize: 18 }} />}
                            label={`${rating} (${ratingCount})`}
                            size="medium"
                            sx={{
                                bgcolor: MassclickColors.SuccessGreen,
                                color: 'white',
                                fontWeight: 700,
                                pr: 1.5,
                                height: 32,
                                borderRadius: '6px'
                            }}
                        />
                        {isVerified && (
                            <Chip
                                icon={<VerifiedUserIcon />}
                                label="JD Verified"
                                size="medium"
                                sx={{
                                    color: MassclickColors.SecondaryBlue,
                                    bgcolor: MassclickColors.BackgroundLight,
                                    borderColor: MassclickColors.SecondaryBlue,
                                    fontWeight: 700,
                                    height: 32,
                                    borderRadius: '6px'
                                }}
                                variant="outlined"
                            />
                        )}
                    </Box>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 0.5, sm: 3 }}
                        sx={{ mb: 2 }}
                    >
                        <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                            <LocationOnIcon sx={{ fontSize: 18, mr: 0.5, color: MassclickColors.SecondaryBlue }} />
                            {location || 'N/A'}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
                            <AccessTimeIcon sx={{ fontSize: 18, mr: 0.5, color: MassclickColors.PrimaryOrange }} />
                            **{yearsInBusiness}** Years in Business
                        </Typography>
                    </Stack>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary', mr: 1, display: { xs: 'none', sm: 'block' } }}>Services:</Typography>
                        {services.slice(0, 4).map((service, index) => (
                            <Chip
                                key={index}
                                label={service}
                                size="small"
                                variant="outlined"
                                sx={{
                                    color: 'text.primary',
                                    borderColor: MassclickColors.AccentGray,
                                    fontWeight: 500,
                                    borderRadius: '4px',
                                    transition: 'background-color 0.2s',
                                    '&:hover': { bgcolor: MassclickColors.BackgroundLight }
                                }}
                            />
                        ))}
                    </Box>
                </CardContent>
            </Box>

            <Box
                sx={{
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center',
                    gap: 1.5, p: { xs: 3, md: 4 }, minWidth: { xs: '100%', md: '280px' },
                    backgroundColor: { xs: 'transparent', md: MassclickColors.BackgroundLight },
                    borderLeft: { xs: 'none', md: `1px solid ${MassclickColors.AccentGray}` },
                    borderTop: { xs: `1px solid ${MassclickColors.AccentGray}`, md: 'none' },
                }}
            >
                <Button variant="contained" startIcon={<PhoneIcon />} href={`tel:${phoneNumber}`}
                    sx={{
                        bgcolor: MassclickColors.SuccessGreen,
                        '&:hover': { bgcolor: '#388e3c' },
                        width: '100%',
                        fontWeight: 700,
                        py: 1.2,
                        borderRadius: '10px'
                    }}>
                    CALL NOW
                </Button>
                <Button variant="contained" startIcon={<WhatsAppIcon />}
                    sx={{
                        bgcolor: '#25D366',
                        '&:hover': { bgcolor: '#1ba549' },
                        width: '100%',
                        fontWeight: 700,
                        py: 1.2,
                        borderRadius: '10px'
                    }}>
                    WhatsApp
                </Button>
                <Button variant="outlined" startIcon={<PriceCheckIcon />}
                    sx={{
                        color: MassclickColors.SecondaryBlue,
                        borderColor: MassclickColors.SecondaryBlue,
                        '&:hover': { bgcolor: MassclickColors.SecondaryBlue + '10' },
                        width: '100%',
                        fontWeight: 700,
                        py: 1.2,
                        borderRadius: '10px'
                    }}>
                    Get Best Price
                </Button>
            </Box>
        </Card>
    );
};


const SearchResults = () => {
    const { location: locParam, category: catParam, searchTerm: termParam } = useParams();
    const locationState = useLocation();

    const results = locationState.state?.results || [];

    return (
        <>                    <CardsSearch />
        
        <Box sx={{
            minHeight: '100vh',
            bgcolor: MassclickColors.BackgroundLight,
            pt: 5,
            pb: 5
        }}>
            <Box sx={{ p: 3, maxWidth: '1400px', margin: 'auto', bgcolor: 'transparent' }}>

                
                <FilterBar />

                <Divider sx={{ mb: 4, bgcolor: MassclickColors.AccentGray }} />

                <Grid container spacing={4}>
                    <Grid item xs={12} lg={8}>
                        {results.length === 0 ? (
                            <Card sx={{ p: 4, textAlign: 'center', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
                                <Typography variant="h6" color="text.secondary">
                                    No businesses found matching your criteria.
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Please try broadening your search or use the filters above.
                                </Typography>
                            </Card>
                        ) : (
                            <Box>
                                {results.map((business, index) => (
                                    <BusinessCard key={business._id || index} business={business} />
                                ))}
                            </Box>
                        )}
                    </Grid>

                    <Grid item xs={12} lg={4} sx={{ display: { xs: 'none', lg: 'block' } }}>
                        <Box sx={{ position: 'sticky', top: 80, pt: 0 }}>
                            <SideContactForm />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
        </>
    );
};

export default SearchResults;