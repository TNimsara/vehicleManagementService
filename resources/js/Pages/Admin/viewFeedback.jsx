
import Asidebar from './Asidebar';
import '@/Pages/Customer/CustomerDashboard.css'; // Import Dashboard-specific CSS
import Aheader from './Aheader'; 
import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/Table";

  export default function Dashboard() {
    
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
      const fetchFeedbacks = async () => {
          try {
            const response = await fetch(`/feedback`);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setFeedbacks(data);
          } catch (error) {
              console.error('Failed to fetch feedbacks:', error);
          }
      };
      fetchFeedbacks();
  }, []);
  
    return (
        <div className="dashboard-container flex flex-col md:flex-row justify-center items-center md:justify-start">
            <Asidebar />

            <div className="flex-1 w-full p-4 md:ml-48">
                <Aheader />

                <main className="bg-gray-100 mt-4 rounded-lg shadow-lg p-6 mx-auto max-w-screen-lg">
                    <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">Customer Feedbacks</h1>

                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Feedback ID</TableHead>
                                    <TableHead>User Id</TableHead>
                                    <TableHead>Service Type</TableHead>
                                    <TableHead>Service Date</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {feedbacks.map((feedbacks) => (
                                    <TableRow key={feedbacks.id}>
                                        <TableCell>{feedbacks.id}</TableCell>
                                        <TableCell>1</TableCell>
                                        <TableCell>{feedbacks.servicetype}</TableCell>
                                        <TableCell>{feedbacks.servicedate}</TableCell>
                                        <TableCell>{feedbacks.discription}</TableCell>
                                        {/* <TableCell>{feedbacks.userId}</TableCell> */}
                                       
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </div>
        </div>
    );
}