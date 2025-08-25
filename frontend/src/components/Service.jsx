import React from 'react';
import { motion } from 'framer-motion';
import {
  FaTags,
  FaWarehouse,
  FaWrench,
  FaTruck,
  FaTools,
  FaSyncAlt,
  FaBalanceScale,
  FaSearch,
  FaRecycle
} from 'react-icons/fa';

const services = [
  {
  icon: <FaTags size={30} className="text-red-600" />,
  title: 'Tyre Sales',
  description:
    'We supply quality tyres for all vehicles—cars, SUVs, 4WDs, and light commercials. Our mobile tyre sales bring trusted brands to your location with expert advice and onsite fitting. Easy, convenient, and safe.',
},
{
  icon: <FaWarehouse size={30} className="text-red-600" />,
  title: 'Fleet Tyre Services',
  description:
    'We offer scheduled tyre inspections, replacements, and repairs for commercial fleets. Reduce downtime, improve safety, and keep your business moving with our dependable mobile service.',
},
{
  icon: <FaWrench size={30} className="text-red-600" />,
  title: 'Onsite Tyre Fitting',
  description:
    'We come to your location—home, office, or roadside—to professionally fit and balance your new tyres. Fast, safe, and convenient tyre fitting without visiting a workshop.',
},
{
  icon: <FaTruck size={30} className="text-red-600" />,
  title: 'Puncture Repair',
  description:
    'Got a flat? Our technicians perform quick, safe mobile puncture repairs or replacement if needed. Wherever you are, we’ll get you back on the road without stress.',
},
{
  icon: <FaSyncAlt size={30} className="text-red-600" />,
  title: 'Tyre Rotations',
  description:
    'Ensure even tyre wear and extended lifespan with our mobile tyre rotation service. We rotate your tyres at your convenience for better performance and fuel efficiency.',
},
{
  icon: <FaBalanceScale size={30} className="text-red-600" />,
  title: 'Wheel Balancing',
  description:
    'Experiencing vibrations? Our mobile wheel balancing improves ride comfort and tyre life. We use precision tools to ensure smooth, safe driving on the go.',
},
{
  icon: <FaSearch size={30} className="text-red-600" />,
  title: 'Tyre Inspections',
  description:
    'Our mobile inspections check tread depth, pressure, and damage—helping you spot issues early and stay safe. Ideal for peace of mind or pre-trip checks.',
},
{
  icon: <FaRecycle size={30} className="text-red-600" />,
  title: 'Tyre Recycling',
  description:
    'We responsibly collect and recycle your old tyres into sustainable products. Safe disposal that supports a cleaner planet—another reason to choose Aussie Mobile Tyre.',
},
{
  icon: <FaRecycle size={30} className="text-red-600" />,
  title: 'Ready to Book A Tyre Service?',
  description:
    'Let Aussie Mobile Tyre come to you for fast, professional service. Give us a call at +61 403 200 008 or Email at Theaussiemobiletyres@gmail.com!',
}
];

// Motion variants for animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

const Service = () => {
  return (
    <section className="bg-white py-14 px-4 sm:px-6 md:px-20">
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-start mb-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Explore Our Services
      </motion.h2>

      <motion.p
        className="text-start max-w-3xl mx-0.5 text-gray-600 mb-12 text-sm sm:text-base"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Discover a wide range of tyre services tailored to meet your vehicle's needs—from puncture repairs to wheel balancing and everything in between.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition hover:-translate-y-1 hover:scale-105"
            variants={cardVariants}
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Service;
