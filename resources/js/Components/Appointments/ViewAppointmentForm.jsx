import react, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';import InputLabel from '@/Components/InputLabel';  // Assuming you have this component
import TextInput from '@/Components/TextInput';  // Assuming you have this component
import InputError from '@/Components/InputError'; // Assuming you have this component
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'; // Import the Table components





export default function ViewAppointmentForm() {

  const [appointmentToDelete ,setAppointmentToDelete] = useState(null);
  const [confirmingAppointmentDeletion, setConfirmingAppointmentDeletion] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const confirmVehicleDeletion = (appointment_id) => {
    setAppointmentToDelete(appointment_id); // Set the vehicle ID to delete
    setConfirmingAppointmentDeletion(true); // Open the modal for confirmation
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    }; 
  
    fetchAppointments();
  
  },[]);

  const closeModal = () => {
    setConfirmingAppointmentDeletion(false);
    setAppointmentToDelete(null);
  };

  const deleteAppointment = async (e) => {
  e.preventDefault();

  try {

    // Send the delete request to backend (pass vehicle_id and password)
    await axios.delete(`/deleteAppointment/${appointmentToDelete}`);

    // If successful, update the UI by removing the deleted vehicle
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.appointment_id !== appointmentToDelete)
    );
    closeModal();
  } catch (error) {
    console.error('Error deleting appointment:', error);
  }
  };

  return (
    <div className="content-area bg-white p-8 max-w-4xl rounded-lg shadow-md" style={{ marginLeft: '0' }}>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">View Your Appointments</h1>
      <Table className = 'w-full'>
        <TableHeader>
          <TableRow>
            <TableCell>Appointment Id</TableCell>
            <TableCell>Vehicle Id</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Appointment Date</TableCell>
            <TableCell>Appointment Time</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Service Type</TableCell>
            <TableCell>Cancel Appointment</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
        {appointments.map((vehicle) => (  
              <TableRow key={appointment.appointment_id}>
                <TableCell>{appointment.vehicle_id}</TableCell>
                <TableCell>{appointment.description}</TableCell>
                <TableCell>{appointment.appointment_date ? new Date(appointment.appointment_date).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>{appointment.appointment_time}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>{appointment.service_type}</TableCell>
                <TableCell>
                  <DangerButton
                    onClick={() => confirmVehicleDeletion(appointment.appointment_id)}  // Trigger the delete action
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </DangerButton>
                </TableCell>
              </TableRow>
            ))}

        </TableBody>
      </Table>
      
 

      <Modal show={confirmingAppointmentDeletion} onClose={closeModal}>
        <form onSubmit={deleteAppointment} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to cancel your appointment?
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Once your appointment is canceled, all of its resources and data will be permanently canceled. 
          </p>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

            <DangerButton className="ms-3" disabled={false}>
              Confirm
            </DangerButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
