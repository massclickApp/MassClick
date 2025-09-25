// src/components/ServiceCardsGrid.js
import React from 'react';
import { Grid, Box } from '@mui/material';

const ServiceCardsGrid = () => {
  const colors = ["#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFF9C4"];

  const sizes = [
    { width: 750, height: 200 },
    { width: 750, height: 200 },
    { width: 750, height: 200 },
    { width: 750, height: 200 },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        {colors.map((color, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            key={index} 
            display="flex" 
            justifyContent="center"
          >
            <Box
              sx={{
                width: sizes[index].width,
                height: sizes[index].height,
                backgroundColor: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              Card {index + 1}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServiceCardsGrid;
