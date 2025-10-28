import React, { useEffect, useState } from "react";

export default function Github() {
    const [username, setUsername] = useState("octocat"); // Default username
    const [githubData, setGithubData] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    // Function to fetch GitHub data
    const fetchGithubData = (user) => {
        setLoading(true);
        setError(null);

        Promise.all([
            fetch(`https://api.github.com/users/${user}`).then(res => res.ok ? res.json() : Promise.reject("User not found")),
            fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=5`).then(res => res.ok ? res.json() : Promise.reject("No repositories found"))
        ])
        .then(([userData, repoData]) => {
            setGithubData(userData);
            setRepos(repoData);
            setLoading(false);
            saveSearch(user); // Save search history
        })
        .catch((error) => {
            setError(error);
            setGithubData(null);
            setRepos([]);
            setLoading(false);
        });
    };

    // Load last searched username from localStorage
    useEffect(() => {
        const lastSearch = localStorage.getItem("lastSearch");
        if (lastSearch) setUsername(lastSearch);
        fetchGithubData(lastSearch || "octocat");
    }, []);

    // Save last searched username
    const saveSearch = (user) => localStorage.setItem("lastSearch", user);

    // Toggle dark mode
    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div className={`flex flex-col items-center p-5 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
            {/* Dark Mode Toggle */}
            <button onClick={toggleDarkMode} className="absolute top-4 right-4 bg-gray-700 text-white px-3 py-1 rounded-md">
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <h1 className="text-3xl font-bold mb-4">GitHub Profile Viewer</h1>

            {/* Search Box */}
            <div className="mb-6 flex">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username..."
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <button
                    onClick={() => fetchGithubData(username)}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Search
                </button>
            </div>

            {/* Display Data */}
            {loading && <div className="flex justify-center items-center"><div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div></div>}
            {error && <p className="text-red-500">{error}</p>}

            {githubData && (
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center dark:bg-gray-800">
                    <img
                        src={githubData.avatar_url}
                        alt="GitHub Avatar"
                        className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-blue-400"
                    />
                    <h2 className="text-xl font-semibold">{githubData.name || githubData.login}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{githubData.bio || "No bio available."}</p>

                    {/* Extra Info */}
                    <div className="flex justify-around mt-4 text-gray-700 dark:text-gray-300">
                        <p><strong>{githubData.followers}</strong> Followers</p>
                        <p><strong>{githubData.following}</strong> Following</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Public Repos: {githubData.public_repos}</p>
                    <p className="text-gray-600 dark:text-gray-300">{githubData.location || "Location Unknown"}</p>

                    {/* Links */}
                    {githubData.twitter_username && (
                        <p className="mt-2">
                            Twitter: <a href={`https://twitter.com/${githubData.twitter_username}`} target="_blank" rel="noopener noreferrer" className="text-blue-500"> @{githubData.twitter_username} </a>
                        </p>
                    )}
                    {githubData.blog && (
                        <p>
                            Website: <a href={githubData.blog} target="_blank" rel="noopener noreferrer" className="text-blue-500"> Visit </a>
                        </p>
                    )}

                    <a
                        href={githubData.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        View Profile
                    </a>
                </div>
            )}

            {/* User Repositories */}
            {repos.length > 0 && (
                <div className="mt-6 w-full max-w-lg">
                    <h3 className="text-2xl font-bold mb-3 text-center">Top Repositories</h3>
                    <ul className="space-y-3">
                        {repos.map(repo => (
                            <li key={repo.id} className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg shadow-md">
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-semibold">
                                    {repo.name}
                                </a>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{repo.description || "No description"}</p>
                                <p className="text-sm text-gray-500">⭐ {repo.stargazers_count}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
