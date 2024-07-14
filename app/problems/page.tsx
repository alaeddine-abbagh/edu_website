"use client";

import React from 'react';
import { ThemeProvider, createTheme, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Mock data for problems
const mockProblems = [
  { id: 1, title: "Problem 1", difficulty: "Easy", category: "Algebra" },
  { id: 2, title: "Problem 2", difficulty: "Medium", category: "Geometry" },
  { id: 3, title: "Problem 3", difficulty: "Hard", category: "Number Theory" },
];

export default function ProblemsPage() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container mx-auto px-4 py-8 text-white">
        <h1 className="text-3xl font-bold mb-4 text-white">Problems</h1>
        <List>
          {mockProblems.map((problem, index) => (
            <React.Fragment key={problem.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={problem.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className="text-gray-300"
                      >
                        Difficulty: {problem.difficulty}
                      </Typography>
                      {" — "}
                      <Typography
                        component="span"
                        variant="body2"
                        className="text-gray-300"
                      >
                        Category: {problem.category}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < mockProblems.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </div>
    </ThemeProvider>
  );
}
