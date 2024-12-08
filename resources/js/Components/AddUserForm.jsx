import React from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserRegistrationForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        userType: '',
        password: '',
        confirmPassword: '',
    });

    // Handle form submission
    const submit = (e) => {
        e.preventDefault();

        // Construct the payload
        const payload = {
            name: data.name,
            email: data.email,
            userType: data.userType,
            password: data.password,
            confirmPassword: data.confirmPassword,
        };

       
        // Post data to the server
        post(route('user.store'), {
            data: payload,
            onSuccess: () => {
                reset();
                toast.success('User added successfully!');
            },
            onError: () => {
                toast.error('Failed to add user. Please try again.');
            }
        });
    };

    return (
        <div className="content-area bg-white p-8 max-w-xl mx-auto rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New User</h1>
            <form onSubmit={submit}>
                
                {/* Name Field */}
                <div className="mb-4">
                    <InputLabel htmlFor="name" className="block text-gray-700">Name</InputLabel>
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    />
                    {errors.name && <div className="text-red-600 mt-2">{errors.name}</div>}
                </div>

                {/* Email Field */}
                <div className="mb-4">
                    <InputLabel htmlFor="email" className="block text-gray-700">Email</InputLabel>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    />
                    {errors.email && <div className="text-red-600 mt-2">{errors.email}</div>}
                </div>

                {/* User Type Field */}
                <div className="mb-4">
                    <InputLabel htmlFor="userType" className="block text-gray-700">User Type</InputLabel>
                    <select
                        id="userType"
                        name="userType"
                        value={data.userType}
                        onChange={(e) => setData('userType', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select User Type</option>
                        <option value="receptionist ">Receptionist </option>
                        <option value="customer">Customer</option>
                        <option value="Technician">Technician</option>
                    </select>
                    {errors.userType && <div className="text-red-600 mt-2">{errors.userType}</div>}
                </div>

                {/* Password Field */}
                <div className="mb-4">
                    <InputLabel htmlFor="password" className="block text-gray-700">Password</InputLabel>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    />
                    {errors.password && <div className="text-red-600 mt-2">{errors.password}</div>}
                </div>

                {/* Confirm Password Field */}
                <div className="mb-4">
                    <InputLabel htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</InputLabel>
                    <TextInput
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={(e) => setData('confirmPassword', e.target.value)}
                        className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                        required
                    />
                    {errors.confirmPassword && <div className="text-red-600 mt-2">{errors.confirmPassword}</div>}
                </div>

                {/* Submit Button */}
                <PrimaryButton
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    disabled={processing}
                >
                    {processing ? 'Adding User...' : 'Add User'}
                </PrimaryButton>
            </form>

            {/* Toast notifications */}
            <ToastContainer />
        </div>
    );
}
