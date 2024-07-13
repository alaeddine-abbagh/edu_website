import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import dynamic from 'next/dynamic';

const MathJax = dynamic(() => import('better-react-mathjax').then(mod => mod.MathJax), { ssr: false });

interface ProblemOfTheDayProps {
  problem: any;
}

const parseContent = (content: string) => {
  return content.replace(/\$\$(.*?)\$\$/g, '\\[$1\\]')
                .replace(/\$(.*?)\$/g, '\\($1\\)');
};

const ProblemOfTheDay: React.FC<ProblemOfTheDayProps> = ({ problem }) => {
  const [language, setLanguage] = useState<"fr" | "en">("en");
  const [userAnswer, setUserAnswer] = useState("");

  if (!problem) return null;

  return (
    <Paper elevation={3} sx={{ p: 4, my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Problem of the Day
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Problem Statement:
      </Typography>
      <MathJax dynamic>{parseContent(JSON.parse(problem.statement)[language])}</MathJax>
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
  );
};

export default React.memo(ProblemOfTheDay);
