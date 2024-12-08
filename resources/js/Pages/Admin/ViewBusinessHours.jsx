import React from 'react';
import Asidebar from './Asidebar';
import Aheader from './Aheader';
import BusinessHoursView from '@/Components/BusinessHoursView';
import '@/Pages/Customer/CustomerDashboard.css';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard() {
    const navigateToUpdate = () => {
        window.location.href = '@/Pages/Admin/ViewBusinessHours.jsx'; // or relative path
    };

    // Function to navigate to View Business Hours page
    const navigateToView = () => {
        window.location.href = '@/Pages/Admin/ViewBusinessHours.jsx'; // or relative path
    };

    return (
        <div className="dashboard-container flex">
            <Aheader />
            <Asidebar />
            
            <div className="flex-1 flex justify-start p-6">
                {/* Buttons on the Left Side, aligned to the center */}
                <div className="flex flex-col justify-center h-full space-y-4">
                    <PrimaryButton 
                        className="bg-blue-600 text-white p-2 rounded"
                        onClick={navigateToUpdate}
                        >Update 
                    </PrimaryButton>
                    <PrimaryButton 
                        className="bg-blue-600 text-white p-2 rounded"
                        onClick={navigateToView}
                        >View
                    </PrimaryButton>
                </div>

                {/* Business Hours Form */}
                <div className="flex-1 ml-6">
                <h2 className="text-2xl  text-center font-semibold mb-4 text-gray-800 ">Business Hours</h2>
                    <BusinessHoursView />
                </div>
            </div>
        </div>
    );
}
