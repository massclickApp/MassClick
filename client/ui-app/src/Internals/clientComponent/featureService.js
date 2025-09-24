// src/components/FeaturedServicesSection.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// ------------------------------------------------------------------
// Part 1: The Card Component Definition
// ------------------------------------------------------------------
// Styled components for custom styling
const CustomCard = styled(Card)(({ theme }) => ({
  width: 200, // Fixed width based on the image, adjust as needed
  height: 300, // Fixed height based on the image, adjust as needed
  borderRadius: theme.shape.borderRadius * 3, // More rounded corners
  backgroundColor: '#1976d2', // Blue background for the card
  color: 'white', // White text color
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative', // Needed for absolute positioning of the explore button
  overflow: 'hidden', // Ensures rounded corners clip content
  cursor: 'pointer', // Indicates it's clickable
  boxShadow: '0px 8px 24px rgba(0,0,0,0.2)', // Deeper shadow
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)', // Slight lift on hover
    boxShadow: '0px 12px 30px rgba(0,0,0,0.3)', // Enhanced shadow on hover
  },
}));

const StyledCardMedia = styled(CardMedia)({
  position: 'absolute',
  bottom: 0,
  right: -20, // Adjust position to match the image
  width: 'calc(100% + 40px)', // Make it slightly wider to extend beyond card edges
  height: '70%', // Adjust height as per image
  objectFit: 'cover', // Cover the area, possibly cropping the image
  zIndex: 1, // Ensure image is above the button background, but below text
});

const StyledCardContent = styled(CardContent)({
  position: 'relative',
  zIndex: 2, // Ensure text is above the image
  flexGrow: 1, // Allows content to take available space
  padding: '16px', // Default padding
  paddingBottom: '0 !important', // Override default card content padding
});

const ExploreButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.primary.main, // Primary blue text for button
  borderRadius: '0 0 0 0', // Sharp corners at the top, rounded at bottom-left
  borderTopLeftRadius: '30px', // Matches the design
  borderBottomLeftRadius: '30px',
  padding: '8px 16px',
  position: 'absolute',
  bottom: 0,
  left: 0, // Position at the bottom-left
  zIndex: 3, // Ensure button is above everything
  minWidth: 'unset', // Allow content to define width
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', // Center content horizontally
  paddingLeft: theme.spacing(3), // More padding on the left for text
  paddingRight: theme.spacing(1), // Less padding on the right for icon close to edge
  whiteSpace: 'nowrap', // Prevent text from wrapping
}));

const StyledChevronRightIcon = styled(ChevronRightIcon)({
    fontSize: '1.5rem', // Adjust icon size
    marginLeft: '4px',
});

// The Card Component
const FeaturedServicesCard = ({ imageUrl, title, onClick }) => {
  return (
    <CustomCard onClick={onClick}>
      <StyledCardContent>
        {/* Title/Header */}
        <Typography variant="h5" component="div" sx={{ fontWeight: 700, mb: 1 }}>
          B2B
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.3, fontWeight: 500 }}>
          Quick
          <br />
          Quotes
        </Typography>
      </StyledCardContent>
      
      {imageUrl && (
        <StyledCardMedia
          component="img"
          image={imageUrl}
          alt={title}
        />
      )}

      <ExploreButton onClick={onClick} disableRipple>
        <Typography variant="button" sx={{ fontWeight: 600 }}>
          Explore
        </Typography>
        <StyledChevronRightIcon />
      </ExploreButton>
    </CustomCard>
  );
};

// ------------------------------------------------------------------
// Part 2: The Data and Main Component
// ------------------------------------------------------------------
// Data for the cards
const servicesData = [
  {
    id: 1,
    title: 'B2B Quick Quotes',
    imageUrl: 'https://images.unsplash.com/photo-1587840171675-103362a22238?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1c2luZXNzJTIwcXVvdGVzfGVufDB8fDB8fHww',
  },
  {
    id: 2,
    title: 'Financial Services',
    imageUrl: 'https://images.unsplash.com/photo-1549419163-95af116a41f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHxmaW5hbmNpYWwlMjBzZXJ2aWNlc3xlbnwwfHx8fDE%3D',
  },
  {
    id: 3,
    title: 'Home Services',
    imageUrl: 'https://images.unsplash.com/photo-1517404215712-094776e9385b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvbWUlMjBzZXJ2aWNlJTIwZGVzaWdufGVufDB8fDB8fHww',
  },
  {
    id: 4,
    title: 'Legal Advice',
    imageUrl: 'https://images.unsplash.com/photo-1563986768601-37207c4c369e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxlZ2FsJTIwYWR2aWNlJTIwZGVzaWdufGVufDB8fDB8fHww',
  },
];

// Main component that renders the card section
const   FeaturedServicesSection = () => {
  const handleCardClick = (title) => {
    alert(`You clicked on the "${title}" card!`);
    // Example: Navigate to a new page or open a modal
  };

  return (
    <Container maxWidth="xl" sx={{ my: 5, display: 'flex', justifyContent: 'flex-start', pl: 0 }}>
  <Grid container spacing={4}>
    {servicesData.map((service) => (
      <Grid item key={service.id} xs={12} sm={6} md={4} lg={3}>
        <FeaturedServicesCard
          imageUrl={service.imageUrl}
          title={service.title}
          onClick={() => handleCardClick(service.title)}
        />
      </Grid>
    ))}
  </Grid>
</Container>

  );
};

export default FeaturedServicesSection;