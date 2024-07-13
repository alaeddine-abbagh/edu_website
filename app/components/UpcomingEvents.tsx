import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import EventIcon from '@mui/icons-material/Event';

const UpcomingEvents: React.FC = () => (
  <Paper elevation={3} sx={{ p: 4, my: 4 }}>
    <Typography variant="h4" component="h2" gutterBottom align="center">
      Upcoming Events
    </Typography>
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              International Math Olympiad
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <EventIcon fontSize="small" /> Date: July 15-25, 2023
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Location: Tokyo, Japan
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Register Now
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              European Girls' Mathematical Olympiad
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <EventIcon fontSize="small" /> Date: April 13-19, 2024
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Location: Tbilisi, Georgia
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              Asian Pacific Mathematics Olympiad
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <EventIcon fontSize="small" /> Date: March 8, 2024
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Location: Various Countries
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              More Info
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  </Paper>
);

export default React.memo(UpcomingEvents);
