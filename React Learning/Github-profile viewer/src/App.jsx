import { useState, useEffect } from "react";

export default function App() {
  // LocalStorage se dark mode ki state load karein
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Dark mode toggle function
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      // Update localStorage with the new theme preference
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  // Jab bhi darkMode change ho, class update karein
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold">Dark Mode Toggle</h1>
      <button
        onClick={toggleDarkMode}
        className="mt-4 px-6 py-2 bg-blue-500 dark:bg-yellow-500 text-white dark:text-black rounded-lg"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}
