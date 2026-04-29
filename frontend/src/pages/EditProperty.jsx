import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const EditProperty = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', type: 'Flat',
    address: '', phone: '', email: '', amenities: '', image: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        const property = res.data;
        setFormData({
          title: property.title,
          description: property.description,
          price: property.price,
          type: property.type,
          address: property.location?.address || '',
          phone: property.contactDetails?.phone || '',
          email: property.contactDetails?.email || '',
          amenities: property.amenities ? property.amenities.join(', ') : '',
          image: property.images && property.images.length > 0 ? property.images[0] : ''
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert('Failed to load property');
        navigate('/profile');
      }
    };
    fetchProperty();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        type: formData.type,
        location: { address: formData.address },
        contactDetails: { phone: formData.phone, email: formData.email },
        amenities: formData.amenities.split(',').map(a => a.trim()),
        images: formData.image ? [formData.image] : ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80']
      };
      await api.put(`/properties/${id}`, propertyData);
      alert('Property updated successfully!');
      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert('Failed to update property');
    }
  };

  if (loading) return <div className="container" style={{padding: '4rem 2rem'}}>Loading...</div>;

  return (
    <div className="container" style={{ padding: '2rem 2rem 4rem', maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Edit Listing</h1>
      
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Property Title</label>
            <input type="text" className="form-input" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-input" rows="4" required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Price (₹/month)</label>
              <input type="number" className="form-input" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Property Type</label>
              <select className="form-input" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option value="Flat">Flat</option>
                <option value="PG">PG</option>
                <option value="Room">Room</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input type="text" className="form-input" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Contact Phone</label>
              <input type="tel" className="form-input" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Contact Email</label>
              <input type="email" className="form-input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Amenities (comma-separated)</label>
            <input type="text" className="form-input" placeholder="WiFi, AC, Parking..." value={formData.amenities} onChange={(e) => setFormData({...formData, amenities: e.target.value})} />
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input type="url" className="form-input" placeholder="https://example.com/image.jpg" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
            Update Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
