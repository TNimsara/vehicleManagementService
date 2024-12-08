import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import AddFeedbackForm from '@/Components/AddFeedbackForm';
import '@/Pages/Customer/CustomerDashboard.css';


export default function Dashboard() {
    return (
        <div className="dashboard-container flex">
            <Header />
            <Sidebar />
            
            <div className="flex-1 flex justify-start p-6">
               
                {/* Business Hours Form */}
                <div className="flex-1 ml-6">
                    <AddFeedbackForm />
                </div>
            </div>
        </div>
    );
}
