import React from 'react';
import { Link } from '@inertiajs/react';
import { FaUser, FaClipboardList, FaCommentDots, FaSignOutAlt, FaClock, FaBusinessTime } from 'react-icons/fa'; 

export default function Sidebar() {
    return (
        <div className="bg-gray-800 text-white p-6 w-1/7 h-screen mt-20">
            <ul>
                <li>
                    <Link href={route('AdminDashboard')} className="flex items-center text-white py-3 px-5 rounded-lg hover:bg-gray-700 transition duration-300">
                        <FaClipboardList className="text-base mr-4" />
                        <span className="text-base font-small">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href={route('usersub')} className="flex items-center text-white py-3 px-5 rounded-lg hover:bg-gray-700 transition duration-300">
                        <FaUser className="text-base mr-4" />
                        <span className="text-base font-medium">User Management</span>
                    </Link>
                </li>
                <li>
                    <Link href="/BusinessHours" className="flex items-center text-white py-3 px-5 rounded-lg hover:bg-gray-700 transition duration-300">
                        <FaBusinessTime className="text-base mr-4" />
                        <span className="text-base font-medium">Business Hours</span>
                    </Link>
                    <Link href="/viewFeedback" className="flex items-center text-white py-3 px-5 rounded-lg hover:bg-gray-700 transition duration-300">
                        <FaCommentDots className="text-base mr-4" />
                        <span className="text-base font-medium">Feedback</span>
                    </Link>
                </li>
                <li>
                    <Link href="/logout" method="post" className="flex items-center text-white py-3 px-5 rounded-lg hover:bg-gray-700 transition duration-300">
                        <FaSignOutAlt className="text-base mr-4" />
                        <span className="text-base font-medium">Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}