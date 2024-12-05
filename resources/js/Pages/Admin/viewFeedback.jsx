import React, { useState, useEffect } from 'react';
import Asidebar from './Asidebar';
import Aheader from './Aheader';
import '@/Pages/Customer/CustomerDashboard.css'; // Import Dashboard-specific CSS
import { usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton'; // Assuming PrimaryButton is shared
import All from '@/Components/Feedbacks/All';
import Compliment from '@/Components/Feedbacks/Compliment';
import Complaint from '@/Components/Feedbacks/Complaint';
import Suggestion from '@/Components/Feedbacks/Suggestion';


export default function Dashboard() {
  const [selectedTable, setselectedTable] = useState([]);


  const handleButtonClick = (tableType) => {
    setselectedTable(tableType);
  };

  const renderTable = () => {
    switch (selectedTable) {
      case 'all':
        return <All/>;
      case 'compliment':
        return <Compliment/>;
      case 'complaint':
        return <Complaint/>;
      case 'suggestion':
        return <Suggestion/>;
      default:
        return <All/>;
    }
  };

  return (
    <div className="dashboard-container flex">
      <Asidebar />
      <Aheader />
      <div className="flex-1 flex justify-start p-6">
              {/* Buttons on the Left Side, aligned to the center */}
              <div className="flex flex-col justify-center h-full space-y-4">
                  <PrimaryButton 
                      className="bg-blue-600 text-white p-2 rounded"
                      onClick={() => handleButtonClick('all')}
                  >
                  All
                  </PrimaryButton>
                  <PrimaryButton 
                      className="bg-blue-600 text-white p-2 rounded"
                      onClick={() => handleButtonClick('compliment')}
                  >
                  Compliment
                  </PrimaryButton>
                  <PrimaryButton 
                      className="bg-blue-600 text-white p-2 rounded"
                      onClick={() => handleButtonClick('complaint')}
                  >
                  Complaint
                  </PrimaryButton>
                  <PrimaryButton 
                      className="bg-blue-600 text-white p-2 rounded"
                      onClick={() => handleButtonClick('suggestion')}
                  >
                  Suggestion
                  </PrimaryButton>

              </div>

              {/* Dynamic Form Content */}
              <div className="flex-1 ml-6">
                  {renderTable()}
              </div>
          </div>
    
    </div>
  );
}
