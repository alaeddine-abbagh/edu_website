"use client";

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import * as XLSX from "xlsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './grid-pattern.css';
import Container from '@mui/material/Container';

const Header = dynamic(() => import('./components/Header'), { ssr: false });
const Hero = dynamic(() => import('./components/Hero'), { ssr: false });
const FeaturedVideo = dynamic(() => import('./components/FeaturedVideo'), { ssr: false });
const ProblemOfTheDay = dynamic(() => import('./components/ProblemOfTheDay'), { ssr: false });
const MotivationalQuotes = dynamic(() => import('./components/MotivationalQuotes'), { ssr: false });
const UpcomingEvents = dynamic(() => import('./components/UpcomingEvents'), { ssr: false });
const PopularCourses = dynamic(() => import('./components/PopularCourses'), { ssr: false });
const Footer = dynamic(() => import('./components/Footer'), { ssr: false });

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

function Home() {
  const [randomProblem, setRandomProblem] = useState<any>(null);

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
      <Header />
      <Container maxWidth="lg">
        <Hero />
        <FeaturedVideo />
        {randomProblem && <ProblemOfTheDay problem={randomProblem} />}
        <MotivationalQuotes />
        <UpcomingEvents />
        <PopularCourses />
      </Container>
      <Footer />
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
