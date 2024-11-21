import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrimaryButton from '@/Components/PrimaryButton';

export default function BusinessHoursForm() {
    const { data, setData, put, processing, errors, reset, recentlySuccessful } = useForm({
        dayOfWeek: '',
        isOpen: '1', // Default value is '1' for "Yes"
        openingTime: '',
        closingTime: '',
        step: 60,
    });

    // Handle change for "Is Open" dropdown
    const handleIsOpenChange = (e) => {
        const value = e.target.value;
        console.log("Selected value for isOpen: ", value); // Log the selected value of isOpen
        setData('isOpen', value); // Update the `isOpen` state
    };

    // Log the updated value of isOpen after it has changed
    useEffect(() => {
        console.log("Updated data.isOpen value:", data.isOpen); // This will log the updated state value
    }, [data.isOpen]); // Dependency on data.isOpen means this effect will run whenever isOpen changes

    // Submit form
    const submit = (e) => {
        e.preventDefault();

        // Prepare the data payload to send to the backend
        const payload = {
            isOpen: data.isOpen,
            openingTime: data.isOpen === '1' ? data.openingTime : null, // Set to null if isOpen is '0'
            closingTime: data.isOpen === '1' ? data.closingTime : null, // Set to null if isOpen is '0'
            step: data.isOpen === '1' ? data.step : null, // Set to null if isOpen is '0'
        };

        // Log the payload to check if it's correct
        console.log('Submitting data:', payload);

        // Send the PUT request to the server
        put(route('business.hours.update', { dayOfWeek: data.dayOfWeek }), {
            data: payload,
            onSuccess: () => {
                reset();
                toast.success('Business hours updated successfully!');
            },
        });
    };

    return (
        <div className="content-area bg-white p-8 max-w-xl mx-auto rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Manage Business Hours</h1>
            <form onSubmit={submit}>
                {/* Success Message */}
                {recentlySuccessful && (
                    <div className="alert success bg-green-100 text-green-800 p-4 rounded mb-4">
                        Business hours updated successfully!
                    </div>
                )}

                {/* Day Selection */}
                <div className="mb-4">
                    <InputLabel htmlFor="day" className="block text-gray-700">Select Day</InputLabel>
                    <select
                        id="day"
                        name="dayOfWeek"
                        value={data.dayOfWeek}
                        onChange={(e) => setData('dayOfWeek', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select Day</option>
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                    </select>
                    {errors.day && <div className="text-red-600 mt-2">{errors.day}</div>}
                </div>

                {/* Is Open Selection */}
                <div className="mb-4">
                    <InputLabel htmlFor="isOpen" className="block text-gray-700">Is Open</InputLabel>
                    <select
                        id="isOpen"
                        name="isOpen"
                        value={data.isOpen} // This binds the value to the state
                        onChange={handleIsOpenChange} // This updates the state on change
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>

                    {errors.isOpen && <div className="text-red-600 mt-2">{errors.isOpen}</div>}
                </div>

                {/* Opening Time */}
                {data.isOpen === '1' && (
                    <div className="mb-4">
                        <InputLabel htmlFor="openingTime" className="block text-gray-700">Opening Time</InputLabel>
                        <input
                            id="openingTime"
                            type="time"
                            name="openingTime"
                            value={data.openingTime || ''}
                            onChange={(e) => setData('openingTime', e.target.value)}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                            required={data.isOpen === '1'}  // Only required when "Yes" is selected
                        />
                        {errors.openingTime && <div className="text-red-600 mt-2">{errors.openingTime}</div>}
                    </div>
                )}

                {/* Closing Time */}
                {data.isOpen === '1' && (
                    <div className="mb-4">
                        <InputLabel htmlFor="closingTime" className="block text-gray-700">Closing Time</InputLabel>
                        <input
                            id="closingTime"
                            type="time"
                            name="closingTime"
                            value={data.closingTime || ''}
                            onChange={(e) => setData('closingTime', e.target.value)}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                            required={data.isOpen === '1'}  // Only required when "Yes" is selected
                            disabled={data.isOpen === '0'} // Disable if isOpen is "No"
                        />
                        {errors.closingTime && <div className="text-red-600 mt-2">{errors.closingTime}</div>}
                    </div>
                )}

                {/* Step Interval */}
                {data.isOpen === '1' && (
                    <div className="mb-4">
                        <InputLabel htmlFor="step" className="block text-gray-700">Step (minutes)</InputLabel>
                        <input
                            id="step"
                            type="number"
                            name="step"
                            min="1"
                            value={data.step || ''}
                            onChange={(e) => setData('step', e.target.value)}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                            required={data.isOpen === '1'}  // Only required when "Yes" is selected
                        />
                        {errors.step && <div className="text-red-600 mt-2">{errors.step}</div>}
                    </div>
                )}

                {/* Submit Button */}
                <PrimaryButton
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    disabled={processing}
                >
                    {processing ? 'Updating...' : 'Update Hours'}
                </PrimaryButton>
            </form>
            <ToastContainer /> {/* Include ToastContainer here */}
        </div>
    );
}
