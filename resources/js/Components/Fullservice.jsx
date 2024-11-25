import React from 'react';
import image from '../assets/03.jpg';


const FullService = () => {
    return (
        <div className="bg-white">
            {/* Title Section */}
            <div className="mt-10 mb-8">
                <h1 className="text-3xl font-bold mb-4 text-center">Full Service</h1>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-4 lg:px-8 flex flex-wrap lg:flex-nowrap lg:space-x-8 justify-between">
                
                {/* Left Side (Text List) */}
                <div className="w-full lg:w-1/2 mb-8 lg:mb-0 text-left">
                    <h2 className="text-xl font-semibold mb-4">In Full Service We do:</h2>
                    <ul className="list-disc list-inside space-y-0.75 text-lg">
                        <li>Engine Oil Change</li>
                        <li>Oil Filter Replace</li>
                        <li>Cable Oiling/Replace</li>
                        <li>Battery Charging/Replace</li>
                        <li>Air Filter Cleaning/Replace</li>
                        <li>Spark Plug Cleaning/Replace</li>
                        <li>Brake Shoe Cleaning/Replace</li>
                        <li>Chain/Break Adjusting</li>
                        <li>Handle Cup Set Greasing/Replace</li>
                        <li>Chine Sprocket Kit Replace</li>
                        <li>Fork Oil Change/Oil Seal Replace</li>
                        <li>Clutch Plate Replace</li>
                        <li>Fuel Tank Cleaning</li>
                        <li>Clutch Cover Cleaning</li>
                        <li>Carburetor Cleaning</li>
                        <li>Cam Cup Replace</li>
                        <li>Tappet Adjusting</li>
                        <li>Swim Arm Replace/Greasing</li>
                        <li>Wheel Bearing Replace/Greasing</li>
                        <li>Brake Washer Replace Front/Back</li>
                        <li>Disk Pad Replace Front/Back</li>
                        <li>Rear Shock Absorber Replace</li>
                        <li>Engine Tuning</li>
                        <li>Wash and Polish</li>
                    </ul>
                </div>
                
                {/* Right Side (Image) */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <img
                        src={image}
                        alt="Mechanic Working"
                        className="w-80 h-80 rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default FullService;
