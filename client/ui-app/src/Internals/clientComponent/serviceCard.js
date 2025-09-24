// src/components/ServiceCardsGrid.js
import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import CateringDiningIcon from '@mui/icons-material/RestaurantMenu';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import TvIcon from '@mui/icons-material/Tv';
import PlumbingIcon from '@mui/icons-material/Construction';
import PestControlIcon from '@mui/icons-material/BugReport';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import CarpenterIcon from '@mui/icons-material/Carpenter';

const serviceCards = [
  { name: 'Car Wash Services', icon: <LocalCarWashIcon fontSize="large" sx={{ color: 'primary.main' }} /> },
  { name: 'Catering Services', icon: <CateringDiningIcon fontSize="large" sx={{ color: 'primary.main' }} /> },
  { name: 'Water Supply', icon: <WaterDropIcon fontSize="large" sx={{ color: 'primary.main' }} /> },
  { name: 'TV Services', icon: <TvIcon fontSize="large" sx={{ color: 'primary.main' }} /> },
  { name: 'Plumbing Services', icon: <PlumbingIcon fontSize="large" sx={{ color: 'primary.main' }} /> },
  { name: 'Pest Control Service', icon: <PestControlIcon fontSize="large" sx={{ color: 'primary.main' }} /> },
  { name: 'Electrical Works', icon: <ElectricalServicesIcon fontSize="large" sx={{ color: 'primary.main' }} /> },
  { name: 'Carpenter Works', icon: <CarpenterIcon fontSize="large" sx={{ color: 'primary.main' }} /> },
];

const ServiceCardsGrid = () => {
  return (
    <Grid container spacing={2}>
      {serviceCards.map((card, index) => (
        <Grid item xs={6} key={index}>
          <Card sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 2,
            height: '100%',
          }}>
            {card.icon}
            <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
              {card.name}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ServiceCardsGrid;