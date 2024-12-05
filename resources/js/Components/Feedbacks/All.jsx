import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/Table";

export default function All() {
  
    const [feedbacks, setFeedbacks] = useState([]);


    useEffect(() => {
        const fetchFeedbacks = async () => {
        try {
            const response = await fetch(`/viewAllFeedback`);
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFeedbacks(data);
            console.log(data);
        } catch (error) {
            console.error('Failed to fetch feedbacks:', error);
        }
        };
        fetchFeedbacks();
    }, []);

  return (
    <div className="content-area bg-white p-8 max-w-4xl rounded-lg shadow-md" style={{ marginLeft: '0' }}>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">View Feedbacks</h1>
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
          {feedbacks.map((feedback) => (
            <TableRow key={feedback.id}>
              <TableCell>{feedback.feedback_id}</TableCell>
              <TableCell>{feedback.user_id}</TableCell>
              <TableCell>{feedback.servicetype}</TableCell>
              <TableCell>{feedback.service_date}</TableCell>
              <TableCell>{feedback.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
