import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--text-dark)',
      color: 'white',
      padding: '3rem 2rem',
      marginTop: 'auto'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>StayNest</h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            A modern brokerage platform for finding the perfect flats, PGs, and rental properties with ease.
          </p>
        </div>
        
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Contact Us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#cbd5e1' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} color="var(--primary-color)" /> Pune Tathawade
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={18} color="var(--primary-color)" /> +91 8788060528
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} color="var(--primary-color)" /> staynest@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', borderTop: '1px solid #334155', marginTop: '2rem', paddingTop: '1.5rem', color: '#94a3b8' }}>
        &copy; {new Date().getFullYear()} StayNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
