import { Inertia } from '@inertiajs/inertia';
import icon from "../assets/icon.png";
import icon2 from "../assets/icon-1.png";
import logo from "../assets/dpmc.jfif";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center pt-3">
        <h2 className="font-bold text-3xl mb-5 uppercase">About Us</h2>
      </div>
      
      <div className="flex flex-col md:flex-row md:justify-between mt-5 items-center">
  <div className="md:w-1/2 mb-3">
    <h3 className="text-3xl font-semibold">Shantha Engineering (PVT) Ltd.</h3>
    <p className="mt-2 text-lg">
      Dealer for Selling Brand new Motor cycles, 2W/3W Spare parts. 
      Reg. No PV 70449 2W/3W spare parts, 2W/3W services & repairing 
      of David Pieris Motor Company Limited. #520, Tangalle Road, 
      Welewatta, Matara. Tel: 041 2227703/076 81 41 826 Fax: 041 2227703
    </p>
  </div>
  <div className="md:w-1/2 flex justify-center items-center">
    <img src={logo} alt="DPMC Logo" className="w-1/2"/>
  </div>
</div>

 
      <section className="bg-gray-800 text-white py-8 mt-5 mb-10 ">
        <div className="flex justify-between">
          <div className="w-1/2 flex justify-center">
            <img className="h-40" src={icon2} alt="Icon 2" />
          </div>
          <div className="w-1/2 flex justify-center">
            <img className="h-40" src={icon} alt="Icon 1" />
          </div>
        </div>

        <div className="flex center-between mt-5 space-x-10">
          <div className="w-1/2 text-center">
            <h4 className="underline font-semibold text-2xl">Mission</h4>
            <p className="mt-2 text-center">
              The mission envisaged by Shantha Engineering Motor Service is to provide the highest possible satisfaction from our services rendered to our customers with the help of the most modern and advanced technical expertise and equipment available to us. It is also an integral part of our mission to extend a helping hand to the able but handicapped to be gainfully employed while providing quality service to all. Our mission does in no way exclude the overall economic development of our country.
            </p>
          </div>
          <div className="w-1/2 text-center">
            <h4 className="underline font-semibold text-2xl">Vision</h4>
            <p className="mt-2 text-center">
              Our vision is to be the forerunner among the web of sales representatives of the David Pieris Motor Company in achieving the highest sales records of the prestigious Bajaj motor vehicles and spares in the island. Our commitment is always to promote the sale of quality Bajaj products, provide job opportunities to the talented and skilled youth of our nation, and ensure an eco-friendly system of transport while contributing towards development in all spheres connected to us.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
