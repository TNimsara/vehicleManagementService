import React, { useState } from 'react';  // Import useState from React
import Sidebar from './Sidebar';
import Header from './Header';
import AddAppointmentForm from '@/Components/Appointments/AddAppointmentForm';
import ViewAppointmentForm from '@/Components/Appointments/ViewAppointmentForm';
// import DeleteVehicleForm from '@/Components/Appointments/DeleteVehicleForm';
// import ViewVehicleForm from '@/Components/Appointments/ViewVehicleForm';
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
                return <AddAppointmentForm />;
            case 'view':
                return <ViewAppointmentForm />;

            
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
                    Create Appointments
                    </PrimaryButton>
                  
                    <PrimaryButton 
                        className="bg-blue-600 text-white p-2 rounded"
                        onClick={() => handleButtonClick('view')}
                    >
                    View Appointments
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
