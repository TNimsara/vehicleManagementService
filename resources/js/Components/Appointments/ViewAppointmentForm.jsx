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
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingVehicleDeletion, setConfirmingVehicleDeletion] = useState(false);
  const [vehicleIdToDelete, setVehicleIdToDelete] = useState(null); // Track the vehicle being deleted
  const [password, setPassword] = useState(''); // Track the password input
  const [errors, setErrors] = useState({}); // For validation errors
  const passwordInput = useRef(null); // Ref for password input (to focus in case of error)

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        // Use axios to fetch data
        const response = await axios.get(`/getVehicles`, {
          params: { user_id: userId }, // Pass query parameters as an object
        });

        // Set the fetched data to state
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchVehicleData();
  }, [userId]);

  const confirmVehicleDeletion = (vehicleId) => {
    setVehicleIdToDelete(vehicleId); // Set the vehicle ID to delete
    setConfirmingVehicleDeletion(true); // Open the modal for confirmation
  };

  const closeModal = () => {
    setConfirmingVehicleDeletion(false);
    setVehicleIdToDelete(null);
    setPassword('');
    setErrors({});
  };

  const deleteVehicle = async (e) => {
    e.preventDefault();

    try {
      // Perform validation for password (optional)
      if (!password) {
        setErrors({ password: 'Password is required.' });
        return;
      }

      // Send the delete request to backend (pass vehicle_id and password)
      await axios.delete(`/deleteVehicle/${vehicleIdToDelete}`, {
        data: { password },
      });

      // If successful, update the UI by removing the deleted vehicle
      setVehicles(vehicles.filter((vehicle) => vehicle.vehicle_id !== vehicleIdToDelete));
      closeModal(); // Close the modal after deletion

    } catch (error) {
      console.error('Error deleting vehicle:', error);
      if (error.response?.data?.errors?.password) {
        setErrors({ password: 'Invalid password.' }); // Handle invalid password
      }
    }
  };

  return (
    <div className="content-area bg-white p-8 max-w-4xl rounded-lg shadow-md" style={{ marginLeft: '0' }}>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">View Your Vehicles</h1>
      {loading ? (
        <div>Loading...</div>  // Show loading message while data is being fetched
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle ID</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Last Service Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Colour</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Delete Vehicle</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.vehicle_id}>
                <TableCell>{vehicle.vehicle_id}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{vehicle.last_service_date ? new Date(vehicle.last_service_date).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>{vehicle.category}</TableCell>
                <TableCell>{vehicle.colour}</TableCell>
                <TableCell>{vehicle.brand}</TableCell>
                <TableCell>
                  {vehicle.photo ? (
                    <img src={vehicle.photo} alt="Vehicle" className="w-20 h-20 object-cover" />
                  ) : (
                    'No Image'
                  )}
                </TableCell>
                <TableCell>
                  <DangerButton
                    onClick={() => confirmVehicleDeletion(vehicle.vehicle_id)}  // Trigger the delete action
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

      {/* Modal for Vehicle Deletion */}
      <Modal show={confirmingVehicleDeletion} onClose={closeModal}>
        <form onSubmit={deleteVehicle} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to delete your vehicle?
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Once your vehicle is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your vehicle.
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
              Delete Vehicle
            </DangerButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VehicleTable;
