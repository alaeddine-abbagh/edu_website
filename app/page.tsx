import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [latexInput, setLatexInput] = useState("");

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
        <h2 className="text-3xl font-bold mb-4">Solve Math Problems with LaTeX</h2>
        <textarea
          className="w-full h-48 p-4 text-black"
          placeholder="Write your LaTeX here..."
          value={latexInput}
          onChange={(e) => setLatexInput(e.target.value)}
        />
        <div className="mt-4 p-4 bg-white text-black rounded">
          {/* Render LaTeX output here */}
          {latexInput}
        </div>
      </section>

      <section className="w-full max-w-5xl text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p>Email: contact@matholympiads.com</p>
        <p>Phone: +123 456 7890</p>
      </section>
    </main>
  );
}
