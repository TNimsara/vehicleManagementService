import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'; // Import the Table components

const VehicleTable = ({ userId }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="content-area bg-white p-8 max-w-xl mx-auto rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">View Your Vehicles</h1>
      <div className="scrollable-form-container max-h-[500px] overflow-y-auto p-4"></div>
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
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
    
  );
};

export default VehicleTable;
