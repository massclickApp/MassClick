import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';

// Import your components
import CategoryBar from '../clientComponent/categoryBar.js';
import HeroSection from '../clientComponent/heroSection.js';
import FeaturedServices from '../clientComponent/featureService.js';
import ServiceCardsGrid from '../clientComponent/serviceCard.js';
import TrendingSearchesCarousel from './trendingSearch/trendingSearch.js';
import CardCarousel from './popularSearch/popularSearch.js';
import TopTourist from './topTourist/topTourist.js';
import MassClickBanner from './massClickBanner/massClickBanner.js';
  import SearchResults from './SearchResult/SearchResult.js';
import RecentActivities from './recentActivities/recentActivites.js';
import PopularCategories from './popularCategories/popularCategories.js';
import Footer from './footer/footer.js';

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null); 

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

  const isSearching = searchResults !== null;

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', width: '100%' }}>
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        {drawerContent}
      </Drawer>

      <CategoryBar />
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchResults={setSearchResults}
      />

    
      {isSearching ? (
          <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
          <SearchResults results={searchResults} />
        </Box>
      ) : (
        <>
          <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
            <FeaturedServices />
          </Box>
          <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
            <ServiceCardsGrid />
          </Box>
          <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
            <MassClickBanner />
          </Box>
          <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
            <TrendingSearchesCarousel />
          </Box>
          <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
            <CardCarousel />
          </Box>
          <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
            <TopTourist />
          </Box>
           <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
            <RecentActivities />
          </Box>
          <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
            <PopularCategories />
          </Box>
          <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
            <Footer />
          </Box>
        </>
      )}

    </Box>
  );
};

export default LandingPage;