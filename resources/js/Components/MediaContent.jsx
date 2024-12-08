import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import image4 from '../assets/a.jpg';
import image5 from '../assets/01.jpg';
import image6 from '../assets/10.jpeg';

const MediaContent = () => {
  return (
    <div>
      <section className="py-12">
        <div className="p-5 border">
          <div className="container mx-auto">
            <div className="flex justify-center mb-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold uppercase">Media</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card bg-white shadow-lg rounded-lg">
                <img className="rounded-t-lg" src={image4} alt="Media" />
                <div className="p-6">
                  <InertiaLink href="#!" className="no-underline text-black">
                    <h5 className="text-xl font-semibold mb-3">Highly Skilled Technicians</h5>
                  </InertiaLink>
                  <p className="text-gray-700">At Shantha Engineering, our technical team consists of highly skilled and experienced professionals who are dedicated to providing top-quality service. With expert knowledge in motorcycle and three-wheeler maintenance, our technicians ensure that every vehicle is handled with precision and care. Their commitment to excellence guarantees reliable and efficient service, ensuring your vehicle performs at its best.</p>
                </div>
              </div>
              <div className="card bg-white shadow-lg rounded-lg">
                <img className="rounded-t-lg" src={image5} alt="Media" />
                <div className="p-6">
                  <InertiaLink href="#!" className="no-underline text-black">
                    <h5 className="text-xl font-semibold mb-3">Handled the repairs</h5>
                  </InertiaLink>
                  <p className="text-gray-700">We are skilled in handling major repairs for motorcycles and three-wheelers. Whether it's engine work or mechanical issues, our team is ready to fix it efficiently and get your vehicle back on the road.</p>
                </div>
              </div>
              <div className="card bg-white shadow-lg rounded-lg">
                <img className="rounded-t-lg" src={image6} alt="Media" />
                <div className="p-6">
                  <InertiaLink href="#!" className="no-underline text-black">
                    <h5 className="text-xl font-semibold mb-3">Keep all the records</h5>
                  </InertiaLink>
                  <p className="text-gray-700">We keep detailed records of all the services and repairs we perform on your vehicle. This helps us track its history and provide better service in the future, ensuring we understand your vehicle's needs and maintain its long-term performance..</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaContent;
