import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Home } from 'lucide-react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myProperties, setMyProperties] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await api.get('/auth/profile');
        setUser(resUser.data);
        const resProps = await api.get('/properties');
        setMyProperties(resProps.data.filter(p => p.owner && p.owner._id === resUser.data._id));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!user) return <div className="container" style={{padding: '4rem 2rem'}}>Loading profile...</div>;

  return (
    <div className="container" style={{ padding: '2rem 2rem 4rem', maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>My Profile</h1>
      
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold', margin: '0 auto 1.5rem' }}>
          {user.name.charAt(0)}
        </div>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{user.name}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', color: 'var(--text-light)', marginTop: '1rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} /> {user.email}</span>
          {user.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} /> {user.phone}</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Home size={24} color="var(--primary-color)" /> My Bookings
          </h3>
          {user.bookings && user.bookings.length > 0 ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {user.bookings.map(b => (
                <div key={b._id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: '500' }}>{b.title}</div>
                    <div style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>₹{b.price}/mo</div>
                  </div>
                  <button 
                    onClick={async () => {
                      try {
                        await api.post(`/auth/unbook/${b._id}`);
                        setUser({
                          ...user,
                          bookings: user.bookings.filter(item => item._id !== b._id)
                        });
                        alert('Booking cancelled successfully!');
                      } catch (err) {
                        alert('Failed to cancel booking');
                      }
                    }}
                    className="btn" 
                    style={{ width: '100%', background: '#fee2e2', color: '#ef4444', padding: '0.5rem', fontSize: '0.875rem' }}
                  >
                    Cancel Booking
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-light)' }}>You haven't booked any properties yet.</p>
          )}
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Home size={24} color="var(--primary-color)" /> My Listed Properties
          </h3>
          {myProperties.length > 0 ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {myProperties.map(p => (
                <div key={p._id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: '500' }}>{p.title}</div>
                    <div style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>₹{p.price}/mo</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link 
                      to={`/edit-property/${p._id}`}
                      className="btn" 
                      style={{ flex: 1, background: '#f1f5f9', color: 'var(--text-dark)', padding: '0.5rem', fontSize: '0.875rem', textDecoration: 'none', textAlign: 'center' }}
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={async () => {
                        try {
                          await api.delete(`/properties/${p._id}`);
                          setMyProperties(prev => prev.filter(item => item._id !== p._id));
                        } catch (err) {
                          alert('Failed to delete property');
                        }
                      }}
                      className="btn" 
                      style={{ flex: 1, background: '#fee2e2', color: '#ef4444', padding: '0.5rem', fontSize: '0.875rem' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-light)' }}>You haven't listed any properties yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
