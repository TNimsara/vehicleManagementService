
import Asidebar from './Asidebar';
import Aheader from './Aheader';
import '@/Pages/Customer/CustomerDashboard.css';
import { Users, Calendar, MessageSquare, Car } from "lucide-react"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ appointments: 0, users: 0, Feedbacks: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
          try {
            const response = await axios.get('/dashboard/stats'); // Adjust this URL as necessary
            setStats(response.data);
            // console.log(response.data);

            // console.log(response.data.feedbacks);
            console.log(`Number of feedbacks: ${response.data.feedbacks}`);
            // if (Array.isArray(response.data.feedbacks)) {
            //     console.log(`Number of feedbacks: ${response.data.feedbacks.length}`);
            // } else {
            //     console.log('Feedbacks is not an array');
            // }
          } catch (err) {
            setError('Failed to fetch stats');
          } finally {
            setLoading(false);
          }
        };
    
        fetchStats();
      }, []);


      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }
    

    return (
        <div className="dashboard-container  flex flex-col min-h-screen">
    {/* Header */}
    <Aheader />

    {/* Main Content */}
    <div className="flex flex-grow">
        {/* Sidebar */}
        <Asidebar />

        {/* Dashboard Content */}
        <div className="flex-1 mt-[100px]  bg-custom-teal from-cyan-500 to-teal-400 p-6">
            {/* Center the grid container */}
            <div className="max-w-6xl mx-auto">
                {/* Responsive Grid */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Appointments Card */}
                    <div className="rounded-xl border bg-black text-white p-6 h-36 shadow-lg flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">Appointments</h3>
                            <Calendar className="h-6 w-6 text-gray-300" />
                        </div>
                        <div className="text-4xl font-bold">{stats.appointments}</div>
                        <p className="text-sm text-gray-300">Scheduled appointments</p>
                    </div>

                    {/* Users Card */}
                    <div className="rounded-xl border bg-black text-white p-6 h-36 shadow-lg flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">Total Users</h3>
                            <Users className="h-6 w-6 text-gray-300" />
                        </div>
                        <div className="text-4xl font-bold">{stats.users}</div>
                        <p className="text-sm text-gray-300">Active users in your system</p>
                    </div>

                    {/* Feedbacks Card */}
                    <div className="rounded-xl border bg-black text-white p-6 h-36 shadow-lg flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">Feedbacks</h3>
                            <MessageSquare className="h-6 w-6 text-gray-300" />
                        </div>
                        <div className="text-4xl font-bold">{stats.feedbacks}</div>
                        <p className="text-sm text-gray-300">Customer Feedbacks</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    

    
  )
}