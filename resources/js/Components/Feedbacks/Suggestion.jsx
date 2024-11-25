import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

export default function Suggestion() {

  const [feedbacks, setFeedbacks] = useState([]);


    useEffect(() => {
        const fetchFeedbacks = async () => {
        try {
            const response = await fetch(`/viewAllFeedback?type=suggestion`);
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
  )
}
