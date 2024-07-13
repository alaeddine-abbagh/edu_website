import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const MotivationalQuotes: React.FC = () => (
  <Paper elevation={3} sx={{ p: 4, my: 4, bgcolor: 'primary.light' }}>
    <Typography variant="h4" component="h2" gutterBottom align="center" color="primary.contrastText">
      Motivational Quotes
    </Typography>
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              <FormatQuoteIcon /> Mathematics is the language in which God has written the universe.
            </Typography>
            <Typography variant="subtitle1" align="right" sx={{ mt: 2 }}>
              - Galileo Galilei
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              <FormatQuoteIcon /> Pure mathematics is, in its way, the poetry of logical ideas.
            </Typography>
            <Typography variant="subtitle1" align="right" sx={{ mt: 2 }}>
              - Albert Einstein
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Paper>
);

export default React.memo(MotivationalQuotes);
