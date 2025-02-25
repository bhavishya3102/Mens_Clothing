"use client";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import contactImg from "../../assets/contactus.webp";
import Image from "next/image";
import { saveContactInfo } from "@/lib/firebase";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    const isSuccess = await saveContactInfo(formData);
    if (isSuccess) {
      setSuccessMessage("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      setSuccessMessage("Failed to send message. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div>
      <div className="h-96 bg-cover bg-center rounded-lg">
        <Image src={contactImg} alt="Contact" height={500} className="object-cover rounded-lg h-[50vh] w-full" />
      </div>

      <div className="max-w-6xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold text-center mb-6 text-gray-900">Contact Us</h1>

        <div className="bg-white bg-opacity-90 p-8 rounded-lg w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Get In Touch</h2>
          {successMessage && <p className="text-center text-green-600 mb-4">{successMessage}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex justify-center items-center"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="mt-10 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h3>
          <ul className="text-gray-700 space-y-2">
            <li className="flex items-center justify-center gap-2">
              <FaEnvelope /> Email: support@menselitefashion.com
            </li>
            <li className="flex items-center justify-center gap-2">
              <FaPhone /> Phone: +1 234 567 890
            </li>
            <li className="flex items-center justify-center gap-2">
              <FaMapMarkerAlt /> Address: 123 Fashion Street, New York, USA
            </li>
          </ul>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://facebook.com/menselitefashion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-3xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com/menselitefashion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 text-3xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
