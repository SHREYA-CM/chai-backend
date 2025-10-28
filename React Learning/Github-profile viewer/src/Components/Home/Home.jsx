import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl">
            {/* Hero Section */}
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                        <h2 className="text-4xl font-bold sm:text-5xl">
                            Welcome to GitHub Profile Viewer
                            <span className="hidden sm:block text-4xl">Find out more about developers around the world!</span>
                        </h2>

                        <p className="text-lg sm:text-xl">
                            This platform helps you quickly search and view GitHub profiles with detailed insights into their repositories, followers, and contributions.
                        </p>

                        <Link
                            className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                            to="/github"
                        >
                            <svg
                                fill="white"
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            >
                                <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
                            </svg>
                            &nbsp; Try it now
                        </Link>
                    </div>
                </div>

                <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full">
                    <img className="w-96" src="/home.jpeg" alt="GitHub Profiles" />
                </div>
            </aside>

            {/* Add the new GitHub image */}
            <div className="grid place-items-center sm:mt-20">
                <img className="sm:w-96 w-48" src="/Github.jpeg" alt="GitHub Image" />
            </div>

            {/* Introduction Section */}
            <div className="text-center mt-12">
                <h2 className="text-3xl font-bold">Welcome to GitHub Profile Viewer</h2>
                <p className="text-lg mt-4">
                    Discover GitHub profiles, explore repositories, and get insights about developers and their contributions. 
                    Start searching and make your GitHub journey more insightful!
                </p>
            </div>

            {/* Features Section */}
            <div className="text-center mt-12">
                <h2 className="text-2xl font-semibold">Why Use GitHub Profile Viewer?</h2>
                <ul className="list-inside mt-4 text-lg">
                    <li>Quickly search for GitHub profiles</li>
                    <li>View detailed information about developers and their repositories</li>
                    <li>Explore contributions, stars, and forks of repositories</li>
                    <li>Responsive and easy to navigate</li>
                </ul>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-8">
                <Link 
                    to="/github"
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                >
                    Start Exploring Profiles
                </Link>
            </div>

            {/* Stats Section */}
            <div className="text-center mt-12">
                <h2 className="text-2xl font-semibold">Platform Stats</h2>
                <p className="text-lg mt-4">Over 1,500 profiles viewed and 100,000+ repositories explored!</p>
            </div>

            {/* Search Section */}
            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">Search for GitHub Developers & Projects</h1>
        </div>
    );
}
