import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import MessageButton from '@/Components/MessageButton';
import Modal from '@/Components/Modal';
import  InputLabel  from '@/Components/InputLabel';
import  TextInput  from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Compliment() {

    const [feedbacks, setFeedbacks] = useState([]);
    const [feedbackIdToUpdate, setFeedbackIdToUpdate] = useState(null);
    const [sendingMessage, setSendingMessage] = useState(false); 
    const [messageContent, setMessageContent] = useState('');
    const [errors, setErrors] = useState({});
    

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
            <TableHead>Reply</TableHead>
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
              <TableCell>
                  <MessageButton
                    onClick={() => {
                      setFeedbackIdToUpdate(feedback.feedback_id);
                      setSendingMessage(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Send Message
                  </MessageButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal show={sendingMessage} onClose={() => setSendingMessage(false)}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(appointmentIdToUpdate);
          }}
          className="p-6"
        >
          <h2 className="text-lg font-medium text-gray-900">Send a Reply</h2>
          <p className="mt-1 text-sm text-gray-600">
            Enter your message below and click 'Send' to communicate with the customer.
          </p>

          <div className="mt-6">
            <InputLabel htmlFor="message" value="Message" className="sr-only" />
            <TextInput
              id="message"
              name="message"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              className="mt-1 block w-full"
              placeholder="Enter your message here..."
            />
            {errors.message && <InputError message={errors.message} className="mt-2" />}
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={() => setSendingMessage(false)}>Cancel</SecondaryButton>
            <SecondaryButton type="submit" className="ms-3 bg-blue-500 text-white">
              Send 
            </SecondaryButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
