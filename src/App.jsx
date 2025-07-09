import { Container, Typography } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import UrlForm from './components/UrlForm';
import UrlList from './components/UrlList';
import Redirector from './components/Redirector';

function App() {
  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        URL Shortener
      </Typography>
      <Routes>
        <Route path="/" element={
          <>
            <UrlForm />
            <UrlList />
          </>
        } />
        <Route path="/:shortcode" element={<Redirector />} />
      </Routes>
    </Container>
  );
}

export default App;
