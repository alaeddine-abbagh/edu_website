"use client";

import { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import * as XLSX from "xlsx";

export default function Home() {
  const [latexInput, setLatexInput] = useState("");
  const [problem, setProblem] = useState("");
  const [hint, setHint] = useState("");
  const [solution, setSolution] = useState("");
  const [userSolution, setUserSolution] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    fetch("db.xlsx")
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        const randomIndex = Math.floor(Math.random() * json.length);
        const randomProblem = json[randomIndex] as any;
        
        setProblem(`\\[${randomProblem.statement}\\]`);
        setHint(`\\[${randomProblem.hint}\\]`);
        setSolution(`\\[${randomProblem.solution}\\]`);
      });
  }, []);

  const handleUserSolutionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserSolution(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-teal-400 to-violet-500 text-white">
      <section className="w-full max-w-5xl text-center py-16">
        <h1 className="text-5xl font-bold mb-8">Welcome to Math Olympiads</h1>
        <p className="text-xl mb-8">
          Join us to take lectures, solve math problems, and exchange knowledge.
        </p>
        <video
          className="w-full max-w-3xl mx-auto mb-8"
          controls
          src="path_to_your_video.mp4"
          alt="Introduction Video"
        />
        <button className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold">
          Subscribe Now
        </button>
      </section>

      <section className="w-full max-w-5xl text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p>Email: contact@matholympiads.com</p>
        <p>Phone: +123 456 7890</p>
      </section>

      <section className="w-full max-w-5xl text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Problème du Jour</h2>
        <MathJaxContext>
          <div className="mb-4">
            <MathJax dynamic>{problem}</MathJax>
          </div>
          <div className="mb-4">
            <textarea
              className="w-full p-2 text-black"
              rows={5}
              value={userSolution}
              onChange={handleUserSolutionChange}
              placeholder="Écrivez votre solution en LaTeX ici..."
            />
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Votre solution compilée:</h3>
            <MathJax dynamic>{userSolution}</MathJax>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full mr-4"
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? "Cacher l'indice" : "Montrer l'indice"}
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full"
            onClick={() => setShowSolution(!showSolution)}
          >
            {showSolution ? "Cacher la solution" : "Montrer la solution"}
          </button>
          {showHint && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Indice:</h3>
              <MathJax dynamic>{hint}</MathJax>
            </div>
          )}
          {showSolution && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Solution:</h3>
              <MathJax dynamic>{solution}</MathJax>
            </div>
          )}
        </MathJaxContext>
      </section>
    </main>
  );
}
