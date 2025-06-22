import React from 'react';
import { Typography, Divider } from '@mui/material';

// Component to show detailed information about an apartment in a modal
export const MoreDetails = ({ apartment }) => {
  return (
    <div>
      {/* Apartment name */}
      <Typography variant="h5" gutterBottom>{apartment.name}</Typography>
      <Divider sx={{ mb: 2 }} />
      {/* Other apartment details */}
      <Typography><strong>Description:</strong> {apartment.description}</Typography>
      <Typography><strong>City:</strong> {apartment.city?.nameC}</Typography>
      <Typography><strong>Address:</strong> {apartment.address}</Typography>
      <Typography><strong>Number of beds:</strong> {apartment.numBeds}</Typography>
      <Typography><strong>Price:</strong> {apartment.price} ₪</Typography>
      <Typography><strong>Additives:</strong> {apartment.additives}</Typography>
      <Typography><strong>Contact:</strong> {apartment.advertiser?.email}</Typography>
    </div>
  );
};
