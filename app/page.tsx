"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import * as XLSX from "xlsx";

export default function Home() {
  const [latexInput, setLatexInput] = useState("");
  const [problem, setProblem] = useState("");
  const [hint, setHint] = useState("");
  const [solution, setSolution] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    fetch("/db.xlsx")
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        const randomIndex = Math.floor(Math.random() * json.length);
        const randomProblem = json[randomIndex];
        setProblem(randomProblem.Problem);
        setHint(randomProblem.Hint);
        setSolution(randomProblem.Solution);
        setLatexInput(randomProblem.Problem);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-teal-400 to-violet-500 text-white">
      <section className="w-full max-w-5xl text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Example Problem</h2>
        <p className="mb-4">{problem}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full mr-4"
          onClick={() => setShowHint(!showHint)}
        >
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full"
          onClick={() => setShowSolution(!showSolution)}
        >
          {showSolution ? "Hide Solution" : "Show Solution"}
        </button>
        {showHint && <p className="mt-4">{hint}</p>}
        {showSolution && <p className="mt-4">{solution}</p>}
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
        <h2 className="text-3xl font-bold mb-4">Random Math Problem</h2>
        <MathJaxContext>
          <div className="mt-4 p-4 bg-white text-black rounded">
            <MathJax>{latexInput}</MathJax>
          </div>
          <textarea
            className="w-full h-48 p-4 mt-4 text-black"
            placeholder="Write your solution here..."
            value={latexInput}
            onChange={(e) => setLatexInput(e.target.value)}
          />
        </MathJaxContext>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 mr-4"
          onClick={() => setShowHint(!showHint)}
        >
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full mt-4"
          onClick={() => setShowSolution(!showSolution)}
        >
          {showSolution ? "Hide Solution" : "Show Solution"}
        </button>
        {showHint && <p className="mt-4">{hint}</p>}
        {showSolution && <p className="mt-4">{solution}</p>}
      </section>

      <section className="w-full max-w-5xl text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p>Email: contact@matholympiads.com</p>
        <p>Phone: +123 456 7890</p>
      </section>
    </main>
  );
}
