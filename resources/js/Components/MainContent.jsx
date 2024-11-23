import { Inertia } from '@inertiajs/inertia';
import image from '../assets/pexels-cottonbro-4489704.jpg';
import image1 from '../assets/02.jpg';
import image2 from '../assets/03.jpg';
import image3 from '../assets/04.jpg';

import image4 from '../assets/a.jpg';
import image5 from '../assets/01.jpg';
import image6 from '../assets/10.jpeg';
import { Link } from '@inertiajs/react';

function MainContent({ src }) {
  return (
    <div>
      {/* Banner Image */}
      <div className="w-full h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${src || image})` }}>
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold">Welcome to Shantha Engineering</h1>
        </div>
      </div>

      {/* Main Area */}
      <section className="py-10">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold uppercase">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Full Service Card */}
            <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
              <img className="w-full" src={image2} alt="Full Service" />
              <div className="p-6">
                <Link href="/Services" className="text-lg font-semibold text-gray-800 hover:underline">Full Service</Link>
                <p className="mt-3 text-gray-600">Our experts are skilled to handle any major mechanical repair. We are armed with the best of tools.</p>
              </div>
            </div>
            {/* Normal Service Card */}
            <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
              <img className="w-full" src={image1} alt="Normal Service" />
              <div className="p-6">
                <Link href="/Services" className="text-lg font-semibold text-gray-800 hover:underline">Normal Service</Link>
                <p className="mt-3 text-gray-600">Our experts are skilled to handle any major mechanical repair. We are armed with the best of tools.</p>
              </div>
            </div>
            {/* Service History Card */}
            <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
              <img className="w-full" src={image3} alt="Request Service History" />
              <div className="p-6">
                <Link href="/Services" className="text-lg font-semibold text-gray-800 hover:underline">Request Service History</Link>
                <p className="mt-3 text-gray-600">Get service information about the vehicle you need.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold uppercase">Media</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Test1 Card */}
            <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
              <img className="w-full" src={image4} alt="Test1" />
              <div className="p-6">
                <Link href="/Media" className="text-lg font-semibold text-gray-800 hover:underline">Highly Skilled Technicians</Link>
                <p className="mt-3 text-gray-600">At Shantha Engineering, our technical team consists of highly skilled and experienced professionals who are dedicated to providing top-quality service. With expert knowledge in motorcycle and three-wheeler maintenance, our technicians ensure that every vehicle is handled with precision and care.</p>
              </div>
            </div>
            {/* Test2 Card */}
            <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
              <img className="w-full" src={image5} alt="Test2" />
              <div className="p-6">
                <Link href="/Media" className="text-lg font-semibold text-gray-800 hover:underline">Handled the repairs</Link>
                <p className="mt-3 text-gray-600">We are skilled in handling major repairs for motorcycles and three-wheelers. Whether it's engine work or mechanical issues, our team is ready to fix it efficiently and get your vehicle back on the road..</p>
              </div>
            </div>
            {/* Test3 Card */}
            <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg overflow-hidden">
              <img className="w-full" src={image6} alt="Test3" />
              <div className="p-6">
                <Link href="/Media" className="text-lg font-semibold text-gray-800 hover:underline">Keep all the records</Link>
                <p className="mt-3 text-gray-600">We keep detailed records of all the services and repairs we perform on your vehicle. This helps us track its history and provide better service in the future, ensuring we understand your vehicle's needs and maintain its long-term performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default MainContent;
