import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import '@/Pages/Customer/CustomerDashboard.css';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard() {
    const [selectedForm, setSelectedForm] = useState(); // Default to Add Vehicle form

    // Function to handle button clicks and set the selected form
    const handleButtonClick = (formType) => {
        setSelectedForm(formType);
    };

    // Function to render the appropriate form based on selectedForm
    const renderForm = () => {
        switch (selectedForm) {
            case 'updateProfile':
                return <UpdateProfileInformationForm />;
            case 'updatePassword':
                return <UpdatePasswordForm />;
            case 'delete':
                return <DeleteUserForm />;
            
        }
    };

    return (
        <div className="dashboard-container flex">
            <Header />
            <Sidebar />
            
            <div className="flex-1 flex justify-start p-6">
                {/* Buttons on the Left Side, aligned to the center */}
                <div className="flex flex-col justify-center h-full space-y-4">
                    <PrimaryButton 
                        className="bg-blue-600 text-white p-2 rounded"
                        onClick={() => handleButtonClick('updateProfile')}
                    >
                        Update Profile
                    </PrimaryButton>
                    <PrimaryButton 
                        className="bg-blue-600 text-white p-2 rounded"
                        onClick={() => handleButtonClick('updatePassword')}
                    >
                        Update Password
                    </PrimaryButton>
                    <PrimaryButton 
                        className="bg-blue-600 text-white p-2 rounded"
                        onClick={() => handleButtonClick('delete')}
                    >
                        Delete Account
                    </PrimaryButton>
                </div>

                {/* Dynamic Form Content */}
                <div className="flex-1 ml-6">
                    {renderForm()}
                </div>
            </div>
        </div>
    );
}
