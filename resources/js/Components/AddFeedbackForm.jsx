import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VehicleFeedbackForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        feedback_id: '',
        feedback_type: '',
        vehicle_id: '',
        service_date: '',
        rating: 0,
        description: '',
    });

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    const [vehicles, setVehicles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch the list of vehicles for the dropdown
    useEffect(() => {
        // Replace with your actual API endpoint to get vehicles
        fetch('/api/vehicles')
            .then(response => response.json())
            .then(data => setVehicles(data))
            .catch(error => console.error('Error fetching vehicles:', error));
    }, []);

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Construct the payload
        const payload = {
            feedback_type: data.feedback_type,
            vehicle_id: data.vehicle_id,
            service_date: data.service_date,
            rating: data.rating,
            description: data.description,
        };

        // Post data to the server
        post(route('feedback/store'), {
            data: payload,
            onSuccess: () => {
                reset();
                toast.success('Feedback submitted successfully!');
            },
            onError: () => {
                toast.error('Failed to submit feedback. Please try again.');
            }
        }).finally(() => setIsSubmitting(false));
    };

    // Reusable error component to show individual field errors
    const showError = (field) => {
        return errors[field] ? <div className="text-red-600 mt-2">{errors[field]}</div> : null;
    };

    // Handle rating click (1-5 stars)
    const handleRating = (rating) => {
        setData('rating', rating);
    };

    return (
        <div className="content-area bg-white p-8 max-w-xl mx-auto rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Vehicle Feedback</h1>

            <form onSubmit={submit}>
                {/* Feedback Type Field */}
                <div className="mb-4">
                    <InputLabel htmlFor="feedback_type" className="block text-gray-700">Feedback Type</InputLabel>
                    <select
                        id="feedback_type"
                        name="feedback_type"
                        value={data.feedback_type}
                        onChange={(e) => setData('feedback_type', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select Feedback Type</option>
                        <option value="compliment">Compliment</option>
                        <option value="complaint">Complaint</option>
                        <option value="suggestion">Suggestion</option>
                    </select>
                    {showError('feedback_type')}
                </div>

                {/* Vehicle ID Dropdown */}
                <div className="mb-4">
                    <InputLabel htmlFor="vehicle_id" className="block text-gray-700">Vehicle Registration Number</InputLabel>
                    <select
                        id="vehicle_id"
                        name="vehicle_id"
                        value={data.vehicle_id}
                        onChange={(e) => setData('vehicle_id', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select Vehicle</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>{vehicle.registration_number}</option>
                        ))}
                    </select>
                    {showError('vehicle_id')}
                </div>

                {/* Service Date Field */}
                <div className="mb-4">
                    <InputLabel htmlFor="service_date" className="block text-gray-700">Service Date</InputLabel>
                    <TextInput
                        id="service_date"
                        type="date"
                        name="service_date"
                        value={data.service_date}
                        onChange={(e) => setData('service_date', e.target.value)}
                        max={yesterdayString}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    />
                    {showError('service_date')}
                </div>

                {/* Rating (Star Rating) */}
                <div className="mb-4">
                    <InputLabel htmlFor="rating" className="block text-gray-700">Rating (1 to 5 stars)</InputLabel>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => handleRating(star)}
                                className={`w-8 h-8 ${data.rating >= star ? 'text-yellow-500' : 'text-black'}`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    {showError('rating')}
                </div>

                {/* Description Field */}
                <div className="mb-4">
                    <InputLabel htmlFor="description" className="block text-gray-700">Description</InputLabel>
                    <textarea
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        rows="4"
                        required
                    />
                    {showError('description')}
                </div>

                {/* Submit Button */}
                <PrimaryButton
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    disabled={processing || isSubmitting}
                >
                    {processing || isSubmitting ? 'Submitting Feedback...' : 'Submit Feedback'}
                </PrimaryButton>
            </form>

            {/* Toast notifications */}
            <ToastContainer />
        </div>
    );
}
