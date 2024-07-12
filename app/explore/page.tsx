"use client";

import { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import * as XLSX from "xlsx";
import Link from "next/link";

const config = {
  loader: { load: ["input/asciimath", "[tex]/require", "[tex]/ams"] },
  tex: {
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]],
    packages: { "[+]": ["require", "ams"] },
  },
};

const parseContent = (content: string) => {
  return content.replace(/\$\$(.*?)\$\$/g, (_, match) => `\\[${match}\\]`)
                .replace(/\$(.*?)\$/g, (_, match) => `\\(${match}\\)`);
};

export default function ExplorePage() {
  const [problems, setProblems] = useState<any[]>([]);
  const [language, setLanguage] = useState<"fr" | "en">("fr");

  useEffect(() => {
    fetch("/db.xlsx")
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        setProblems(json as any[]);
      });
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === "fr" ? "en" : "fr");
  };

  return (
    <MathJaxContext config={config}>
      <main className="min-h-screen p-24 bg-gradient-to-r from-teal-400 to-violet-500 text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Problem Explorer</h1>
          <div>
            <button
              onClick={toggleLanguage}
              className="bg-purple-500 text-white px-4 py-2 rounded-full mr-4"
            >
              {language === "fr" ? "Switch to English" : "Passer au Français"}
            </button>
            <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded-full">
              Back to Home
            </Link>
          </div>
        </div>
        {problems.map((problem, index) => (
          <div key={index} className="bg-white text-black p-6 rounded-lg mb-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Problem {index + 1}</h2>
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Statement:</h3>
              <MathJax dynamic>{parseContent(JSON.parse(problem.statement)[language])}</MathJax>
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Hint:</h3>
              <MathJax dynamic>{parseContent(JSON.parse(problem.hint)[language])}</MathJax>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Solution:</h3>
              <MathJax dynamic>{parseContent(JSON.parse(problem.solution)[language])}</MathJax>
            </div>
          </div>
        ))}
      </main>
    </MathJaxContext>
  );
}
