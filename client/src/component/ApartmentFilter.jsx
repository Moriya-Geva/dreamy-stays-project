import { getCategories, getCities, getByFilters } from '../redux/api.js';
import { useEffect, useState } from 'react';
import { ApartmentCard } from './Card.jsx';

export const ApartmentFilter = () => {
  const [cities, setCities] = useState([]); // State to hold cities list
  const [categories, setCategories] = useState([]); // State to hold categories list
  const [apartments, setApartments] = useState([]); // Apartments filtered list
  const [filters, setFilters] = useState({
    cityId: '',
    minBeds: '',
    maxPrice: '',
    categoryId: ''
  }); // Filter values state

  useEffect(() => {
    // Load cities and categories once on component mount
    getCities()
      .then(response => setCities(response.data))
      .catch(console.error);

    getCategories()
      .then(response => setCategories(response.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    // Fetch apartments every time filters change
    const fetchApartments = () => {
      const p = {};
      if (filters.cityId) p.cityId = filters.cityId;
      if (filters.minBeds) p.minBeds = filters.minBeds;
      if (filters.maxPrice) p.maxPrice = filters.maxPrice;
      if (filters.categoryId) p.categoryId = filters.categoryId;

      getByFilters(p)
        .then(response => setApartments(response.data))
        .catch(console.error);
    };

    fetchApartments();
  }, [filters]);

  const handleFilterChange = (e) => {
    // Update filter state on user input change
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      {/* City dropdown */}
      <select name="cityId" value={filters.cityId} onChange={handleFilterChange}>
        <option value="">בחר עיר</option>
        {cities.map(city => (
          <option key={city._id} value={city._id}>{city.nameC}</option>
        ))}
      </select>

      {/* Category dropdown */}
      <select name="categoryId" value={filters.categoryId} onChange={handleFilterChange}>
        <option value="">בחר קטגוריה</option>
        {categories.map(category => (
          <option key={category._id} value={category._id}>{category.nameC}</option>
        ))}
      </select>

      {/* Minimum beds input */}
      <input
        type="number"
        name="minBeds"
        value={filters.minBeds}
        onChange={handleFilterChange}
        placeholder="מינימום מיטות"
      />

      {/* Maximum price input */}
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={handleFilterChange}
        placeholder="מחיר מקסימלי"
      />

      {/* Display filtered apartments */}
      <div className="apartment-list">
        {apartments.map(apartment => (
          <ApartmentCard key={apartment._id} apartment={apartment} />
        ))}
      </div>
    </div>
  );
};
