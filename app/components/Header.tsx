import React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';

const Header: React.FC = () => (
  <AppBar position="static" sx={{ bgcolor: '#060E30', backgroundImage: 'none' }}>
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Math Olympiads
      </Typography>
      <Button color="inherit" sx={{ marginRight: 2 }} component={Link} href="/explore" startIcon={<ExploreIcon />}>Explore</Button>
      <Button color="inherit" component={Link} href="/add-problem" startIcon={<AddIcon />}>Add Problem</Button>
    </Toolbar>
  </AppBar>
);

export default React.memo(Header);
