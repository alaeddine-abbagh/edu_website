"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import * as XLSX from "xlsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './grid-pattern.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const MathJax = dynamic(() => import('better-react-mathjax').then(mod => mod.MathJax), { ssr: false });
const MathJaxContext = dynamic(() => import('better-react-mathjax').then(mod => mod.MathJaxContext), { ssr: false });

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#060E30',
      paper: '#060E30',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #FFAA32 60%, #EF543E 93%)',
          color: '#fff',
          borderRadius: '25px',
          '&:hover': {
            filter: 'brightness(1.1)',
          },
        },
      },
    },
  },
});

const config = {
  loader: { load: ["input/asciimath"] },
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true,
  },
  options: {
    ignoreHtmlClass: 'tex2jax_ignore|editor-rich-text'
  }
};

const parseContent = (content: string) => {
  return content.replace(/\$\$(.*?)\$\$/g, '\\[$1\\]')
                .replace(/\$(.*?)\$/g, '\\($1\\)');
};

function Home() {
  const [randomProblem, setRandomProblem] = useState<any>(null);
  const [language, setLanguage] = useState<"fr" | "en">("en");
  const [userAnswer, setUserAnswer] = useState("");

  useEffect(() => {
    fetch("/db.xlsx")
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        const randomIndex = Math.floor(Math.random() * json.length);
        setRandomProblem(json[randomIndex] as any);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ bgcolor: '#060E30', backgroundImage: 'none' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Math Olympiads
          </Typography>
          <Button color="inherit"  sx={{ marginRight: 2 }} component={Link} href="/explore" startIcon={<ExploreIcon />}>Explore</Button>
          <Button color="inherit" component={Link} href="/add-problem" startIcon={<AddIcon />}>Add Problem</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
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

        {randomProblem && (
          <Paper elevation={3} sx={{ p: 4, my: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              Problem of the Day
            </Typography>
            <Typography variant="h6" component="h3" gutterBottom>
              Problem Statement:
            </Typography>
            <MathJax dynamic>{parseContent(JSON.parse(randomProblem.statement)[language])}</MathJax>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setLanguage(prev => prev === "fr" ? "en" : "fr")}
              >
                {language === "fr" ? "Switch to English" : "Passer au Français"}
              </Button>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" component="h4" gutterBottom>
                Your Answer:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here..."
                variant="outlined"
              />
              <Box sx={{ mt: 2 }}>
                <MathJax dynamic>{parseContent(userAnswer)}</MathJax>
              </Box>
            </Box>
          </Paper>
        )}

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
      </Container>

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
    </ThemeProvider>
  );
}

const MathJaxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <MathJaxContext config={config}>
      {children}
    </MathJaxContext>
  );
};

export default function WrappedHome() {
  return (
    <MathJaxWrapper>
      <Home />
    </MathJaxWrapper>
  );
}
