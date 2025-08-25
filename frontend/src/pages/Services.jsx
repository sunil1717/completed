import React from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import { useNavigate } from "react-router-dom";
import { FaTruck, FaRecycle } from "react-icons/fa";
import { MdBuild, MdReportProblem } from "react-icons/md";
import { GiCarWheel, GiFlatTire } from "react-icons/gi";
import { GrRotateRight } from "react-icons/gr";

import { motion } from "framer-motion";  // <-- You forgot to import motion

const Services = () => {
  const navigate = useNavigate();

  

  return (
    <>
      <Navbar />
      <div
        className="relative text-white py-20 px-6 mt-25 sm:mt-35 text-center"
        style={{ backgroundColor: "#DA2627" }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Services
        </motion.h1>
      </div>
      <div className="text-center my-8 bg-gray-50">
  <h2 style={{ fontSize: '40px' }} className="font-semibold">
    Explore our services
  </h2>
  <p className="mt-2 text-gray-600 max-w-xl mx-auto">
    Discover a wide range of tyre services tailored to meet your vehicle's needs—from puncture repairs to wheel balancing and everything in between.
  </p>
</div>
<div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
  {/* Card 1: Tyre Sales */}
  <motion.div
    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
    whileHover={{ scale: 1.05 }}
  >
    <i className="bi bi-cart-check text-red-500 text-4xl mb-4"></i>
    <h3 className="text-xl font-semibold mb-2">Tyre Sales</h3>
    <p className="text-gray-600">
      We supply quality tyres for all vehicles—cars, SUVs, 4WDs, and light commercials. Our mobile tyre sales bring trusted brands to your location with expert advice and onsite fitting. Easy, convenient, and safe.
    </p>
  </motion.div>

  {/* Card 2: Fleet Tyre Services */}
  <motion.div
    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
    whileHover={{ scale: 1.05 }}
  >
    <i className="bi bi-truck text-red-500 text-4xl mb-4"></i>
    <h3 className="text-xl font-semibold mb-2">Fleet Tyre Services</h3>
    <p className="text-gray-600">
      We offer scheduled tyre inspections, replacements, and repairs for commercial fleets. Reduce downtime, improve safety, and keep your business moving with our dependable mobile service.
    </p>
  </motion.div>

  {/* Card 3: Onsite Tyre Fitting */}
  <motion.div
    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
    whileHover={{ scale: 1.05 }}
  >
    <i className="bi bi-geo-alt text-red-500 text-4xl mb-4"></i>
    <h3 className="text-xl font-semibold mb-2">Onsite Tyre Fitting</h3>
    <p className="text-gray-600">
      We come to your location—home, office, or roadside—to professionally fit and balance your new tyres. Fast, safe, and convenient tyre fitting without visiting a workshop.
    </p>
  </motion.div>

  {/* Card 4: Puncture Repair */}
  <motion.div
    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
    whileHover={{ scale: 1.05 }}
  >
    <i className="bi bi-tools text-red-500 text-4xl mb-4"></i>
    <h3 className="text-xl font-semibold mb-2">Puncture Repair</h3>
    <p className="text-gray-600">
      Got a flat? Our technicians perform quick, safe mobile puncture repairs or replacement if needed. Wherever you are, we’ll get you back on the road without stress.
    </p>
  </motion.div>

  {/* Card 5: Tyre Rotations */}
  <motion.div
    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
    whileHover={{ scale: 1.05 }}
  >
    <i className="bi bi-arrow-repeat text-red-500 text-4xl mb-4"></i>
    <h3 className="text-xl font-semibold mb-2">Tyre Rotations</h3>
    <p className="text-gray-600">
      Ensure even tyre wear and extended lifespan with our mobile tyre rotation service. We rotate your tyres at your convenience for better performance and fuel efficiency.
    </p>
  </motion.div>

  {/* Card 6: Wheel Balancing */}
  <motion.div
    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
    whileHover={{ scale: 1.05 }}
  >
    <i className="bi bi-speedometer2 text-red-500 text-4xl mb-4"></i>
    <h3 className="text-xl font-semibold mb-2">Wheel Balancing</h3>
    <p className="text-gray-600">
      Experiencing vibrations? Our mobile wheel balancing improves ride comfort and tyre life. We use precision tools to ensure smooth, safe driving on the go.
    </p>
  </motion.div>

  {/* Card 7: Tyre Inspections */}
  <motion.div
    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
    whileHover={{ scale: 1.05 }}
  >
    <i className="bi bi-eye text-red-500 text-4xl mb-4"></i>
    <h3 className="text-xl font-semibold mb-2">Tyre Inspections</h3>
    <p className="text-gray-600">
      Our mobile inspections check tread depth, pressure, and damage—helping you spot issues early and stay safe. Ideal for peace of mind or pre-trip checks.
    </p>
  </motion.div>

  {/* Card 8: Tyre Recycling */}
  <motion.div
    className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg"
    whileHover={{ scale: 1.05 }}
  >
    <i className="bi bi-recycle text-red-500 text-4xl mb-4"></i>
    <h3 className="text-xl font-semibold mb-2">Tyre Recycling</h3>
    <p className="text-gray-600">
      We responsibly collect and recycle your old tyres into sustainable products. Safe disposal that supports a cleaner planet—another reason to choose Aussie Mobile Tyre.
    </p>
  </motion.div>
  {/* Book Now Box */}
<motion.div
  className="p-8 rounded-2xl shadow-md hover:shadow-lg border-[10px] border-[#DA2627]"
  whileHover={{ scale: 1.05 }}
>
  <i className="bi bi-shop text-red-500 text-4xl mb-4"></i>
  
  <h3 className="text-xl text-black font-semibold mb-2">
    Ready to Book A Tyre Service?
  </h3>
  
 <p className="text-gray-600">
    Let Aussie Mobile Tyre come to you for fast, professional service. Book now and get rolling!
    </p>
  
  <a
    href="/"
    className="inline-block bg-white text-[#DA2627] font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
  >
    Book Now
  </a>
</motion.div>


</div></div>
      
      <Footer />
    </>
  )
}

export default Services



