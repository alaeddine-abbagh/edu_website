"use client";

import { useState, useEffect } from "react";
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
      <main className="min-h-screen bg-white text-gray-800">
        <header className="bg-blue-600 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">Math Olympiads</h1>
              <nav className="space-x-4">
                <Link href="/explore" className="hover:underline">Explore</Link>
                <Link href="/add-problem" className="hover:underline">Add Problem</Link>
              </nav>
            </div>
          </div>
        </header>

        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-6">Unlock Your Mathematical Potential</h2>
            <p className="text-xl mb-8">Join our community of young mathematicians and prepare for Math Olympiads</p>
            <Link href="/explore" className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300">
              Start Exploring
            </Link>
          </div>
        </section>

        <section className="py-48 bg-blue-100">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold mb-24 text-center text-blue-800">Featured Video</h2>
            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="md:w-2/3 mb-20 md:mb-0 md:pr-20">
                <div className="aspect-w-16 aspect-h-9 h-[500px]">
                  <iframe
                    src="https://www.youtube.com/embed/eCobHMHHKRE"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg shadow-2xl"
                  ></iframe>
                </div>
              </div>
              <div className="md:w-1/3">
                <h3 className="text-4xl font-bold mb-10 text-blue-800">Why Math Olympiads Matter</h3>
                <p className="text-blue-600 mb-10 text-2xl leading-relaxed">Discover how participating in Math Olympiads can boost your problem-solving skills and open up new opportunities in your academic journey.</p>
                <Link href="/explore" className="bg-blue-600 text-white px-12 py-5 rounded-full hover:bg-blue-700 transition duration-300 text-2xl font-semibold">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {randomProblem && (
          <section className="py-24 bg-purple-100">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-8 text-center text-purple-800">Problem of the Day</h2>
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
                <h3 className="font-bold text-2xl mb-4 text-purple-600">Problem Statement:</h3>
                <MathJax dynamic>{parseContent(JSON.parse(randomProblem.statement)[language])}</MathJax>
                <button
                  onClick={() => setLanguage(prev => prev === "fr" ? "en" : "fr")}
                  className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  {language === "fr" ? "Switch to English" : "Passer au Français"}
                </button>
                <div className="mt-8">
                  <h4 className="font-bold text-xl mb-2 text-purple-600">Your Answer:</h4>
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full p-2 border border-purple-300 rounded"
                    rows={4}
                    placeholder="Type your answer here..."
                  />
                  <MathJax dynamic>{parseContent(userAnswer)}</MathJax>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-24 bg-green-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-green-800">Motivational Quotes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-xl italic text-green-600">"Mathematics is the language in which God has written the universe."</p>
                <p className="mt-4 text-right font-semibold text-green-800">- Galileo Galilei</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-xl italic text-green-600">"Pure mathematics is, in its way, the poetry of logical ideas."</p>
                <p className="mt-4 text-right font-semibold text-green-800">- Albert Einstein</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-xl mb-3 text-blue-600">International Math Olympiad</h3>
                <p className="text-gray-600 mb-4">Date: July 15-25, 2023</p>
                <p className="text-gray-600 mb-4">Location: Tokyo, Japan</p>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Register Now</button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-xl mb-3 text-blue-600">European Girls' Mathematical Olympiad</h3>
                <p className="text-gray-600 mb-4">Date: April 13-19, 2024</p>
                <p className="text-gray-600 mb-4">Location: Tbilisi, Georgia</p>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Learn More</button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-bold text-xl mb-3 text-blue-600">Asian Pacific Mathematics Olympiad</h3>
                <p className="text-gray-600 mb-4">Date: March 8, 2024</p>
                <p className="text-gray-600 mb-4">Location: Various Countries</p>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">More Info</button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Popular Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
                <h3 className="font-bold text-xl mb-3 text-blue-600">Introduction to Algebra</h3>
                <p className="text-gray-600 mb-4">Learn the basics of algebra and build a strong foundation for advanced mathematics.</p>
                <ul className="text-gray-600 mb-4 list-disc list-inside">
                  <li>Linear equations</li>
                  <li>Quadratic equations</li>
                  <li>Polynomials</li>
                </ul>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Enroll Now</button>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
                <h3 className="font-bold text-xl mb-3 text-blue-600">Geometry Fundamentals</h3>
                <p className="text-gray-600 mb-4">Explore geometric concepts and develop spatial reasoning skills.</p>
                <ul className="text-gray-600 mb-4 list-disc list-inside">
                  <li>Euclidean geometry</li>
                  <li>Trigonometry</li>
                  <li>Coordinate geometry</li>
                </ul>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Enroll Now</button>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
                <h3 className="font-bold text-xl mb-3 text-blue-600">Calculus I</h3>
                <p className="text-gray-600 mb-4">Dive into differential calculus and its applications in problem-solving.</p>
                <ul className="text-gray-600 mb-4 list-disc list-inside">
                  <li>Limits and continuity</li>
                  <li>Derivatives</li>
                  <li>Applications of derivatives</li>
                </ul>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Enroll Now</button>
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
