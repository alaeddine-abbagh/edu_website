"use client";

import { useState, useEffect, useCallback } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import * as XLSX from "xlsx";
import Link from "next/link";

let workbook: XLSX.WorkBook | null = null;

// Helper function to parse content
const parseContent = (content: string) => {
  return content.replace(/\$\$(.*?)\$\$/g, (_, match) => `\\[${match}\\]`)
                .replace(/\$(.*?)\$/g, (_, match) => `\\(${match}\\)`);
};

const config = {
  loader: { load: ["input/asciimath", "[tex]/require", "[tex]/ams"] },
  tex: {
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
    packages: { "[+]": ["require", "ams"] },
  },
};

export default function Home() {
  const [latexInput, setLatexInput] = useState("");
  const [problem, setProblem] = useState("");
  const [hint, setHint] = useState("");
  const [solution, setSolution] = useState("");
  const [userSolution, setUserSolution] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [language, setLanguage] = useState<"fr" | "en">("fr");

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === "fr" ? "en" : "fr");
  }, []);

  const fetchRandomProblem = useCallback(() => {
    if (workbook) {
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      const randomIndex = Math.floor(Math.random() * json.length);
      const randomProblem = json[randomIndex] as any;
      
      setProblem(JSON.parse(randomProblem.statement)[language]);
      setHint(JSON.parse(randomProblem.hint)[language]);
      setSolution(JSON.parse(randomProblem.solution)[language]);
    }
  }, [language]);

  useEffect(() => {
    if (!workbook) {
      fetch("db.xlsx")
        .then((response) => response.arrayBuffer())
        .then((data) => {
          workbook = XLSX.read(data, { type: "array" });
          fetchRandomProblem();
        });
    } else {
      fetchRandomProblem();
    }
  }, [language, fetchRandomProblem]);

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
        <button className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold mr-4">
          Subscribe Now
        </button>
        <Link href="/explore" className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold">
          Explore Problems
        </Link>
      </section>

      <section className="w-full max-w-5xl text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p>Email: contact@matholympiads.com</p>
        <p>Phone: +123 456 7890</p>
      </section>

      <section className="w-full max-w-5xl text-center py-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">
            {language === "fr" ? "Problème du Jour" : "Problem of the Day"}
          </h2>
          <div>
            <button
              onClick={toggleLanguage}
              className="bg-purple-500 text-white px-4 py-2 rounded-full mr-4"
            >
              {language === "fr" ? "Switch to English" : "Passer au Français"}
            </button>
            <button
              onClick={fetchRandomProblem}
              className="bg-orange-500 text-white px-4 py-2 rounded-full"
            >
              {language === "fr" ? "Changer de problème" : "Change Problem"}
            </button>
          </div>
        </div>
        <MathJaxContext config={config}>
          <div className="mb-4">
            <MathJax dynamic>{parseContent(problem)}</MathJax>
          </div>
          <div className="mb-4">
            <textarea
              className="w-full p-2 text-black"
              rows={5}
              value={userSolution}
              onChange={handleUserSolutionChange}
              placeholder={language === "fr" ? "Écrivez votre solution en LaTeX ici..." : "Write your solution in LaTeX here..."}
            />
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">
              {language === "fr" ? "Votre solution compilée:" : "Your compiled solution:"}
            </h3>
            <MathJax dynamic>{parseContent(userSolution)}</MathJax>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full mr-4"
            onClick={() => setShowHint(!showHint)}
          >
            {showHint 
              ? (language === "fr" ? "Cacher l'indice" : "Hide hint")
              : (language === "fr" ? "Montrer l'indice" : "Show hint")
            }
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full"
            onClick={() => setShowSolution(!showSolution)}
          >
            {showSolution
              ? (language === "fr" ? "Cacher la solution" : "Hide solution")
              : (language === "fr" ? "Montrer la solution" : "Show solution")
            }
          </button>
          {showHint && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">{language === "fr" ? "Indice:" : "Hint:"}</h3>
              <MathJax dynamic>{parseContent(hint)}</MathJax>
            </div>
          )}
          {showSolution && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">{language === "fr" ? "Solution:" : "Solution:"}</h3>
              <MathJax dynamic>{parseContent(solution)}</MathJax>
            </div>
          )}
        </MathJaxContext>
      </section>
    </main>
  );
}
