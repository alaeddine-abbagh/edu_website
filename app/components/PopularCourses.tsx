import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import SchoolIcon from '@mui/icons-material/School';

const PopularCourses: React.FC = () => (
  <Paper elevation={3} sx={{ p: 4, my: 4 }}>
    <Typography variant="h4" component="h2" gutterBottom align="center">
      Popular Courses
    </Typography>
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              <SchoolIcon /> Introduction to Algebra
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Learn the basics of algebra and build a strong foundation for advanced mathematics.
            </Typography>
            <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
              <li>Linear equations</li>
              <li>Quadratic equations</li>
              <li>Polynomials</li>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Enroll Now
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              <SchoolIcon /> Geometry Fundamentals
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Explore geometric concepts and develop spatial reasoning skills.
            </Typography>
            <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
              <li>Euclidean geometry</li>
              <li>Trigonometry</li>
              <li>Coordinate geometry</li>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Enroll Now
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              <SchoolIcon /> Calculus I
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Dive into differential calculus and its applications in problem-solving.
            </Typography>
            <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
              <li>Limits and continuity</li>
              <li>Derivatives</li>
              <li>Applications of derivatives</li>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Enroll Now
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  </Paper>
);

export default React.memo(PopularCourses);
