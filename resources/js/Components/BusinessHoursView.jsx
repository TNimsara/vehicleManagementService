// resources/js/Pages/BusinessHoursView.jsx
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/Components/ui/Table'; // Adjust the import path accordingly

const BusinessHoursView = () => {
  const [businessHours, setBusinessHours] = useState([]);
  const [loading, setLoading] = useState(true);  // To handle loading state

  // Fetch the data from the backend
  useEffect(() => {
    const fetchBusinessHours = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/business-hours/view'); // API endpoint for business hours
        const data = await response.json();
        
        setBusinessHours(data);  // Set the retrieved business hours data
        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching business hours:", error);
        setLoading(false);  // Handle error and stop loading
      }
    };

    fetchBusinessHours();
  }, []);  // Empty dependency array to run this effect only once when the component is mounted

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Opening Time</TableHead>
            <TableHead>Closing Time</TableHead>
            <TableHead>Step (min)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {businessHours.length === 0 ? (
            <TableRow>
              <TableCell colSpan="5">No business hours available</TableCell>
            </TableRow>
          ) : (
            businessHours.map((hour, index) => (
              <TableRow key={index}>
                <TableCell>{hour.dayOfWeek}</TableCell>
                <TableCell>{hour.isOpen ? 'Open' : 'Closed'}</TableCell>
                <TableCell>{hour.isOpen ? hour.openingTime : '-'}</TableCell>
                <TableCell>{hour.isOpen ? hour.closingTime : '-'}</TableCell>
                <TableCell>{hour.isOpen ? hour.step : '-'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BusinessHoursView;
