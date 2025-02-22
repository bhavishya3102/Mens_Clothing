import React from "react";
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import backgroundImg from "../../assets/background.webp"
import Image from "next/image";

const AboutUs = () => {
    return (
        <div className="max-w-7xl mx-auto p-6 bg-[#fef5eb] shadow-lg rounded-lg ">
            {/* About Us Heading */}
            <h1 className="text-5xl font-extrabold text-center mb-6 text-gray-900">About Us</h1>

            {/* Split Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Image Section */}
                <div className=" bg-cover bg-center rounded-lg py-5" >
                    <Image
                        src={backgroundImg}
                        alt="About Us"
                        className="object-cover h-[80vh] w-full rounded-lg"
                    />
                </div>

                {/* Content Section */}
                <div className="bg-white bg-opacity-90 p-8 rounded-lg h-[80vh] py-5">
                    <p className="text-xl italic text-center mb-6 text-gray-700">&quot;Style that speaks for you.&quot;</p>

                    <div className="mb-6 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Men&apos;s Elite Fashion</h2>
                        <p className="text-gray-700">Your go-to store for premium men&apos;s clothing.</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-gray-900">Our Mission</h3>
                        <p className="text-gray-700">We aim to provide high-quality, stylish, and affordable men&apos;s fashion that keeps you looking sharp for every occasion.</p>
                    </div>

                    <div className="mb-6">
    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h3>
    <ul className="text-gray-700 space-y-3">
        <li className="flex items-center gap-3">
            <FaEnvelope className="text-xl text-gray-800" /> 
            <span className="font-semibold">Email:</span> varvastra3@gmail.com
        </li>
        <li className="flex items-center gap-3">
            <FaPhone className="text-xl text-gray-800" /> 
            <span className="font-semibold">Phone:</span> +91-11-4603 8043
        </li>
        <li className="flex items-center gap-3">
            <FaWhatsapp className="text-xl text-gray-800" /> 
            <span className="font-semibold">WhatsApp:</span> +91-9625429529
        </li>
        <li className="flex gap-3">
            <FaMapMarkerAlt className="text-xl text-gray-800 mt-1" /> 
            <div>
                <span className="font-semibold">Address:</span>
                D-13, Central Market,<br />
                Lajpat Nagar-2, Near 24 Seven Store,<br />
                3C&apos;s Road, New Delhi - 110024
            </div>
        </li>
    </ul>
</div>

                    <div className="flex justify-center gap-4">
                        <a href="https://facebook.com/menselitefashion" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-3xl"><FaFacebook /></a>
                        <a href="https://instagram.com/menselitefashion" target="_blank" rel="noopener noreferrer" className="text-pink-500 text-3xl"><FaInstagram /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;