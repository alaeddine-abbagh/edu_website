import React from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Footer: React.FC = () => (
  <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
    <Container maxWidth="lg">
      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} md={4}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Math Olympiads
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Empowering students with advanced mathematical skills.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Quick Links
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 0, listStyle: 'none' }}>
            <li>
              <Link href="/about" color="inherit">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" color="inherit">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" color="inherit">
                Privacy Policy
              </Link>
            </li>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Connect With Us
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" color="inherit">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link href="#" color="inherit">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link href="#" color="inherit">
              <i className="fab fa-instagram"></i>
            </Link>
          </Box>
        </Grid>
      </Grid>
      <Box mt={5}>
        <Typography variant="body2" color="text.secondary" align="center">
          © 2023 Math Olympiads. All rights reserved.
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default React.memo(Footer);
