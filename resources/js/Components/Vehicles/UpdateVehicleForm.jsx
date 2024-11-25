import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputLabel from '@/Components/InputLabel'; // Assuming you have these components
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateVehicleForm() {
    const [vehicles, setVehicles] = useState([]); // Initialize as empty array
    const [selectedVehicleId, setSelectedVehicleId] = useState('');
    const [data, setData] = useState({
        vehicle_id: '',
        year: '',
        last_service_date: '',
        category: '',
        colour: '',
        brand: '',
        photo: null,
    });
    const [processing, setProcessing] = useState(false);

    // Fetch vehicles for the logged-in user
    useEffect(() => {
    
        axios
            .get(`/vehicle-ids`) // Adjust to your API endpoint for fetching vehicles
            .then((response) => {
                if (response.data && Array.isArray(response.data.vehicle_ids)) {
                    setVehicles(response.data.vehicle_ids);
                } else {
                    console.error('Invalid response structure', response.data);
                    toast.error('Failed to load vehicles.');
                }
            })
            .catch((error) => {
                console.error('Error fetching vehicles:', error);
                toast.error('Error fetching vehicles');
            });
    }, []);

    // Handle vehicle selection change
    const handleVehicleChange = (e) => {
        const vehicle_id = e.target.value;
        setSelectedVehicleId(vehicle_id);

        console.log("Selected vehicle ID on change:", vehicle_id);

        // Fetch the selected vehicle details from the backend
        if (vehicle_id) {
            axios
                .get(`/vehicle-details/${vehicle_id}`) 
                .then((response) => {
                    console.log('Vehicle details response:', response);  // Add this
                    const vehicle = response.data.vehicle;
                    setData({
                        ...data,
                        vehicle_id: vehicle.vehicle_id,
                        year: vehicle.year,
                        last_service_date: vehicle.last_service_date,
                        category: vehicle.category,
                        colour: vehicle.colour,
                        brand: vehicle.brand,
                    
                    });
                })
                .catch((error) => {
                    console.error('Error fetching vehicle details:', error);
                    toast.error('Error fetching vehicle details');
                });
        } else {
            // Reset the form if no vehicle is selected
            setData({
                ...data,
                vehicle_id: '',
                year: '',
                last_service_date: '',
                category: '',
                colour: '',
                brand: '',
            });
        }
    };

    // Submit the form
    const submit = (e) => {
        console.log("Submit function triggered!");
        e.preventDefault();
        setProcessing(true);

        // Replace this with your form submission logic
        const id = selectedVehicleId;  // Assuming vehicle_id is the value selected from a <select> element

    // Log to check the value of vehicleId
        console.log("Selected Vehicle ID:", selectedVehicleId);

        axios.put(`/vehicles/update/${id}`, data)
            .then((response) => {
                setProcessing(false);
                toast.success(response.data.message || 'Vehicle updated successfully!');
            })
            .catch((error) => {
                setProcessing(false);
                if (error.response && error.response.status === 403) {
                toast.error(error.response.data.message || 'Forbidden: You do not have permission to update this vehicle.');
                } else {
                toast.error('Failed to update vehicle');
                }
                console.error(error);
        });

       
    }


    return (
        <div className="content-area bg-white p-8 max-w-xl mx-auto rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Vehicle</h1>
            <div className="scrollable-form-container max-h-[500px] overflow-y-auto p-4">
                <form onSubmit={submit}>
                    {/* Vehicle ID Dropdown */}
                    
                    <div className="mb-4">
                        <InputLabel htmlFor="vehicle_id" className="block text-gray-700">
                            Vehicle Registration Number
                        </InputLabel>
                        <select
                            id="vehicle_id"
                            value={selectedVehicleId}
                            onChange={handleVehicleChange}
                            required
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        >
                            <option value="">Select a Vehicle</option>
                            {vehicles && vehicles.length > 0 ? (
                                vehicles.map((vehicle) => (
                                    <option key={vehicle} value={vehicle}>
                                        {vehicle} {/* Assuming `vehicle` is the vehicle_id */}
                                    </option>
                                ))
                            ) : (
                                <option value="">No vehicles available</option>
                            )}
                        </select>
                    </div>

                    {/* Year Field */}
                    <div className="mb-4">
                        <InputLabel htmlFor="year" className="block text-gray-700">
                            Year
                        </InputLabel>
                        <TextInput
                            id="year"
                            type="text"
                            name="year"
                            value={data.year}
                            onChange={(e) => setData({ ...data, year: e.target.value })}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Last Service Date Field */}
                    <div className="mb-4">
                        <InputLabel htmlFor="last_service_date" className="block text-gray-700">
                            Last Service Date
                        </InputLabel>
                        <TextInput
                            id="last_service_date"
                            type="date"
                            name="last_service_date"
                            value={data.last_service_date}
                            onChange={(e) => setData({ ...data, last_service_date: e.target.value })}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Category Field */}
                    <div className="mb-4">
                        <InputLabel htmlFor="category" className="block text-gray-700">
                            Category
                        </InputLabel>
                        <TextInput
                            id="category"
                            type="text"
                            name="category"
                            value={data.category}
                            onChange={(e) => setData({ ...data, category: e.target.value })}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Colour Field */}
                    <div className="mb-4">
                        <InputLabel htmlFor="colour" className="block text-gray-700">
                            Colour
                        </InputLabel>
                        <TextInput
                            id="colour"
                            type="text"
                            name="colour"
                            value={data.colour}
                            onChange={(e) => setData({ ...data, colour: e.target.value })}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Brand Field */}
                    <div className="mb-4">
                        <InputLabel htmlFor="brand" className="block text-gray-700">
                            Brand
                        </InputLabel>
                        <TextInput
                            id="brand"
                            type="text"
                            name="brand"
                            value={data.brand}
                            onChange={(e) => setData({ ...data, brand: e.target.value })}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <PrimaryButton
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        disabled={processing}
                    >
                        {processing ? 'Updating Vehicle...' : 'Update Vehicle'}
                    </PrimaryButton>
                </form>
            </div>

            {/* Toast notifications */}
            <ToastContainer />
        </div>
    );
}
