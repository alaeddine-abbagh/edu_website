import React from 'react';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExploreIcon from '@mui/icons-material/Explore';

const Hero: React.FC = () => (
  <Box sx={{ my: 4 }}>
    <Typography variant="h2" component="h1" gutterBottom align="center">
      Unlock Your Mathematical Potential
    </Typography>
    <Typography variant="h5" component="p" gutterBottom align="center">
      Join our community of young mathematicians and prepare for Math Olympiads
    </Typography>
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Button className="gradient-button" component={Link} href="/explore">
        <ExploreIcon className="mr-2" />
        <span>Start Exploring</span>
      </Button>
    </Box>
  </Box>
);

export default React.memo(Hero);
