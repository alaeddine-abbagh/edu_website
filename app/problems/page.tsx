"use client";

import React from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function ProblemsPage() {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Add New Problem</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Statement (French)"
          multiline
          rows={4}
          fullWidth
          value={problem.statement.fr}
          onChange={handleChange('statement', 'fr')}
        />
        <TextField
          label="Statement (English)"
          multiline
          rows={4}
          fullWidth
          value={problem.statement.en}
          onChange={handleChange('statement', 'en')}
        />
        <TextField
          label="Solution (French)"
          multiline
          rows={4}
          fullWidth
          value={problem.solution.fr}
          onChange={handleChange('solution', 'fr')}
        />
        <TextField
          label="Solution (English)"
          multiline
          rows={4}
          fullWidth
          value={problem.solution.en}
          onChange={handleChange('solution', 'en')}
        />
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
        <TextField
          label="Hint (English)"
          fullWidth
          value={problem.hint.en}
          onChange={handleChange('hint', 'en')}
        />
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
  );
}
