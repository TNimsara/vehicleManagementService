import React from 'react';
import Asidebar from './Asidebar';
import Aheader from './Aheader';
import BusinessHoursForm from '@/Components/BusinessHoursForm';
import '@/Pages/Customer/CustomerDashboard.css';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard() {
    return (
        <div className="dashboard-container flex">
            <Aheader />
            <Asidebar />
            
            <div className="flex-1 flex justify-start p-6">
                {/* Buttons on the Left Side, aligned to the center */}
                <div className="flex flex-col justify-center h-full space-y-4">
                    <PrimaryButton className="bg-blue-600 text-white p-2 rounded">Update </PrimaryButton>
                    <PrimaryButton className="bg-blue-600 text-white p-2 rounded">View</PrimaryButton>
                </div>

                {/* Business Hours Form */}
                <div className="flex-1 ml-6">
                    <BusinessHoursForm />
                </div>
            </div>
        </div>
    );
}
