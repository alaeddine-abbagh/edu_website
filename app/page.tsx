"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const popularCourses = [
  { id: 1, title: "Introduction to Algebra", description: "Learn the basics of algebra" },
  { id: 2, title: "Geometry Fundamentals", description: "Explore geometric concepts" },
  { id: 3, title: "Calculus I", description: "Dive into differential calculus" },
  { id: 4, title: "Statistics for Beginners", description: "Understand basic statistical concepts" },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Math Olympiads</h1>
          <nav>
            <Link href="/explore" className="mr-4 hover:underline">Explore</Link>
            <Link href="/add-problem" className="hover:underline">Add Problem</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto mt-8 px-4">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Find Your Next Course</h2>
          <div className="flex">
            <input
              type="text"
              placeholder="Search courses..."
              className="flex-grow p-2 border rounded-l"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r">Search</button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Popular Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularCourses.map((course) => (
              <div key={course.id} className="bg-white p-4 rounded shadow">
                <h3 className="font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600">{course.description}</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Learn More</button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="container mx-auto px-4">
          <p>&copy; 2023 Math Olympiads. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
