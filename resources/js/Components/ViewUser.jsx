import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'; // Import Table components
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel'; // Assuming you have this component
import TextInput from '@/Components/TextInput'; // Assuming you have this component
import InputError from '@/Components/InputError'; // Assuming you have this component

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null); // Track the user being deleted
  const [password, setPassword] = useState(''); // Track the password input
  const [errors, setErrors] = useState({}); // For validation errors

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Use axios to fetch data
        const response = await axios.get('/getAllUsers');

        // Set the fetched data to state
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchUserData();
  }, []);

  const confirmUserDeletion = (userId) => {
    setUserIdToDelete(userId); // Set the user ID to delete
    setConfirmingUserDeletion(true); // Open the modal for confirmation
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    setUserIdToDelete(null);
    setPassword('');
    setErrors({});
  };

  const deleteUser = async (e) => {
    e.preventDefault();

    try {
      // Perform validation for password (optional)
      if (!password) {
        setErrors({ password: 'Password is required.' });
        return;
      }

      // Send the delete request to backend (pass user_id and password)
      await axios.delete(`/deleteUser/${userIdToDelete}`, {
        data: { password },
      });

      // If successful, update the UI by removing the deleted user
      setUsers(users.filter((user) => user.id !== userIdToDelete));
      closeModal(); // Close the modal after deletion

    } catch (error) {
      console.error('Error deleting user:', error);
      if (error.response?.data?.errors?.password) {
        setErrors({ password: 'Invalid password.' }); // Handle invalid password
      }
    }
  };

  return (
    <div className="content-area bg-white p-8 max-w-4xl rounded-lg shadow-md" style={{ marginLeft: '0' }}>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">View All Users</h1>
      {loading ? (
        <div>Loading...</div> // Show loading message while data is being fetched
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead>Delete User</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.user_type}</TableCell>
                <TableCell>
                  <DangerButton
                    onClick={() => confirmUserDeletion(user.id)} // Trigger the delete action
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

      {/* Modal for User Deletion */}
      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <form onSubmit={deleteUser} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Are you sure you want to delete this user?
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Once this user is deleted, all their data will be permanently removed. Please enter your password to confirm deletion.
          </p>

          <div className="mt-6">
            <InputLabel htmlFor="password" value="Password" className="sr-only" />
            <TextInput
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-3/4"
              placeholder="Password"
            />
            {errors.password && <InputError message={errors.password} className="mt-2" />}
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

            <DangerButton className="ms-3" disabled={false}>
              Delete User
            </DangerButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserTable;
