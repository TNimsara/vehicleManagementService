import { Inertia } from '@inertiajs/inertia-react';
import logo from "../assets/dpmc.jfif";
import { FaFacebookF, FaGoogle, FaYoutube } from 'react-icons/fa';


const ContactContent = () => {
    return (
        <div className="container mx-auto">
            <div className="row gx-5 justify-center pt-3">
                <div className="col-lg-3 col-xl-6">
                    <div className="text-center">
                        <h2 className="font-bold mb-5 uppercase text-3xl">Contact Us</h2>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-5">
                <div className="md:w-1/2 mt-3 mb-3">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15873.383712700004!2d80.5626848!3d5.9469769!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae138df034597d3%3A0x1cfc22f1d14324d8!2sShantha%20enginearing%20pvt%20ltd!5e0!3m2!1sen!2slk!4v1728814157938!5m2!1sen!2slk" 
                        width="600" 
                        height="450" 
                        className="border-0" 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade" 
                    />
                </div>
                <div className="md:w-1/2 mt-3 pt-5">
                    <img src={logo} alt="Shantha Engineering" />

                    <h3 className="text-2xl font-bold text-yellow-500">Shantha Engineering (PVT) Ltd.</h3>

                    <p className="flex items-center">
                        <i className="fas fa-home me-2" /> No:520, Tangalle Road, Welewatta, Mathara
                    </p>
                    <p className="flex items-center">
                        <i className="fas fa-phone me-2" />  E-mail: Shantha12@gmail.com
                    </p>
                    <p className="flex items-center">
                        <i className="fas fa-phone me-2" /> T/P No : 041-2227703
                    </p>
                    <p className="flex items-center">
                        <i className="fas fa-phone me-2" />Fax: 041-2227703
                    </p>                 
                </div>
            </div>
            <div className="bg-black p-5 mt-5 mb-5 border">
                <div className="text-center text-white">
                    <h2 className="font-bold mb-1">Follow Us</h2>
                    <p>Follow us on social media and join our social network & customer community to share and celebrate</p>
                </div>
                <div className="text-center flex justify-center items-center mt-4">
                    <ul className="list-unlisted list-inline flex space-x-3">
                        <li>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                            <FaFacebookF />
                        </a>
                         
                        </li>
                        <li>
                        <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="text-white">
                             <FaGoogle />
                                             </a>
                        </li>
                        <li>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white">
                            <FaYoutube />
                                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ContactContent;
