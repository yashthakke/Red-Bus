import React from 'react';

export const CompnayHome = () => {
  return (
    <div style={{
      fontFamily: 'sans-serif',
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
        Welcome to Operator Portal
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '600px', margin: '0 auto' }}>
        Manage your company profile, bookings, and customer interactions with ease. Our platform helps operators streamline operations and deliver better service.
      </p>

      {/* Call to Action */}
      <button style={{
        marginTop: '2rem',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }}>
        Get Started
      </button>

      {/* Footer */}
      <div style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#888' }}>
        © 2025 Operator Portal. All rights reserved.
      </div>
    </div>
  );
};