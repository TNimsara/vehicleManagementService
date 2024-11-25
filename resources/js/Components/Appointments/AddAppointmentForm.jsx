import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



// Import Toastify components
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
    const [availableTimes, setAvailableTimes] = useState([]); // **New state for available time slots**
    const [bookedTimes, setBookedTimes] = useState([]); // **New state for booked times**
    const [closedDays, setClosedDays] = useState([]); // New state for closed days
    // const [vehicalIds, setVehicalIds] = useState([]); // **New state for vehical IDs**
    

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const nextWeek = new Date();setMinTime
        nextWeek.setDate(nextWeek.getDate() + 7); 
        const formattedMaxDate = nextWeek.toISOString().split('T')[0];
        
        setMinDate(today);
        setMaxDate(formattedMaxDate);

        // Fetch closed days on component mount
        
    }, []);

    // Function to fetch closed days from the backend
    useEffect(() => {
        const fetchClosedDays = async () => {
            try {
                
                const response = await axios.get(`/closed-days`); 
                console.log('Full response:', response.data); 
                // setClosedDays(response.data.closed_days);
                // Check if response data is an array
                if (Array.isArray(response.data)) {
                    console.log('Closed days:', response.data); // Log the closed days
                    setClosedDays(response.data); // Set closedDays directly from the array
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

        // console.log('Checking date:', date); // Log the date being checked
        // console.log('Day of the week:', dayOfWeek); // Log the corresponding day of the week
        // console.log('Closed days:', closedDays); // Log the current list of closed days

        const isClosed = closedDays.includes(dayOfWeek);
        console.log(`Is ${dayOfWeek} a closed day? ${isClosed}`); // Log the result

        return isClosed;
        // return closedDays.includes(dayOfWeek);
    };


    const fetchBusinessHours = async (dayOfWeek) => {
        try {
            const response = await axios.get(`/business-hours/${dayOfWeek}`);
            
            return response.data; // Log the entire response to check its structuresubmit 
            
       
            
            // Assuming the response includes business hours in the data
            

            // return console.log(response.data.businessHours); // Return the business hours from the response
             
             
        } catch (error) {
            // console.error('Error fetching business hours:', error);
            // return null; // Return null in case of an error
            // Handle error appropriately
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Error fetching business hours:', error.response.status, error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error:', error.message);
        }
        return null; // Return null or handle the error accordingly
        }
    };
    
   
    
    const fetchBookedTimes = async (selectedDate) => {
        try {
            const response = await axios.get(`/booked-times/${selectedDate}`);

            return response.data.appointmentTimes || []; // Return the booked times
            // setBookedTimes(response.data.appointmentTimes || []);
            // console.log(response.data.appointmentTimes);
        } catch (error) {
            console.error('Error fetching booked times:', error);
            return [];
        }
    };

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
    
    
    
    // **Generate available time slots based on business hours and step**
    const generateAvailableTimes = (openingTime, closingTime, step,bookedTimes) => {
        const times = [];
        const [openHour, openMinute] = openingTime.split(':');
        const [closeHour, closeMinute] = closingTime.split(':');

        let currentTime = new Date();
        currentTime.setHours(openHour, openMinute);

        const endTime = new Date();
        endTime.setHours(closeHour, closeMinute);

        // Create time slots based on step interval
        while (currentTime < endTime) {
            const timeString = currentTime.toTimeString().slice(0, 5); // Format as HH:mm

    
            // Modify bookedTimes to include only HH:MM
            const bookedTimesShortened = bookedTimes.map(time => time.slice(0, 5));
            const isBooked = bookedTimesShortened.includes(timeString);


            
            if (!isBooked) { // **Exclude booked times**
                
                times.push(timeString);
            }
            currentTime.setMinutes(currentTime.getMinutes() + step);
        }
        console.log("final times")
        console.log(times);
        setAvailableTimes(times); // Update available times in the state
        
    };

    const handleDateChange = async (e) => {
        const newDate = e.target.value;
        setData('appointmentDate', newDate);


        const dayOfWeek = new Date(newDate).toLocaleDateString('en-US', { weekday: 'long' }); 

            // Check if the selected date is closed
        if (isClosedDay(new Date(newDate))) {
            toast.error('Selected date is closed for appointments.'); // Notify user
            setAvailableTimes([]); // Reset available times
            return; // Exit early
        }
        
        

        // **Fetch business hours and booked times for the selected date**
        const businessHours = await fetchBusinessHours(dayOfWeek);
        // console.log("145");
        // console.log(businessHours);
        const bookedTimes = await fetchBookedTimes(newDate); // **Fetch booked times**
      
        if (businessHours) {
            generateAvailableTimes(businessHours.openingTime, businessHours.closingTime, businessHours.step,bookedTimes); // **Generate times based on business hours**
          
        } else {
            setAvailableTimes([]); // Reset available times if the business is closed
        }

        updateMinTime(newDate);

        

    };

    // **No major changes here**
    const updateMinTime = (selectedDate) => {
        const now = new Date();
        const selected = new Date(selectedDate);

        if (selected.toDateString() === now.toDateString()) {
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setMinTime(`${hours}:${minutes}`);
        } else {
            setMinTime('00:00');
        }
    };

    const submit = async (e) => {
        e.preventDefault();

       
        try {
           
            const requestData = {
                vehicalid: data.vehicalid,
                description: data.description,
                serviceType: data.serviceType,
                appointmentDate: data.appointmentDate,
                appointmentTime: data.appointmentTime,
            };
        
            console.log('Request data:', requestData); // Log the data being sent
        
            const response = await axios.post(`/appointments`, requestData);
            console.log('Inertia Response:', response);

            if (response.data.status === 'success') {
                toast.success(response.data.message); // Show success toast
                reset('vehicalid','description', 'serviceType', 'appointmentDate', 'appointmentTime');
                setAvailableTimes([]); // Optionally reset available times
            } else {
                toast.error('Failed to create appointment. Please try again.'); // Handle unexpected response
            }
        } catch (error) {
            toast.error('Failed to create appointment. Please try again.'); // Show error toast
            console.error('Error details:', error); // Log the error details
        }
    };


    return (
        <div className="content-area bg-white p-8 max-w-xl mx-auto rounded-lg shadow-md">
         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an appointment</h1>
         <div className="scrollable-form-container max-h-[500px] overflow-y-auto p-4">
           <ToastContainer position="top-right" autoClose={5000} />
    
           <form onSubmit={submit}>

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
                                        {vehicle} {/* Assuming `vehicle` is the vehicle_id */}
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
                    <div className="relative">
                        <TextInput
                            id="appointmentDate"
                            type="date"
                            name="appointmentDate"
                            value={data.appointmentDate}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                            onChange={(e) => handleDateChange(e)}
                            min={minDate}
                            max={maxDate}
                            required
                            placeholder="Select a date" // Use the standard placeholder attribute
                        />
                       <DatePicker
                            selected={data.appointmentDate ? new Date(data.appointmentDate) : null}
                            onChange={(date) => {
                                console.log('Selected date:', date);
                                handleDateChange({ target: { value: date ? date.toISOString().split('T')[0] : '' } });
                            }}
                            filterDate={(date) => {
                                const isClosed = isClosedDay(date);
                                console.log('Checking date:', date, 'Is closed day:', isClosed);
                                return !isClosed; // Filter out closed days
                            }}
                            className="absolute inset-0 h-full w-full opacity-0 cursor-pointer" 
                        />


                    </div>
                    <InputError message={errors.appointmentDate} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="appointmentTime" value="Appointment Time" />
                    <select
                        id="appointmentTime"
                        name="appointmentTime"
                        value={data.appointmentTime}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('appointmentTime', e.target.value)}
                        required
                    >
                        <option value="">Select a time</option>
                        {availableTimes.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                    <InputError message={errors.appointmentTime} className="mt-2" />
                </div>

                <div className="mt-4">
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Creating...' : 'Create Appointment'}
                    </PrimaryButton>
                </div>
                
            </form>
     </div>
     </div>
    );
}
