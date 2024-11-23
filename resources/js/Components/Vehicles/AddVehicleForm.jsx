import React from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VehicleRegistrationForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        vehicle_id: '',
        year: '',
        last_service_date: '',
        category: '',
        colour: '',
        brand: '',
        photo: '',
    });

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];


    // Handle form submission
    const submit = (e) => {
        e.preventDefault();

        // Construct the payload
        const payload = {
            vehicle_id: data.vehicle_id,
            year: data.year,
            last_service_date: data.last_service_date,
            category: data.category,
            colour: data.colour,
            brand: data.brand,
            photo: data.photo,
        };

        

        // Post data to the server
        post(route('vehicles/store'), {
            data: payload,
            onSuccess: () => {
                reset();
                toast.success('Data added successfully!');
            },
            onError: () => {
                toast.error('Failed to add data. Please try again.');
            }
        });
    };

    // Reusable error component to show individual field errors
    const showError = (field) => {
        return errors[field] ? <div className="text-red-600 mt-2">{errors[field]}</div> : null;
    };

    return (
        <div className="content-area bg-white p-8 max-w-xl mx-auto rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Vehicle</h1>
            <div className="scrollable-form-container max-h-[500px] overflow-y-auto p-4">
                <form onSubmit={submit}>
                    {/* Vehicle ID Field */}
                    <div className="mb-4">
                        <InputLabel htmlFor="vehicle_id" className="block text-gray-700">Vehicle Registration Number</InputLabel>
                        <TextInput
                            id="vehicle_id"
                            type="text"
                            name="vehicle_id"
                            value={data.vehicle_id}
                            onChange={(e) => setData('vehicle_id', e.target.value)}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                            required
                        />
                        {showError('vehicle_id')}
                    </div>

                    {/* Year Field */}
                    <div className="mb-4">
                        <InputLabel htmlFor="year" className="block text-gray-700">Year</InputLabel>
                        <TextInput
                            id="year"
                            type="text"
                            name="year"
                            value={data.year}
                            onChange={(e) => setData('year', e.target.value)}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                            required
                        />
                        {showError('year')}
                    </div>

                    {/* Last Service Date Field */}
                    <div className="mb-4">
                        <InputLabel htmlFor="last_service_date" className="block text-gray-700">Last Service Date</InputLabel>
                        <TextInput
                            id="last_service_date"
                            type="date"
                            name="last_service_date"
                            value={data.last_service_date}
                            onChange={(e) => setData('last_service_date', e.target.value)}
                            max={yesterdayString}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                            required
                        />
                        {showError('last_service_date')}
                    </div>

                    {/* Category Field */}
                    <div className="mb-4">
                        <InputLabel htmlFor="category" className="block text-gray-700">Category</InputLabel>
                        <TextInput
                            id="category"
                            type="text"
                            name="category"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                            required
                        />
                        {showError('category')}
                    </div>

                    {/* Colour Field */}
                    <div className="mb-4">
                        <InputLabel htmlFor="colour" className="block text-gray-700">Colour</InputLabel>
                        <TextInput
                            id="colour"
                            type="text"
                            name="colour"
                            value={data.colour}
                            onChange={(e) => setData('colour', e.target.value)}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                            required
                        />
                        {showError('colour')}
                    </div>

                    {/* Brand Field */}
                    <div className="mb-4">
                        <InputLabel htmlFor="brand" className="block text-gray-700">Brand</InputLabel>
                        <TextInput
                            id="brand"
                            type="text"
                            name="brand"
                            value={data.brand}
                            onChange={(e) => setData('brand', e.target.value)}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                            required
                        />
                        {showError('brand')}
                    </div>

                    {/* Photo Field */}
                    <div className="mb-4">
                        <InputLabel htmlFor="photo" className="block text-gray-700">Photo</InputLabel>
                        <TextInput
                            id="photo"
                            type="file"
                            name="photo"
                            onChange={(e) => setData('photo', e.target.files[0])}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        />
                        {showError('photo')}
                    </div>

                    {/* Submit Button */}
                    <PrimaryButton
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        disabled={processing}
                    >
                        {processing ? 'Adding Vehicle...' : 'Add Vehicle'}
                    </PrimaryButton>
                </form>
            </div>

            {/* Toast notifications */}
            <ToastContainer />
        </div>
    );
}
