import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, CheckCircle2, Heart, MessageCircle } from 'lucide-react';
import api from '../services/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        setProperty(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="container" style={{padding: '4rem 2rem'}}>Loading...</div>;
  if (!property) return <div className="container" style={{padding: '4rem 2rem'}}>Property not found.</div>;

  return (
    <div className="container" style={{ padding: '2rem 1rem 4rem' }}>
      <div className="details-header">
        <h1 style={{ fontSize: '2.5rem' }}>{property.title}</h1>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
          ₹{property.price}<span style={{ fontSize: '1rem', color: 'var(--text-light)' }}>/mo</span>
        </div>
      </div>
      
      <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
        <MapPin size={20} /> {property.location?.address}
      </p>

      <div className="details-grid">
        <div className="details-main">
          <img 
            src={property.images && property.images.length > 0 ? property.images[0] : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80'} 
            alt={property.title} 
            style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', borderRadius: '16px', marginBottom: '2rem' }}
          />
          
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>About this property</h2>
          <p style={{ lineHeight: '1.8', color: 'var(--text-dark)', marginBottom: '2rem' }}>
            {property.description}
          </p>
          
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Amenities</h2>
          <div className="amenities-grid">
            {property.amenities && property.amenities.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={20} color="var(--primary-color)" /> {item}
              </div>
            ))}
            {(!property.amenities || property.amenities.length === 0) && <p>No amenities listed.</p>}
          </div>
        </div>

        <div className="details-sidebar">
          <div className="glass-panel" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Contact Owner</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {property.owner?.name ? property.owner.name.charAt(0) : 'O'}
              </div>
              <div>
                <div style={{ fontWeight: '600' }}>{property.owner?.name || 'Owner Name'}</div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Property Owner</div>
              </div>
            </div>

            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={16} /> {property.contactDetails?.phone || 'Not available'}
            </div>
            
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} /> {property.contactDetails?.email || property.owner?.email || 'Not available'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button onClick={() => setShowBookingForm(true)} className="btn btn-primary" style={{ width: '100%' }}>Book Now</button>
              
              {property.contactDetails?.phone ? (
                <a 
                  href={`https://wa.me/${property.contactDetails.phone}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-outline" 
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textDecoration: 'none' }}
                >
                  <MessageCircle size={18} /> Chat with Owner
                </a>
              ) : (
                <button className="btn btn-outline" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem' }} disabled>
                  <MessageCircle size={18} /> Chat with Owner
                </button>
              )}

              <button className="btn" style={{ width: '100%', background: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Heart size={18} /> Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBookingForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ marginBottom: '1.5rem' }}>Confirm Booking</h2>
            <div className="form-group">
              <label className="form-label">Check-in Date</label>
              <input type="date" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Duration (Months)</label>
              <input type="number" min="1" className="form-input" defaultValue="1" />
            </div>
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label">Payment Method</label>
              <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ width: '40px', height: '40px', background: '#5f259f', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>Pe</div>
                 <div>
                   <div style={{ fontWeight: '600' }}>PhonePe UPI</div>
                   <div style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Pay directly using PhonePe</div>
                 </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="btn btn-outline" 
                style={{ flex: 1 }} 
                onClick={() => setShowBookingForm(false)}
              >
                Cancel
              </button>
              <a 
                href={`upi://pay?pa=owner@ybl&pn=${property.owner?.name || 'Owner'}&am=${property.price}&cu=INR`}
                className="btn btn-primary" 
                style={{ flex: 1, textDecoration: 'none' }}
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    await api.post(`/auth/book/${property._id}`);
                    alert('Booking Confirmed! Payment request initiated.');
                    setShowBookingForm(false);
                  } catch (err) {
                    alert('Booking failed');
                  }
                }}
              >
                Pay & Confirm
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
