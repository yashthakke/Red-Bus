import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const CompanyLogo = ({ height = "40px" }) => {
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get('http://localhost:3000/upload/getlogo', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data?.data?.length) {
          setLogoUrl(res.data.data[0].file);
        } else {
          console.warn("No logo found");
          setLogoUrl(null);
        }
      } catch (error) {
        console.error("Error loading logo:", error);
        setLogoUrl(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, []);

  if (loading) {
    return <span className="navbar-brand text-uppercase">Loading...</span>;
  }

  return (
    <>
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="Company Logo"
          style={{ height, objectFit: 'contain' }}
          className="navbar-brand"
        />
      ) : (
        <span className="navbar-brand text-uppercase">MyBrand</span>
      )}
    </>
  );
};
