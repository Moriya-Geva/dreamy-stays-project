import React, { useState, useEffect } from 'react';
import '../routing/style.css';
import { getApartment } from '../redux/api.js';
import { ApartmentFilter } from '../component/ApartmentFilter'; 

export const Home = () => {
  // State to hold apartments to display
  const [apartments, setApartments] = useState([]);  

  // Fetch all apartments on mount
  useEffect(() => { 
    getApartment() 
      .then(response => {
        setApartments(response.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <br />
      <br />
      <br />

      <h2>Dream Vacation Apartments</h2>
      {/* Filter component to filter apartments */}
      <ApartmentFilter setApartments={setApartments} />
    </>
  );
};
