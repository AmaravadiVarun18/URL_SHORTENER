import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllUrls, saveUrl } from '../utils/storage'; // ✅ uses localStorage

const Redirector = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const data = getAllUrls()[shortcode]; // ✅ get from localStorage

    if (data) {
      const now = new Date();
      const expiry = new Date(data.expiry);

      if (now < expiry) {
        // Log click
        data.clicks.push({
          timestamp: now.toISOString(),
          source: navigator.userAgent,
          location: 'India (simulated)',
        });

        // Save updated click data
        saveUrl(shortcode, data);

        // Redirect to original URL
        window.location.href = data.original;
      } else {
        alert('Link expired');
        navigate('/');
      }
    } else {
      alert('Invalid shortcode');
      navigate('/');
    }
  }, [shortcode, navigate]);

  return null;
};

export default Redirector;
