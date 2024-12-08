import React from 'react';
import Asidebar from './Asidebar';
import Aheader from './Aheader';
import AppointmentHandleForm from '@/Components/AppointmentHandleForm';
import '@/Pages/Customer/CustomerDashboard.css';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard() {
    return (
        <div className="dashboard-container flex max-w-full overflow-x-hidden"> {/* Ensure no overflow on x-axis */}
            <Aheader />
            <Asidebar />
            
            <div className="flex-1 flex justify-start p-6 overflow-x-hidden"> {/* Ensure no overflow on x-axis */}
                <div className="flex-1 ml-6">
                    <AppointmentHandleForm />
                </div>
            </div>
        </div>
    );
}
