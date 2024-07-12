"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import * as XLSX from "xlsx";

const MathJax = dynamic(() => import('better-react-mathjax').then(mod => mod.MathJax), { ssr: false });
const MathJaxContext = dynamic(() => import('better-react-mathjax').then(mod => mod.MathJaxContext), { ssr: false });

const popularCourses = [
  { id: 1, title: "Introduction to Algebra", description: "Learn the basics of algebra" },
  { id: 2, title: "Geometry Fundamentals", description: "Explore geometric concepts" },
  { id: 3, title: "Calculus I", description: "Dive into differential calculus" },
  { id: 4, title: "Statistics for Beginners", description: "Understand basic statistical concepts" },
];

const motivationalSlogans = [
  "Mathematics is the language in which God has written the universe.",
  "In mathematics, the art of proposing a question must be held of higher value than solving it.",
  "Pure mathematics is, in its way, the poetry of logical ideas.",
  "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding.",
];

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

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [randomProblem, setRandomProblem] = useState<any>(null);
  const [language, setLanguage] = useState<"fr" | "en">("en");

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
    <MathJaxContext config={config}>
      <main className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">Math Olympiads</h1>
            <nav>
              <Link href="/explore" className="mr-4 text-gray-600 hover:text-blue-600 transition duration-300">Explore</Link>
              <Link href="/add-problem" className="text-gray-600 hover:text-blue-600 transition duration-300">Add Problem</Link>
            </nav>
          </div>
        </header>

        <div className="container mx-auto mt-16 px-4">
          <section className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Find Your Next Course</h2>
            <div className="flex max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search courses..."
                className="flex-grow p-4 border-2 border-blue-300 rounded-l-lg focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-blue-600 text-white px-8 py-4 rounded-r-lg hover:bg-blue-700 transition duration-300">Search</button>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Featured Video</h2>
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <iframe
                src="https://www.youtube.com/embed/eCobHMHHKRE"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.youtube.com/embed/VIDEO_ID_1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.youtube.com/embed/VIDEO_ID_2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.youtube.com/embed/VIDEO_ID_3"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Motivational Quotes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {motivationalSlogans.map((slogan, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-xl text-gray-800 italic">{slogan}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Popular Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularCourses.map((course) => (
                <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
                  <h3 className="font-bold text-xl mb-3 text-blue-600">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Learn More</button>
                </div>
              ))}
            </div>
          </section>

          {randomProblem && (
            <section className="mt-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Problem of the Day</h2>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-xl mb-3 text-blue-600">Problem Statement:</h3>
                <MathJax dynamic>{parseContent(JSON.parse(randomProblem.statement)[language])}</MathJax>
                <button
                  onClick={() => setLanguage(prev => prev === "fr" ? "en" : "fr")}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  {language === "fr" ? "Switch to English" : "Passer au Français"}
                </button>
              </div>
            </section>
          )}
        </div>

        <footer className="bg-gray-800 text-white mt-16 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-4">Math Olympiads</h3>
                <p>Empowering students with advanced mathematical skills.</p>
              </div>
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                <ul>
                  <li><Link href="/about" className="hover:text-blue-300">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-blue-300">Contact</Link></li>
                  <li><Link href="/privacy" className="hover:text-blue-300">Privacy Policy</Link></li>
                </ul>
              </div>
              <div className="w-full md:w-1/3">
                <h4 className="text-xl font-bold mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-blue-300"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="text-white hover:text-blue-300"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="text-white hover:text-blue-300"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p>&copy; 2023 Math Olympiads. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </MathJaxContext>
  );
}
