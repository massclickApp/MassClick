// SearchResults.jsx

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  Stack,
  MenuItem,
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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// --- MASSCKICK COLOR PALETTE DEFINITION ---
const MassclickColors = {
    PrimaryOrange: '#F98B22', // Main accent color
    SecondaryBlue: '#0070c0', // Used for 'Get Best Price' and verification
    SuccessGreen: '#4caf50', // Standard green for phone/WhatsApp
};


// --- 1. Filter and Sorting Bar Component (using Massclick colors) ---
const FilterBar = () => {
  return (
    <Stack 
        direction="row" 
        spacing={{ xs: 0.5, sm: 1.5 }} 
        sx={{ mb: 4, flexWrap: 'wrap', gap: { xs: 1, sm: 1.5 } }} 
    >
      <Button 
        variant="outlined" 
        startIcon={<SortIcon />} 
        size="small"
        sx={{ 
            color: MassclickColors.PrimaryOrange, 
            borderColor: MassclickColors.PrimaryOrange,
            '&:hover': { bgcolor: MassclickColors.PrimaryOrange, color: 'white' }
        }}
      >
        Sort
      </Button>
      <Chip 
        label="Top Rated" 
        icon={<StarBorderIcon />} 
        clickable 
        sx={{ bgcolor: MassclickColors.PrimaryOrange, color: 'white', fontWeight: 600, '&:hover': { bgcolor: '#e0791e' } }}
      />
      
      <Chip label="Quick Response" icon={<FlashOnIcon />} clickable variant="outlined"/>
      
      <Chip 
        label="JD Verified" 
        icon={<GppGoodIcon />} 
        clickable 
        variant="outlined" 
        sx={{ color: MassclickColors.SecondaryBlue, borderColor: MassclickColors.SecondaryBlue }}
      />
      
      <Chip label="Deals" icon={<PriceCheckIcon />} clickable variant="outlined"/>
      <Chip label="JD Trust" icon={<AccountBalanceIcon />} clickable variant="outlined"/>

      <TextField 
        select 
        label="Ratings" 
        variant="outlined" 
        size="small" 
        defaultValue="3.0+"
        sx={{ minWidth: 100 }}
      >
        <MenuItem value="4.5+">4.5+</MenuItem>
        <MenuItem value="4.0+">4.0+</MenuItem>
        <MenuItem value="3.0+">3.0+</MenuItem>
      </TextField>

      <Box sx={{ width: { xs: '100%', sm: 'auto' }, mt: { xs: 1, sm: 0 } }}>
          <Button 
            variant="contained" 
            startIcon={<TuneIcon />} 
            size="small" 
            sx={{ 
                ml: { xs: 0, sm: 'auto' }, 
                bgcolor: MassclickColors.PrimaryOrange,
                '&:hover': { bgcolor: '#e0791e' }
            }} 
            fullWidth={true} 
          >
            All Filters
          </Button>
      </Box>
    </Stack>
  );
};

// --- 2. Side Contact Form Component ---
const SideContactForm = () => {
    return (
        <Card 
            sx={{ 
                p: 3, 
                borderRadius: '16px', 
                bgcolor: 'white', 
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)', 
            }}
        >
            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Get the List of Top
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: MassclickColors.SecondaryBlue }}>
                    Digital Marketing Services
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    We'll send you contact details in seconds for free
                </Typography>
            </Box>

            <Stack spacing={2} sx={{ mb: 2 }}>
                <TextField 
                    placeholder="Name" 
                    variant="outlined" 
                    size="medium"
                    fullWidth
                    InputProps={{ startAdornment: <Box sx={{ pr: 1 }}>👤</Box> }}
                />
                <TextField 
                    placeholder="Mobile Number" 
                    variant="outlined" 
                    size="medium" 
                    fullWidth
                    InputProps={{ startAdornment: <Box sx={{ pr: 1 }}>📱</Box> }}
                />
            </Stack>

            <Button
                variant="contained"
                sx={{ 
                    py: 1.5, 
                    fontWeight: 700, 
                    fontSize: '1rem',
                    bgcolor: MassclickColors.SecondaryBlue,
                    '&:hover': { bgcolor: '#005f9e' }
                }}
                fullWidth
            >
                Get Verified Sellers &gt;&gt;
            </Button>
        </Card>
    );
};


// --- 3. BusinessCard Component ---
const BusinessCard = ({ business }) => {
    const businessData = {
        ...business,
        rating: business.rating || 4.7,
        ratingCount: business.ratingCount || 42,
        yearsInBusiness: business.yearsInBusiness || 7,
        isVerified: business.isVerified ?? true,
        isTopSearch: business.isTopSearch ?? true,
        services: business.services || ['Outdoor Services', 'Videography', 'Digital Marketing'],
        imageUrl: business.imageUrl || 'https://via.placeholder.com/120x100?text=Logo', 
        phoneNumber: business.phoneNumber || '09054430435',
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
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)', 
                transition: 'all 0.3s ease-in-out',
                '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 20px rgba(0,0,0,0.12)' },
                bgcolor: 'white',
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
                        width: 80, height: 80, 
                        borderRadius: '8px', objectFit: 'contain',
                        border: '1px solid #eee', mr: 2, flexShrink: 0 
                    }}
                    image={imageUrl}
                    alt={`${businessName} logo`}
                />
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1rem', md: '1.3rem' } }}>
                            {businessName}
                        </Typography>
                        {isTopSearch && (
                            <Chip label="Top Search" size="small" sx={{ bgcolor: MassclickColors.PrimaryOrange, color: 'white', fontWeight: 600, height: 20 }}/>
                        )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1.5 }}>
                        <Chip
                            icon={<StarIcon sx={{ color: 'white!important', fontSize: 16 }} />}
                            label={`${rating} (${ratingCount} Ratings)`}
                            size="small"
                            sx={{ bgcolor: MassclickColors.SuccessGreen, color: 'white', fontWeight: 600, pr: 1.5 }}
                        />
                        {isVerified && (
                            <Chip 
                                icon={<VerifiedUserIcon />} 
                                label="JD Verified" 
                                size="small" 
                                variant="outlined" 
                                sx={{ color: MassclickColors.SecondaryBlue, borderColor: MassclickColors.SecondaryBlue, fontWeight: 600 }}
                            />
                        )}
                    </Box>
                    
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' }, 
                            alignItems: { xs: 'flex-start', sm: 'center' }, 
                            mb: 2, 
                            gap: { xs: 0.5, sm: 3 }
                        }}
                    >
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
                            <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            {location || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
                            <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            {yearsInBusiness} Years in Business
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {services.slice(0, 4).map((service, index) => (
                            <Chip key={index} label={service} size="small" variant="outlined" sx={{ color: 'text.primary', borderColor: '#ddd', fontWeight: 500, borderRadius: '4px'}}/>
                        ))}
                    </Box>
                </CardContent>
            </Box>
            
            <Box
                sx={{
                    display: 'flex', flexDirection: 'column', 
                    justifyContent: 'center', alignItems: 'center',
                    gap: 1.5, p: { xs: 2, md: 3 }, minWidth: { xs: '100%', md: '240px' },
                    backgroundColor: { xs: 'transparent', md: '#f8f9fa' },
                    borderLeft: { xs: 'none', md: '1px solid rgba(0, 0, 0, 0.05)' }, 
                    borderTop: { xs: '1px solid rgba(0, 0, 0, 0.05)', md: 'none' },
                }}
            >
                <Button variant="contained" startIcon={<PhoneIcon />} href={`tel:${phoneNumber}`}
                    sx={{ bgcolor: MassclickColors.SuccessGreen, '&:hover': { bgcolor: '#388e3c' }, width: '100%', fontWeight: 600}}>
                    {phoneNumber}
                </Button>
                <Button variant="outlined" startIcon={<WhatsAppIcon />}
                    sx={{ color: '#25D366', borderColor: '#25D366', '&:hover': { bgcolor: '#e8f5e9' }, width: '100%', fontWeight: 600}}>
                    WhatsApp
                </Button>
                <Button variant="contained" startIcon={<PriceCheckIcon />}
                    sx={{ bgcolor: MassclickColors.SecondaryBlue, '&:hover': { bgcolor: '#005f9e' }, width: '100%', fontWeight: 600}}>
                    Get Best Price
                </Button>
            </Box>
        </Card>
    );
};


// --- 4. Main SearchResults Component (Background Color Updated) ---
const SearchResults = () => {
  const { location: locParam, category: catParam, searchTerm: termParam } = useParams();
  const locationState = useLocation();
  const results = locationState.state?.results || [];

  return (
    // **** CHANGED BACKGROUND COLOR HERE ****
    <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: '#f5f7f9',
        pt: 5, 
        pb: 5 
    }}>
        <Box sx={{ p: 3, maxWidth: '1400px', margin: 'auto', bgcolor: 'transparent' }}>
            
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                Popular Digital Marketing Services in Trichy
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
                Showing results for: 
                {termParam !== 'All' && ` "${termParam}"`}
                {catParam !== 'All' && ` | Category: ${catParam}`}
                {locParam !== 'All' && ` | Location: ${locParam}`}
                {results.length > 0 && ` (${results.length} results)`}
            </Typography>

            <FilterBar />

            <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                    {results.length === 0 ? (
                        <Card sx={{ p: 4, textAlign: 'center', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
                            <Typography variant="h6" color="text.secondary">
                            No businesses found matching your criteria.
                            </Typography>
                        </Card>
                    ) : (
                        <Box>
                            {results.map((business) => (
                                <BusinessCard key={business._id || business.businessName} business={business} />
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
  );
};

export default SearchResults;