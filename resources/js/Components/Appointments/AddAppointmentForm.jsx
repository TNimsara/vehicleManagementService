import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateAppointment() {
    const { data, setData, post, processing, errors, reset } = useForm({
        vehicle_id: '',
        description: '',
        serviceType: '',
        appointmentDate: '',
        employerType: 'Customer',
        appointmentTime: '',
    });

    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [closedDays, setClosedDays] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); 
        const formattedTomorrow = tomorrow.toISOString().split('T')[0]; 
        
        const nextWeekFromTomorrow = new Date(tomorrow);
        nextWeekFromTomorrow.setDate(nextWeekFromTomorrow.getDate() + 7); 
        const formattedMaxDate = nextWeekFromTomorrow.toISOString().split('T')[0]; 
        
        setMinDate(formattedTomorrow);
        setMaxDate(formattedMaxDate);
    }, []);

    useEffect(() => {
        const fetchClosedDays = async () => {
            try {
                const response = await axios.get(`/closed-days`);
                if (Array.isArray(response.data)) {
                    setClosedDays(response.data); 
                } else {
                    console.warn('Expected an array, but got something else');
                }
            } catch (error) {
                console.error('Error fetching closed days:', error);
            }
        };
        fetchClosedDays();
    }, []);

    const isClosedDay = (date) => {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = dayNames[date.getUTCDay()];
        return closedDays.includes(dayOfWeek);
    };

    useEffect(() => {
        axios
            .get(`/vehicle-ids`) 
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

    const fetchAvailableTimes = async (date) => {
        try {
            const response = await axios.get(`/getAvailableTimes/${date}`);
            const timesArray = Object.values(response.data);
            return timesArray;
        } catch (error) {
            console.error('Error fetching available times:', error);
            return [];
        }
    };

    const handleDateChange = async (e) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);
        setData('appointmentDate', newDate);

        if (isClosedDay(new Date(newDate))) {
            toast.error('Selected date is closed for appointments.'); 
            setAvailableTimes([]); 
            return;
        }

        try {
            const availableTimes = await fetchAvailableTimes(newDate);
            setAvailableTimes(availableTimes);
        } catch (error) {
            console.error('Error fetching available times:', error);
            setAvailableTimes([]);
        }
    };

    const submitAppointment = async () => {
        try {
            const requestData = {
                vehicle_id: data.vehicle_id,
                description: data.description,
                service_type: data.serviceType,
                appointment_date: data.appointmentDate,
                appointment_time: data.appointmentTime,
            };

            const response = await axios.post(`/makeappointments`, requestData);
            if (response.data.status === 'success') {
                toast.success(response.data.message);
                reset('vehicle_id', 'description', 'serviceType', 'appointmentDate', 'appointmentTime');
                setAvailableTimes([]);
            } else {
                toast.error('Failed to create appointment. Please try again.');
            }
        } catch (error) {
            toast.error('Failed to create appointment. Please try again.');
            console.error('Error details:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true); // Trigger the modal for confirmation
    };

    const handleModalSubmit = () => {
        setShowModal(false); // Close the modal after confirmation
        submitAppointment(); // Proceed with submitting the appointment
    };

    return (
        <div className="content-area bg-white p-8 max-w-xl mx-auto rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an appointment</h1>
            <div className="scrollable-form-container max-h-[500px] overflow-y-auto p-4">
                <ToastContainer position="top-right" autoClose={5000} />
              
                <form onSubmit={handleSubmit}>
                    {/* Vehicle ID Dropdown */}
                    <div className="mb-4">
                        <InputLabel htmlFor="vehicle_id" className="block text-gray-700">
                            Vehicle Registration Number
                        </InputLabel>
                        <select
                            id="vehicle_id"
                            value={data.vehicle_id}
                            onChange={(e) => setData('vehicle_id', e.target.value)}
                            className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        >
                            <option value="">Select a Vehicle</option>
                            {vehicles && vehicles.length > 0 ? (
                                vehicles.map((vehicle) => (
                                    <option key={vehicle} value={vehicle}>
                                        {vehicle}
                                    </option>
                                ))
                            ) : (
                                <option value="">No vehicles available</option>
                            )}
                        </select>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="description" value="Description" />
                        <TextInput
                            id="description"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full"
                            autoComplete="description"
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="serviceType" value="Service Type" />
                        <select
                            id="serviceType"
                            name="serviceType"
                            value={data.serviceType}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('serviceType', e.target.value)}
                            required
                        >
                            <option value="">Select a service type</option>
                            <option value="Full Service">Full Service</option>
                            <option value="Normal Service">Normal Service</option>
                        </select>
                        <InputError message={errors.serviceType} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="appointmentDate" value="Appointment Date" />
                        <TextInput
                            id="appointmentDate"
                            type="date"
                            name="appointmentDate"
                            value={data.appointmentDate}
                            onChange={handleDateChange}
                            min={minDate}
                            max={maxDate}
                            className="mt-1 block w-full"
                            required
                        />
                        <InputError message={errors.appointmentDate} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="appointmentTime" value="Appointment Time" />
                        <select
                            id="appointmentTime"
                            name="appointmentTime"
                            value={data.appointmentTime}
                            onChange={(e) => setData('appointmentTime', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        >
                            <option value="">Select a time</option>
                            {availableTimes.length > 0 ? (
                                availableTimes.map((time, index) => (
                                    <option key={index} value={time}>
                                        {time}
                                    </option>
                                ))
                            ) : (
                                <option value="">No available times</option>
                            )}
                        </select>
                        <InputError message={errors.appointmentTime} className="mt-2" />
                    </div>

                    <div className='mt-6 flex justify-center'>
                        <PrimaryButton type="submit" disabled={processing}>
                            Create Appointment
                        </PrimaryButton>
                    </div>
                </form>

                {/* Modal for confirmation */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2 className="text-lg font-medium text-gray-900">Please confirm your Appointment</h2>
                            <p>Once your appointment is confirmed, the data will be permanently saved.</p>
                            <div className="mt-6 flex justify-end">
                                <PrimaryButton type="button" onClick={() => setShowModal(false)}>
                                    Cancel
                                </PrimaryButton>
                                <PrimaryButton type="button" onClick={handleModalSubmit}>
                                    Confirm Appointment
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
