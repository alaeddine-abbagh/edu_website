"use client";

import React from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, ThemeProvider, createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function AddProblemPage() {
  const [problem, setProblem] = React.useState({
    statement: { fr: "", en: "" },
    solution: { fr: "", en: "" },
    difficultyLevel: "",
    hint: { fr: "", en: "" },
    category: "",
    comment: "",
    ideas: "",
    type: "",
    origin: "",
  });

  const handleChange = (field: string, subfield?: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (subfield) {
      setProblem(prev => ({
        ...prev,
        [field]: { ...prev[field as keyof typeof prev], [subfield]: event.target.value }
      }));
    } else {
      setProblem(prev => ({ ...prev, [field]: event.target.value }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(problem); // For now, just log the problem. Later, you can send this to an API.
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container mx-auto px-4 py-8 text-white">
        <h1 className="text-3xl font-bold mb-4 text-white">Add New Problem</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Statement (French)"
            multiline
            rows={4}
            fullWidth
            value={problem.statement.fr}
            onChange={handleChange('statement', 'fr')}
          />
          <div className="mt-2 p-2 bg-gray-100 rounded text-black">
            {problem.statement.fr}
          </div>
          <TextField
            label="Statement (English)"
            multiline
            rows={4}
            fullWidth
            value={problem.statement.en}
            onChange={handleChange('statement', 'en')}
          />
          <div className="mt-2 p-2 bg-gray-100 rounded text-black">
            {problem.statement.en}
          </div>
          <TextField
            label="Solution (French)"
            multiline
            rows={4}
            fullWidth
            value={problem.solution.fr}
            onChange={handleChange('solution', 'fr')}
          />
          <div className="mt-2 p-2 bg-gray-100 rounded text-black">
            {problem.solution.fr}
          </div>
          <TextField
            label="Solution (English)"
            multiline
            rows={4}
            fullWidth
            value={problem.solution.en}
            onChange={handleChange('solution', 'en')}
          />
          <div className="mt-2 p-2 bg-gray-100 rounded text-black">
            {problem.solution.en}
          </div>
          <FormControl fullWidth>
            <InputLabel>Difficulty Level</InputLabel>
            <Select
              value={problem.difficultyLevel}
              onChange={handleChange('difficultyLevel')}
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Hint (French)"
            fullWidth
            value={problem.hint.fr}
            onChange={handleChange('hint', 'fr')}
          />
          <div className="mt-2 p-2 bg-gray-100 rounded text-black">
            {problem.hint.fr}
          </div>
          <TextField
            label="Hint (English)"
            fullWidth
            value={problem.hint.en}
            onChange={handleChange('hint', 'en')}
          />
          <div className="mt-2 p-2 bg-gray-100 rounded text-black">
            {problem.hint.en}
          </div>
          <TextField
            label="Category"
            fullWidth
            value={problem.category}
            onChange={handleChange('category')}
          />
          <TextField
            label="Comment"
            fullWidth
            value={problem.comment}
            onChange={handleChange('comment')}
          />
          <TextField
            label="Ideas"
            fullWidth
            value={problem.ideas}
            onChange={handleChange('ideas')}
          />
          <TextField
            label="Type"
            fullWidth
            value={problem.type}
            onChange={handleChange('type')}
          />
          <TextField
            label="Origin"
            fullWidth
            value={problem.origin}
            onChange={handleChange('origin')}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Problem
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
}
