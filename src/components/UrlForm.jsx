import { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { isValidURL, isValidShortcode } from '../utils/validators';
import { generateShortcode } from '../utils/shortcodeGenerator';
import { logEvent } from '../utils/loggerMiddleware';
import { getAllUrls, saveUrl } from '../utils/storage';

const UrlForm = () => {
  const [urls, setUrls] = useState([{ long: '', validity: '', code: '' }]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleAdd = () => {
    if (urls.length < 5) setUrls([...urls, { long: '', validity: '', code: '' }]);
  };

  const handleShorten = () => {
  const allUrls = getAllUrls();

  urls.forEach((u, idx) => {
    if (!isValidURL(u.long)) return alert(`Invalid URL at row ${idx + 1}`);
    let code = u.code || generateShortcode();
    if (!isValidShortcode(code)) return alert(`Invalid shortcode at row ${idx + 1}`);
    if (allUrls[code]) return alert(`Shortcode ${code} already used.`);

    const expiry = parseInt(u.validity) || 30;
    const expiryTime = new Date(Date.now() + expiry * 60000).toISOString();

    const urlData = {
      original: u.long,
      expiry: expiryTime,
      createdAt: new Date().toISOString(),
      clicks: []
    };

    saveUrl(code, urlData);

    logEvent({ action: 'SHORTEN_URL', data: { ...u, finalCode: code, expiry: expiryTime } });
  });

  setUrls([{ long: '', validity: '', code: '' }]);
  window.location.reload(); // optional: trigger UI refresh
};

  return (
    <>
      {urls.map((u, idx) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} md={5}>
            <TextField label="Original URL" fullWidth value={u.long}
              onChange={(e) => handleChange(idx, 'long', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Validity (minutes)" fullWidth value={u.validity}
              onChange={(e) => handleChange(idx, 'validity', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField label="Custom Shortcode (optional)" fullWidth value={u.code}
              onChange={(e) => handleChange(idx, 'code', e.target.value)} />
          </Grid>
        </Grid>
      ))}
      <Button variant="contained" onClick={handleShorten} sx={{ mr: 2 }}>
        Shorten URLs
      </Button>
      {urls.length < 5 && (
        <Button variant="outlined" onClick={handleAdd}>
          Add More
        </Button>
      )}
    </>
  );
};

export default UrlForm;
