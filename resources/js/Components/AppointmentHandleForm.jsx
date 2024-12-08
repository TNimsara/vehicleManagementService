import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'; // Import the Table components
import MessageButton from '@/Components/MessageButton'; // Assuming you have this component
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError'; // Assuming you have this component

const AppointmentTable = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);  // Track if we are sending a message
  const [errors, setErrors] = useState({});  // For validation errors
  const [appointmentIdToUpdate, setAppointmentIdToUpdate] = useState(null);  // Track the appointment being updated
  const defaultMessage = "Your service is finished, come and get your vehicle. Thank you for choosing us!";

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        // Use axios to fetch data
        const response = await axios.get(`/getAllAppointments`);

        // Set the fetched data to state
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointment data:', error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchAppointmentData();
  }, []);

  // Handle sending a message
  const handleSendMessage = async (appointmentId) => {
    try {
      // Send the message to backend (adjust as needed)
      await axios.post(`/sendMessage/${appointmentId}`, {
        message: defaultMessage,
      });

      // If successful, clear the message and close the modal
      setMessageContent('');
      setSendingMessage(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setErrors({ message: 'Failed to send message. Please try again.' });
    }
  };

  // Handle updating the appointment status
  const handleUpdateStatus = async (appointmentId, newStatus) => {
    try {
      // Send the status update to the backend
      await axios.put(`/updateStatus/${appointmentId}`, {
        status: newStatus,
      });

      // Update the state with the new status
      setAppointments(
        appointments.map((appointment) =>
          appointment.appointment_id === appointmentId
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="content-area bg-white p-8  rounded-lg shadow-md" style={{ marginLeft: '0' }}>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">View Your Appointments</h1>
      {loading ? (
        <div>Loading...</div>  // Show loading message while data is being fetched
      ) : (
        <Table className="min-w-full table-auto"> {/* Ensure table is flexible and responsive */}
          <TableHeader>
            <TableRow>
              <TableHead>Appointment ID</TableHead>
              <TableHead>Vehicle ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Appointment Date</TableHead>
              <TableHead>Appointment Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Update Status</TableHead>
              <TableHead>Send Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.appointment_id}>
                <TableCell>{appointment.appointment_id}</TableCell>
                <TableCell>{appointment.vehicle_id}</TableCell>
                <TableCell>{appointment.description}</TableCell>
                <TableCell>{appointment.appointment_date ? new Date(appointment.appointment_date).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>{appointment.appointment_time}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>{appointment.service_type}</TableCell>

                {/* Column for Updating Status */}
                <TableCell>
                  <select
                    value={appointment.status}
                    onChange={(e) => handleUpdateStatus(appointment.appointment_id, e.target.value)}
                    className="bg-gray-100  py-2 rounded"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </TableCell>
                

                {/* Column for Sending Message */}
                <TableCell>
                  <MessageButton
                    onClick={() => {
                      setAppointmentIdToUpdate(appointment.appointment_id);
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
      )}

      {/* Modal for Sending Message */}
      <Modal show={sendingMessage} onClose={() => setSendingMessage(false)}>
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Sending a Message</h2>
          <p className="mt-1 text-sm text-gray-600">
            Your message is being sent automatically. Thank you!
          </p>

          {errors.message && <InputError message={errors.message} className="mt-2" />}

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={() => setSendingMessage(false)}>Cancel</SecondaryButton>
            <SecondaryButton
              onClick={() => {
                // Trigger sending the default message when clicking "Send Message"
                handleSendMessage(appointmentIdToUpdate);
              }}
              className="ms-3 bg-blue-500 text-white"
            >
              Send Message
            </SecondaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentTable;
