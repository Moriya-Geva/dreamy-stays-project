import React, { useState, useEffect } from 'react';
import { getApartmentByAdvertiser } from "../redux/api.js";
import { ApartmentCard } from '../component/Card.jsx';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const MyApartments = () => {
  // Get token from localStorage for authorization
  const token = localStorage.getItem("token"); 
  const [myApartments, setMyApartments] = useState([]);

  // Fetch apartments for the logged-in advertiser on mount
  useEffect(() => {
    getApartmentByAdvertiser(token)
      .then(res => setMyApartments(res.data))
      .catch(err => console.error("error", err));
  }, []);

  return (
    <div>
      <h2>My Apartments</h2>
      {/* Button to navigate to add new apartment page */}
      <Button color="primary" component={Link} to="/AddApartment">Add Apartment</Button>

      <div className='apartment-list'>
        {/* List of apartments belonging to the advertiser */}
        {myApartments.map(ap => (
          <ApartmentCard key={ap._id} apartment={ap} isAdvertiser={true} />
        ))}
      </div>
    </div>
  );
};
