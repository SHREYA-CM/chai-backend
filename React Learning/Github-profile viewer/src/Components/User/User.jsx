import React from 'react';
import { useParams } from 'react-router-dom';

export default function User() {
    const { userid } = useParams(); // Get the dynamic user ID from the URL

    return (
        <div className="text-center p-5">
            <h1 className="text-2xl font-bold">User Page</h1>
            <p className="text-lg">User ID: {userid}</p>
        </div>
    );
}
