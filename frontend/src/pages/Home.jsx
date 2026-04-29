import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get('/properties');
        const availableProperties = res.data.filter(p => p.isAvailable !== false);
        setProperties(availableProperties.slice(0, 6)); // Just show 6 latest
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchQuery.trim()) {
       navigate(`/properties?search=${searchQuery}`);
    }
  }

  return (
    <div>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect Stay</h1>
          <p>Discover modern flats, PGs, and rooms with premium amenities.</p>
          <form className="search-bar" onSubmit={handleSearch}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by location, city, or neighborhood..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              <Search size={20} style={{marginRight: '8px'}} /> Search
            </button>
          </form>
        </div>
      </div>

      <div className="container">
        <div style={{ padding: '4rem 0 1rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>Featured Properties</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Explore some of the best accommodations handpicked for you.</p>
        </div>
        
        <div className="properties-grid">
          {properties.length > 0 ? (
             properties.map(property => (
               <PropertyCard key={property._id} property={property} />
             ))
          ) : (
            <p>Loading properties...</p>
          )}
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
           <button onClick={() => navigate('/properties')} className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              View All Properties
           </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
