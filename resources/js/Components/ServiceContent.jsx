import React from 'react';
import { Link } from '@inertiajs/react';
import image from '../assets/03.jpg';
import image1 from '../assets/02.jpg';
import image3 from '../assets/04.jpg';

const ServiceContent = () => {
  return (
    <div className="p-5 border">
      <div className="container mx-auto">
        <div className="flex justify-center mb-8">
          <div className="text-center">
            <h2 className="font-bold text-3xl uppercase mb-5">Our Services</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src={image}
              alt="Full Service"
            />
            <div className="p-4">
              <Link href="/fullservice" className="block text-lg font-semibold text-gray-900 mb-2">
                Full Service
              </Link>
              <p className="text-gray-700">Our experts are skilled to handle any major mechanical repair. We are armed with the best tools.</p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src={image1}
              alt="Normal Service"
            />
            <div className="p-4">
              <Link href="/normalservice" className="block text-lg font-semibold text-gray-900 mb-2">
                Normal Service
              </Link>
              <p className="text-gray-700">Our experts are skilled to handle any major mechanical repair. We are armed with the best tools.</p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src={image3}
              alt="Request Service History"
            />
            <div className="p-4">
              <Link href="/login" className="block text-lg font-semibold text-gray-900 mb-2">
                Request Service History
              </Link>
              <p className="text-gray-700">Get service information about the vehicle you need.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceContent;
