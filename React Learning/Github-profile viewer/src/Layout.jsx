import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
}
