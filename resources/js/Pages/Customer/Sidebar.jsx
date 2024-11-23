import React from 'react';
import { Link } from '@inertiajs/react';
import { FaCar, FaCalendarAlt, FaClipboardList, FaCommentDots, FaHistory, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
    return (
        <div className="relative">
            {/* Sidebar */}
            <div className="bg-gray-800 text-white p-6 w-[250px] h-screen mt-20">
                <ul>
                    {/* Dashboard Link */}
                    <li>
                        <Link href={route('CustomerDashboard')} className="flex items-center text-white py-3 px-5 rounded-lg hover:bg-gray-700 transition duration-300">
                            <FaClipboardList className="text-base mr-4" />
                            <span className="text-base font-small">Dashboard</span>
                        </Link>
                    </li>

                    {/* My Vehicles Link */}
                    <li>
                        <Link href="/MyVehicles" className="flex items-center text-white py-3 px-5 rounded-lg hover:bg-gray-700 transition duration-300">
                            <FaCar className="text-base mr-4" />
                            <span className="text-base font-medium">My Vehicles</span>
                        </Link>
                    </li>

                    {/* Appointments Link */}
                    <li>
                        <Link href="/appointments" className="flex items-center text-white py-3 px-5 rounded-lg hover:bg-gray-700 transition duration-300">
                            <FaCalendarAlt className="text-base mr-4" />
                            <span className="text-base font-medium">Appointments</span>
                        </Link>
                    </li>

                    {/* Feedback Link */}
                    <li>
                        <Link href="/AddFeedback" className="flex items-center text-white py-3 px-5 rounded-lg hover:bg-gray-700 transition duration-300">
                            <FaCommentDots className="text-base mr-4" />
                            <span className="text-base font-medium">Feedback</span>
                        </Link>
                    </li>

                    {/* Service History Link */}
                    <li>
                        <Link href="/servicehistory" className="flex items-center text-white py-3 px-5 rounded-lg hover:bg-gray-700 transition duration-300">
                            <FaHistory className="text-base mr-4" />
                            <span className="text-base font-medium">Service History</span>
                        </Link>
                    </li>

                    {/* Notifications Link */}
                    <li>
                        <Link href="/notifications" className="flex items-center text-white py-3 px-5 rounded-lg hover:bg-gray-700 transition duration-300">
                            <FaBell className="text-base mr-4" />
                            <span className="text-base font-medium">Notifications</span>
                        </Link>
                    </li>

                    {/* Profile Link */}
                    <li>
                        <Link href="/ProfileSettings" className="flex items-center text-white py-3 px-5 rounded-lg hover:bg-gray-700 transition duration-300">
                            <FaCog className="text-base mr-4" />
                            <span className="text-base font-medium">Profile</span>
                        </Link>
                    </li>

                    {/* Logout Link */}
                    <li>
                        <Link href={route('logout')} method="post" as="button" className="flex items-center text-white py-3 px-5 rounded-lg hover:bg-gray-700 transition duration-300">
                            <FaSignOutAlt className="text-base mr-4" />
                            <span className="text-base font-medium">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>

           
        </div>
    );
}
