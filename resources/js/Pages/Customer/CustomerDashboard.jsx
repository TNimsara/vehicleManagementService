import React from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import Header from './Header'; // Import the Header component
import { usePage } from '@inertiajs/react';

export default function CustomerDashboard() {
    const user = usePage().props.auth.user;

    return (
        <>
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="content-area p-6 mt-[100px] bg-gray-100 min-h-screen flex-1 mr-0">
                    <div className="max-w-7xl max-w-full mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl w-full  overflow-hidden">
                            <div
                                className="relative h-64 bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
                                }}
                            >
                                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                                <div className="absolute bottom-0 left-0 p-8 text-white">
                                    <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}!</h1>
                                    <p className="text-xl">Your journey to exceptional service starts here.</p>
                                </div>
                            </div>
                            <div className="p-8">
                                {/* You can place any other content here */}
                                <h2 className="text-2xl font-semibold mb-4">Dashboard Content</h2>
                                <p>Welcome to your dashboard. Here you can manage your vehicle, appointments, and services.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
