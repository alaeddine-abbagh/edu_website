"use client";

import { useState } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";

export default function AddProblemPage() {
  const [formData, setFormData] = useState({
    statement: "",
    solution: "",
    difficultyLevel: "",
    hint: "",
    category: "",
    comment: "",
    ideas: "",
    type: "",
    origin: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Fetch the existing workbook
      const response = await fetch("/db.xlsx");
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });

      // Get the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON
      const json = XLSX.utils.sheet_to_json(sheet);

      // Add new problem to JSON
      json.push(formData);

      // Convert JSON back to sheet
      const newSheet = XLSX.utils.json_to_sheet(json);

      // Replace the sheet in the workbook
      workbook.Sheets[sheetName] = newSheet;

      // Write the workbook to a file
      const newWorkbook = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

      // Create a Blob from the workbook
      const blob = new Blob([newWorkbook], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "db.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);

      alert("Problem added successfully!");
      
      // Reset the form
      setFormData({
        statement: "",
        solution: "",
        difficultyLevel: "",
        hint: "",
        category: "",
        comment: "",
        ideas: "",
        type: "",
        origin: "",
      });
    } catch (error) {
      console.error("Error adding problem:", error);
      alert("An error occurred while adding the problem. Please try again.");
    }
  };

  return (
    <main className="min-h-screen p-24 bg-gradient-to-r from-teal-400 to-violet-500 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Add New Problem</h1>
          <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded-full">
            Back to Home
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-white">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {key === "statement" || key === "solution" ? (
                <textarea
                  id={key}
                  name={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                />
              ) : (
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                />
              )}
            </div>
          ))}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Problem
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
