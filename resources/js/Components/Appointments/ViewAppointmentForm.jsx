import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';  // Import axios
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'; // Import the Table components
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';  // Assuming you have this component
import TextInput from '@/Components/TextInput';  // Assuming you have this component
import InputError from '@/Components/InputError'; // Assuming you have this component

const VehicleTable = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);  // Change state to appointments
  const [loading, setLoading] = useState(true);
  const [confirmingAppointmentDeletion, setConfirmingAppointmentDeletion] = useState(false);
  const [appointmentIdToDelete, setAppointmentIdToDelete] = useState(null); // Track the appointment being deleted
  const [password, setPassword] = useState(''); // Track the password input
  const [errors, setErrors] = useState({}); // For validation errors
  const passwordInput = useRef(null); // Ref for password input (to focus in case of error)

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        // Use axios to fetch data
        const response = await axios.get(`/getAppointments`);

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

  const confirmAppointmentDeletion = (appointmentId) => {
    setAppointmentIdToDelete(appointmentId); // Set the appointment ID to delete
    setConfirmingAppointmentDeletion(true); // Open the modal for confirmation
  };

  const closeModal = () => {
    setConfirmingAppointmentDeletion(false);
    setAppointmentIdToDelete(null);
    setPassword('');
    setErrors({});
  };

  const deleteAppointment = async (e) => {
    e.preventDefault();

    try {
      // Perform validation for password (optional)
      if (!password) {
        setErrors({ password: 'Password is required.' });
        return;
      }

      // Send the delete request to backend (pass appointment_id and password)
      await axios.delete(`/deleteAppointment/${appointmentIdToDelete}`, {
        data: { password },
      });

      // If successful, update the UI by removing the deleted appointment
      setAppointments(appointments.filter((appointment) => appointment.appointment_id !== appointmentIdToDelete));
      closeModal(); // Close the modal after deletion

    } catch (error) {
      console.error('Error deleting appointment:', error);
      if (error.response?.data?.errors?.password) {
        setErrors({ password: 'Invalid password.' }); // Handle invalid password
      }
    }
};


  return (
    <div className="content-area bg-white p-8 max-w-4xl rounded-lg shadow-md" style={{ marginLeft: '0' }}>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">View Your Appointments</h1>
      {loading ? (
        <div>Loading...</div>  // Show loading message while data is being fetched
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Appointment ID</TableHead>
              <TableHead>Vehicle ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Appointment Date</TableHead>
              <TableHead>Appointment Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Delete Appointment</TableHead>
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
                <TableCell>
                  <DangerButton
                    onClick={() => confirmAppointmentDeletion(appointment.appointment_id)}  // Trigger the delete action
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </DangerButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Modal for Appointment Deletion */}
      <Modal show={confirmingAppointmentDeletion} onClose={closeModal}>
        <form onSubmit={deleteAppointment} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to delete this appointment?
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Once your appointment is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your appointment.
          </p>

          <div className="mt-6">
            <InputLabel
              htmlFor="password"
              value="Password"
              className="sr-only"
            />
            <TextInput
              id="password"
              type="password"
              name="password"
              ref={passwordInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-3/4"
              isFocused
              placeholder="Password"
            />
            {errors.password && <InputError message={errors.password} className="mt-2" />}
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

            <DangerButton className="ms-3" disabled={false}>
              Delete Appointment
            </DangerButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VehicleTable;
