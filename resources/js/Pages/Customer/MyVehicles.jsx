import React, { useState } from 'react';  // Import useState from React
import Sidebar from './Sidebar';
import Header from './Header';
import AddVehicleForm from '@/Components/Vehicles/AddVehicleForm';
import UpdateVehicleForm from '@/Components/Vehicles/UpdateVehicleForm';
import DeleteVehicleForm from '@/Components/Vehicles/DeleteVehicleForm';
import ViewVehicleForm from '@/Components/Vehicles/ViewVehicleForm';
import '@/Pages/Customer/CustomerDashboard.css';
import PrimaryButton from '@/Components/PrimaryButton';



export default function Dashboard() {
    const [selectedForm, setSelectedForm] = useState();

    const handleButtonClick = (formType) => {
        setSelectedForm(formType);
    };

    const renderForm = () => {
        switch (selectedForm) {
            case 'add':
                return <AddVehicleForm />;
            case 'update':
                return <UpdateVehicleForm />;
            case 'delete':
                return <DeleteVehicleForm />;
            case 'view':
                return <ViewVehicleForm/>;
            
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
                        onClick={() => handleButtonClick('add')}
                    >
                    Add
                    </PrimaryButton>
                    <PrimaryButton 
                        className="bg-blue-600 text-white p-2 rounded"
                        onClick={() => handleButtonClick('update')}
                    >
                    Update
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
