"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import * as XLSX from "xlsx";

const MathJax = dynamic(() => import('better-react-mathjax').then(mod => mod.MathJax), { ssr: false });
const MathJaxContext = dynamic(() => import('better-react-mathjax').then(mod => mod.MathJaxContext), { ssr: false });

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
  const [randomProblem, setRandomProblem] = useState<any>(null);
  const [language, setLanguage] = useState<"fr" | "en">("en");
  const [userAnswer, setUserAnswer] = useState("");
  const [sections, setSections] = useState([false, false, false, false]);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setSections(prev => {
                const newSections = [...prev];
                newSections[index] = true;
                return newSections;
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <MathJaxContext config={config}>
      <main className="min-h-screen bg-white text-gray-800">
        <header className="bg-blue-600 text-white py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">Math Olympiads</h1>
            <nav className="mt-4">
              <Link href="/explore" className="mr-4 hover:underline">Explore</Link>
              <Link href="/add-problem" className="hover:underline">Add Problem</Link>
            </nav>
          </div>
        </header>

        <section ref={el => sectionRefs.current[0] = el} className={`py-24 transition-opacity duration-1000 ${sections[0] ? 'opacity-100' : 'opacity-0'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold mb-12 text-center">Featured Video</h2>
            <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto">
              <iframe
                src="https://www.youtube.com/embed/eCobHMHHKRE"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>

        {randomProblem && (
          <section ref={el => sectionRefs.current[1] = el} className={`py-24 bg-gray-100 transition-opacity duration-1000 ${sections[1] ? 'opacity-100' : 'opacity-0'}`}>
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-8 text-center">Problem of the Day</h2>
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
                <h3 className="font-bold text-2xl mb-4 text-blue-600">Problem Statement:</h3>
                <MathJax dynamic>{parseContent(JSON.parse(randomProblem.statement)[language])}</MathJax>
                <button
                  onClick={() => setLanguage(prev => prev === "fr" ? "en" : "fr")}
                  className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  {language === "fr" ? "Switch to English" : "Passer au Français"}
                </button>
                <div className="mt-8">
                  <h4 className="font-bold text-xl mb-2">Your Answer:</h4>
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={4}
                    placeholder="Type your answer here..."
                  />
                  <MathJax dynamic>{parseContent(userAnswer)}</MathJax>
                </div>
              </div>
            </div>
          </section>
        )}

        <section ref={el => sectionRefs.current[2] = el} className={`py-24 transition-opacity duration-1000 ${sections[2] ? 'opacity-100' : 'opacity-0'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Motivational Quotes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
                <p className="text-xl italic">"Mathematics is the language in which God has written the universe."</p>
              </div>
              <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
                <p className="text-xl italic">"Pure mathematics is, in its way, the poetry of logical ideas."</p>
              </div>
            </div>
          </div>
        </section>

        <section ref={el => sectionRefs.current[3] = el} className={`py-24 bg-gray-100 transition-opacity duration-1000 ${sections[3] ? 'opacity-100' : 'opacity-0'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Popular Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
                <h3 className="font-bold text-xl mb-3 text-blue-600">Introduction to Algebra</h3>
                <p className="text-gray-600 mb-4">Learn the basics of algebra</p>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Learn More</button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
                <h3 className="font-bold text-xl mb-3 text-blue-600">Geometry Fundamentals</h3>
                <p className="text-gray-600 mb-4">Explore geometric concepts</p>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Learn More</button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
                <h3 className="font-bold text-xl mb-3 text-blue-600">Calculus I</h3>
                <p className="text-gray-600 mb-4">Dive into differential calculus</p>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Learn More</button>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-gray-800 text-white py-12">
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
