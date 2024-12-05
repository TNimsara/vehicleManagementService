import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

export default function Compliment() {

    const [feedbacks, setFeedbacks] = useState([]);
    

    useEffect(() => {
        const fetchFeedbacks = async () => {
        try {
            const response = await fetch(`/viewAllFeedback?type=compliment`);
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

    const handleUpdateStatus = async (feedback_id, status) => {
      try {
          const response = await fetch(`/api/updateStatus/${feedback_id}`, {  
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  
              },
              body: JSON.stringify({is_resolved : status }), // Updated status
          });
  
          if (!response.ok) {
              throw new Error('Failed to update status');
          }
  
          // Update the filteredAppointments state to reflect the change
          setFeedbacks((prevFeedbacks) => 
             prevFeedbacks.map((feedback) => 
              feedback.feedback_id === feedback_id ? { ...feedback, is_resolved: status } : feedback
              )
          );
  
        
          console.log('Status updated successfully');
      } catch (error) {
          console.error('Error updating status:', error);
      }
  };

  return (
    <div className="content-area bg-white p-8 max-w-4xl rounded-lg shadow-md" style={{ marginLeft: '0' }}>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">View Feedbacks</h1>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Feedback ID</TableHead>
            <TableHead>User Id</TableHead>
            <TableHead>Vehicle ID</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Service Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Resolved Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks.map((feedback) => (
            <TableRow key={feedback.feedback_id}>
              <TableCell>{feedback.feedback_id}</TableCell>
              <TableCell>{feedback.user_id}</TableCell>
              <TableCell>{feedback.vehicle_id}</TableCell>
              <TableCell>{feedback.rating}</TableCell>
              <TableCell>{feedback.service_date}</TableCell>
              <TableCell>{feedback.description}</TableCell>
              <TableCell>
                    <select
                       value={feedback.is_resolved ? "true" : "false"} // Bind to current status
                      onChange={async (e) => {
                        const newStatus = e.target.value === "true";
                          await handleUpdateStatus(feedback.feedback_id, newStatus); // Call update function
                      }}
                      className="p-2 border rounded-md w-36"
                  >
                      <option value="false">Not_Resolved</option>
                      <option value="true">Resolved</option>
                  </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
