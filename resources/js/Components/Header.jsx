import React from 'react';
import { Link } from '@inertiajs/react';

export default function Header({auth}){

    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="#" className="text-yellow-400 text-lg font-bold">Shantha Engineering</a>
                    <button
                        type="button"
                        className="text-white md:hidden focus:outline-none"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle Navbar"
                    >
                        <span className="material-icons">menu</span>
                    </button>
                    <div className="hidden md:flex md:items-center" id="navbarNav">
                        <ul className="flex space-x-4">
                            <li>
                                <Link href="/" className="text-white hover:text-yellow-400">Home</Link>
                            </li>
                            <li>
                                <Link href="/Services" className="text-white hover:text-yellow-400">Services</Link>
                            </li>
                            <li>
                                <Link href="/Media" className="text-white hover:text-yellow-400">Media</Link>
                            </li>
                            <li>
                                <Link href="/About" className="text-white hover:text-yellow-400">About Us</Link>
                            </li>
                            <li>
                                <Link href="/ContactUs" className="text-white hover:text-yellow-400">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex space-x-2">
                            <>
                            <Link
                            href={route('register')}
                            type="button"
                            className="border border-gray-400 text-gray-400 py-2 px-4 rounded hover:bg-gray-700 hover:text-white">Register</Link>
                            <Link
                            active={route().current('CustomerDashboard')}
                            href={route('login')}
                            type="button"
                            className="border border-yellow-400 text-yellow-400 py-2 px-4 rounded hover:bg-yellow-400 hover:text-gray-800">Login</Link>
                            </>

                    </div>
                </div>
            </nav>
        </div>
    );
}

