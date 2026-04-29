import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Maximize } from 'lucide-react';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img 
          src={property.images && property.images.length > 0 ? property.images[0] : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80'} 
          alt={property.title} 
          className="property-image"
        />
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'rgba(255,255,255,0.9)',
          padding: '0.25rem 0.75rem',
          borderRadius: '999px',
          fontWeight: '600',
          fontSize: '0.875rem'
        }}>
          {property.type}
        </div>
      </div>
      <div className="property-info">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-location">
          <MapPin size={16} /> {property.location?.address || 'Location unavailable'}
        </p>
        <div className="property-price">
          ₹{property.price} <span style={{fontSize: '1rem', color: '#64748b', fontWeight: 'normal'}}>/ month</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
          <Link to={`/properties/${property._id}`} className="btn btn-primary" style={{flex: 1, padding: '0.5rem'}}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
