import React from 'react';
import Asidebar from './Asidebar';
import Aheader from './Aheader';
import AddUserForm from '@/Components/AddUserForm';
import ViewUser from '@/Components/ViewUser';
import '@/Pages/Customer/CustomerDashboard.css';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';

export default function Dashboard() {
    const[selectedForm, setSelectedForm] = useState('');

    const handleButtonClick = (formName) => {
        setSelectedForm(formName);
    }

    const renderForm = () => {
        switch(selectedForm) {
            case 'add':
                return <AddUserForm />;
            case 'view':
                return <ViewUser/>;
            default:
                return null;
        }
    }
    return (
        <div className="dashboard-container flex">
            <Aheader />
            <Asidebar />
            <div className="flex-1 flex justify-start p-6">
                {/* Buttons on the Left Side, aligned to the center */}
                <div className="flex flex-col justify-center h-full space-y-4">
                    <PrimaryButton 
                        className="bg-blue-600 text-white p-2 rounded"
                        onClick={() => handleButtonClick('add')}
                    >
                    Add
                    </PrimaryButton>
                    
                    <PrimaryButton 
                        className="bg-blue-600 text-white p-2 rounded"
                        onClick={() => handleButtonClick('view')}
                    >
                    View
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