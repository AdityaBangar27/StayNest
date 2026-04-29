import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import api from '../services/api';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  const [filter, setFilter] = useState({ type: 'All', search: initialSearch });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get('/properties');
        const availableProperties = res.data.filter(p => p.isAvailable !== false);
        setProperties(availableProperties);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(prop => {
    const matchType = filter.type === 'All' || prop.type === filter.type;
    const matchSearch = filter.search === '' || 
        prop.title.toLowerCase().includes(filter.search.toLowerCase()) || 
        (prop.location && prop.location.address.toLowerCase().includes(filter.search.toLowerCase()));
    return matchType && matchSearch;
  });

  return (
    <div className="container" style={{ padding: '2rem 2rem 4rem' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Explore Properties</h1>
      
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Search locations..." 
          className="form-input" 
          style={{ flex: 1, minWidth: '200px' }}
          value={filter.search}
          onChange={(e) => setFilter({...filter, search: e.target.value})}
        />
        <select 
          className="form-input" 
          style={{ width: '200px' }}
          value={filter.type}
          onChange={(e) => setFilter({...filter, type: e.target.value})}
        >
          <option value="All">All Types</option>
          <option value="Flat">Flat</option>
          <option value="PG">PG</option>
          <option value="Room">Room</option>
        </select>
      </div>

      <div className="properties-grid" style={{ padding: '1rem 0' }}>
        {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
            <PropertyCard key={property._id} property={property} />
            ))
        ) : (
            <p>No properties found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Properties;
