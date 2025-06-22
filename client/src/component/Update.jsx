import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, MenuItem, Button, Box } from '@mui/material';

// Import API functions for apartment CRUD operations
import { getByIdAp, updateApartment, getCities, getCategories } from '../redux/api';

// Form component to edit an existing apartment
export const EditApartment = ({ id, handleClose }) => {
  const navigate = useNavigate();

  // Form state for apartment details
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    numBeds: '',
    cityId: '',
    categoryId: ''
  });

  // State for city and category lists
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch apartment details by id when component mounts or id changes
  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const res = await getByIdAp(id);
        setFormData(res.data);
      } catch (err) {
        console.error('Error fetching apartment:', err);
      }
    };
    if (id) fetchApartment();
  }, [id]);

  // Fetch city and category lists for dropdown selects
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const citiesRes = await getCities();
        const categoriesRes = await getCategories();
        setCities(citiesRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error('Error fetching cities or categories:', err);
      }
    };
    fetchLists();
  }, []);

  // Update form data on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to update apartment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateApartment(id, formData);
      navigate('/homepage'); // Navigate back to homepage after saving
    } catch (err) {
      console.error('Error updating apartment:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Edit Apartment</h2>
      <TextField label="Apartment Name" name="name" value={formData.name} onChange={handleChange} fullWidth required margin="normal" />
      <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth multiline rows={3} required margin="normal" />
      <TextField label="Price per Night" name="price" type="number" value={formData.price} onChange={handleChange} fullWidth required margin="normal" />
      <TextField label="Number of Beds" name="numBeds" type="number" value={formData.numBeds} onChange={handleChange} fullWidth required margin="normal" />
      <TextField select label="City" name="cityId" value={formData.cityId} onChange={handleChange} fullWidth required margin="normal">
        {cities.map((city) => (
          <MenuItem key={city._id} value={city._id}>{city.nameC}</MenuItem>
        ))}
      </TextField>
      <TextField select label="Category" name="categoryId" value={formData.categoryId} onChange={handleChange} fullWidth required margin="normal">
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>{category.nameC}</MenuItem>
        ))}
      </TextField>
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">Save Changes</Button>
        <Button onClick={() => navigate('/homepage')} sx={{ ml: 2 }}>Cancel</Button>
      </Box>
    </form>
  );
};
