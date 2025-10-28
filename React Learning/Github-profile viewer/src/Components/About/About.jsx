import React, { useState, useEffect } from "react";

export default function About() {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetching data from GitHub API (example, replace with your API)
        fetch('https://api.github.com/repos/facebook/react')
            .then(response => response.json())
            .then(data => {
                setAboutData({
                    description: data.description,
                    stars: data.stargazers_count,
                    forks: data.forks_count,
                    openIssues: data.open_issues_count,
                    language: data.language,
                });
                setLoading(false);  // Data has been fetched, stop loading
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);  // In case of error, stop loading
            });
    }, []);

    if (loading) {
        return <div className="text-center text-2xl mt-10">Loading...</div>;
    }

    return (
        <div className="mx-auto w-full max-w-7xl p-5">
            <h1 className="text-3xl font-bold text-center">About Us</h1>

            <p className="text-xl mt-8">
                {aboutData.description}
            </p>

            <h2 className="text-2xl font-semibold mt-6">Repository Stats</h2>
            <ul className="list-disc list-inside mt-4">
                <li>Stars: {aboutData.stars}</li>
                <li>Forks: {aboutData.forks}</li>
                <li>Open Issues: {aboutData.openIssues}</li>
                <li>Language: {aboutData.language}</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6">How It Works</h2>
            <p className="text-xl mt-4">
                The platform connects to the GitHub API to fetch data for user profiles and repositories. Users can search for any GitHub username to explore their contributions, repositories, and other information.
            </p>

            <div className="mt-8">
                <p className="font-semibold text-lg">Created By:</p>
                <p className="text-lg">John Doe, a software engineer and GitHub enthusiast, created this platform to make exploring GitHub profiles quicker and more user-friendly.</p>
            </div>
        </div>
    );
}
