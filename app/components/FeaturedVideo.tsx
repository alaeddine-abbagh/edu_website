import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const FeaturedVideo: React.FC = () => (
  <Paper elevation={3} sx={{ p: 4, my: 4 }}>
    <Typography variant="h4" component="h2" gutterBottom align="center">
      Featured Video
    </Typography>
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} md={8}>
        <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <iframe
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            src="https://www.youtube.com/embed/eCobHMHHKRE"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h5" component="h3" gutterBottom>
          Why Math Olympiads Matter
        </Typography>
        <Typography variant="body1" paragraph>
          Discover how participating in Math Olympiads can boost your problem-solving skills and open up new opportunities in your academic journey.
        </Typography>
        <Button className="gradient-button" startIcon={<PlayArrowIcon />}>
          Learn More
        </Button>
      </Grid>
    </Grid>
  </Paper>
);

export default React.memo(FeaturedVideo);
