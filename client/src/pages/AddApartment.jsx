import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addApartment, addCity, addCategory, getCategories, getCities } from "../redux/api.js";
import { TextField, Button, Container, Typography, Box, Paper, Stack, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const AddApartment = () => {
  // State to store cities and categories lists from backend
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Control whether to show input for new city/category
  const [showNewCity, setShowNewCity] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  
  // States for new city and category input values
  const [newCity, setNewCity] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Token from localStorage for authorization (used in API calls)
  const token = localStorage.getItem("token"); 
  const navigate = useNavigate();

  // For debugging redux state, not critical here
  console.log(useSelector(x => x));

  // Form state holding apartment fields
  const [form, setForm] = useState({
    name: '',
    description: '',
    img: '',
    category: '',
    city: '',
    address: '',
    numBeds: '',
    price: '',
    additives: ''
  });

  // Fetch cities and categories once when component mounts
  useEffect(() => {
    getCities()
      .then(response => setCities(response.data))
      .catch(console.error);
    getCategories()
      .then(response => setCategories(response.data))
      .catch(console.error);
  }, []);

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If user selects "other" in city/category, show input for new value
    if (name === "city") {
      setShowNewCity(value === "other");
      setForm({ ...form, city: value === "other" ? "" : value });
    } else if (name === "category") {
      setShowNewCategory(value === "other");
      setForm({ ...form, category: value === "other" ? "" : value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // If adding a new city, call API to add it
    if (showNewCity && newCity) {
      addCity({ nameC: newCity })
        .then(() => console.log("City added successfully!"))
        .catch(err => console.error(err.message));
    }

    // If adding a new category, call API to add it
    if (showNewCategory && newCategory) {
      addCategory({ nameC: newCategory })
        .then(() => console.log("Category added successfully!"))
        .catch(err => console.error(err.message));
    }

    // Add the apartment using form data and token
    addApartment(form, token)
      .then(() => console.log("Apartment added successfully!"))
      .catch(err => console.error(err.message));

    // Show success message and navigate back to homepage
    Swal.fire("Apartment added successfully");
    navigate('/HomePage')
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 6, borderRadius: 4 }}>
        <Typography variant="h5" gutterBottom align="center">Add New Apartment</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            {/* Apartment name */}
            <TextField label="Apartment Name" name="name" fullWidth value={form.name} onChange={handleChange} />
            
            {/* Description */}
            <TextField label="Description" name="description" fullWidth value={form.description} onChange={handleChange} />
            
            {/* Image URL */}
            <TextField label="Image URL" name="img" fullWidth value={form.img} onChange={handleChange} />
            
            {/* City select dropdown */}
            <TextField select fullWidth label="City" name="city" value={form.city} onChange={handleChange}>
              <MenuItem value="">Select City</MenuItem>
              {cities.map(city => (
                <MenuItem key={city._id} value={city._id}>{city.nameC}</MenuItem>
              ))}
              <MenuItem value="other">Other</MenuItem>
            </TextField>

            {/* Input for new city if "other" selected */}
            {showNewCity && (
              <TextField label="Enter New City" value={newCity} fullWidth onChange={(e) => setNewCity(e.target.value)} />
            )}

            {/* Category select dropdown */}
            <TextField select fullWidth label="Category" name="category" value={form.category} onChange={handleChange}>
              <MenuItem value="">Select Category</MenuItem>
              {categories.map(category => (
                <MenuItem key={category._id} value={category._id}>{category.nameC}</MenuItem>
              ))}
              <MenuItem value="other">Other</MenuItem>
            </TextField>

            {/* Input for new category if "other" selected */}
            {showNewCategory && (
              <TextField label="Enter New Category" value={newCategory} fullWidth onChange={(e) => setNewCategory(e.target.value)} />
            )}

            {/* Address */}
            <TextField label="Address" name="address" fullWidth value={form.address} onChange={handleChange} />
            
            {/* Number of beds */}
            <TextField label="Number of Beds" name="numBeds" fullWidth value={form.numBeds} onChange={handleChange} />
            
            {/* Price */}
            <TextField label="Price" name="price" fullWidth value={form.price} onChange={handleChange} />
            
            {/* Additives */}
            <TextField label="Additives" name="additives" fullWidth value={form.additives} onChange={handleChange} />

            {/* Submit button */}
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>Add Apartment</Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};
