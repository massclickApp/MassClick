// CategoryBar.js
import React, { useState } from 'react';
import { Box, Container, Button, Select, MenuItem, FormControl, IconButton, useMediaQuery, Menu } from '@mui/material';
import CateringDiningIcon from '@mui/icons-material/RestaurantMenu';
import ListAltIcon from '@mui/icons-material/ListAlt';
import NotificationsIcon from "@mui/icons-material/Notifications";
import CampaignIcon from '@mui/icons-material/Campaign';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import MI from '../../assets/Mi.png';

const categories = [
    { name: 'Language', icon: <CateringDiningIcon /> },
    { name: 'Investor Relation', icon: null },
    { name: 'Leads', icon: <MailIcon /> },
    { name: 'Advertise', icon: <CampaignIcon /> },
    { name: 'Free Listing', icon: <ListAltIcon /> },
    { name: '', icon: <NotificationsIcon /> },
];

const languages = [
    { name: "Tamil", nativeName: "தமிழ்" },
    { name: "English", nativeName: "English" },
    { name: "Hindi", nativeName: "हिन्दी" },
    { name: "Kannada", nativeName: "ಕನ್ನಡ" },
    { name: "Telugu", nativeName: "తెలుగు" }
];

const CategoryBar = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [anchorEl, setAnchorEl] = useState(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCategoryClick = (categoryName) => {
        console.log(`Clicked on: ${categoryName}`);
        handleMenuClose();
    };

    return (
        <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0', py: 1 }}>
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'nowrap',
                    gap: 1
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <img
                            src={MI}
                            alt="Logo"
                            style={{
                                width: isMobile ? 28 : 40,
                                height: isMobile ? 28 : 40,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                            }}
                        />
                        <span style={{
                            fontSize: isMobile ? '1.2rem' : '1.8rem',
                            color: '#ea6d11',
                            fontWeight: 700
                        }}>
                            Mass<span style={{ color: '#ff9c3b' }}>click</span>
                        </span>
                    </Box>

                    <FormControl size="small" sx={{ minWidth: 80, flexShrink: 0 }}>
                        <Select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            displayEmpty
                            sx={{ fontSize: isMobile ? '0.7rem' : '0.9rem' }}
                        >
                            {languages.map(lang => (
                                <MenuItem key={lang.name} value={lang.name}>{lang.nativeName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                
                {isMobile && (
                    <IconButton
                        sx={{ color: 'black' }}
                        onClick={handleMenuClick}
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                
                {isMobile && (
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {categories.map((category, index) => {
                            if (category.name === 'Language' || category.name === '') return null;
                            return (
                                <MenuItem key={index} onClick={() => handleCategoryClick(category.name)}>
                                    {category.icon && category.icon}
                                    <Box component="span" sx={{ ml: 1 }}>{category.name}</Box>
                                </MenuItem>
                            );
                        })}
                    </Menu>
                )}

                {!isMobile && (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        overflowX: 'auto',
                        gap: 1,
                        flexGrow: 1,
                        ml: 1,
                        scrollbarWidth: 'thin',
                        '&::-webkit-scrollbar': { height: 5 },
                        '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: 3 }
                    }}>
                        {categories.map((category, index) => {
                            if (category.name === 'Language') return null;
                            if (!category.name) {
                                return (
                                    <IconButton key={index} sx={{ color: 'black', flexShrink: 0 }}>
                                        {category.icon}
                                    </IconButton>
                                );
                            }
                            return (
                                <Button
                                    key={index}
                                    variant="text"
                                    startIcon={category.icon}
                                    sx={{
                                        color: 'black',
                                        fontWeight: 400,
                                        px: 2,
                                        py: 0.8,
                                        minWidth: 'auto',
                                        flexShrink: 0,
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {category.name}
                                </Button>
                            );
                        })}
                    </Box>
                )}

                {/* Login Button at the end */}
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        textTransform: 'none',
                        fontSize: isMobile ? '0.7rem' : '0.9rem',
                        py: isMobile ? 0.4 : 0.8,
                        px: isMobile ? 1.5 : 3,
                        '&:hover': { backgroundColor: '#115293' },
                        flexShrink: 0
                    }}
                >
                    {isMobile ? 'Login' : 'Login / Signup'}
                </Button>
            </Container>
        </Box>
    );
};

export default CategoryBar;