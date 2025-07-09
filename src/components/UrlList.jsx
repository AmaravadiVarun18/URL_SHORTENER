import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { getAllUrls } from '../utils/storage';


const UrlList = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
  const storedUrls = getAllUrls();
  setLinks(Object.entries(storedUrls));
}, []);


  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      {links.map(([shortcode, data], idx) => (
        <Grid item xs={12} key={idx}>
          <Card>
            <CardContent>
              <Typography variant="h6">
  <a
    href={`${window.location.origin}/${shortcode}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: 'none', color: '#1976d2' }}
  >
    {window.location.origin}/{shortcode}
  </a>
</Typography>

              <Typography>Original: {data.original}</Typography>
              <Typography>Expires at: {new Date(data.expiry).toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UrlList;
