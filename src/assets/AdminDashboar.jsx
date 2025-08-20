import React from 'react';
import { Link } from 'react-router-dom';

export const AdminDashboar = () => {
  const styles = {
    container: {
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f6f8',
      minHeight: '100vh',
    },
    header: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#333',
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
    },
    card: {
      backgroundColor: '#fff',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'transform 0.2s ease-in-out',
    },
    cardTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#444',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Admin Dashboard</div>
      <div style={styles.cardGrid}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Total Users</div>
        </div>

        <Link to="/comppending" style={styles.card}>
          <div style={styles.cardTitle}>Pending Company</div>
        </Link>

        <div style={styles.card}>
          <div style={styles.cardTitle}>System Health</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>Recent Activity</div>
        </div>
      </div>
    </div>
  );
};
