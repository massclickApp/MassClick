// src/pages/LandingPage.js
import React, { useState } from 'react';
import { Box, Container, Drawer, List, ListItem, ListItemText } from '@mui/material';

// Import the new components
import Header from '../clientComponent/header.js';
import CategoryBar from '../clientComponent/categoryBar.js';
import HeroSection from '../clientComponent/heroSection.js';
import FeaturedServices from '../clientComponent/featureService.js';
import ServiceCardsGrid from '../clientComponent/serviceCard.js';

const LandingPage = () => {
  const [selectedLocation, setSelectedLocation] = useState('Trichy');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const drawerContent = (
    <Box onClick={handleMobileMenuClose} sx={{ textAlign: 'center' }}>
      <List>
        {['About Us', 'Services', 'Testimonials', 'Portfolio'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', width: '100%', px: 3 }}>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        {drawerContent}
      </Drawer>

      <CategoryBar />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <HeroSection
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <Box sx={{ mt: 4 }}>
          <FeaturedServices />
        </Box>

        {/* <Box sx={{ mt: 4 }}>
          <ServiceCardsGrid />
        </Box> */}
      </Container>
    </Box>
  );
};

export default LandingPage;