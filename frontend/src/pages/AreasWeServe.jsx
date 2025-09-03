import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const AreasWeServe = () => {
  const [suburbs, setSuburbs] = useState([]);

  useEffect(() => {
    const fetchSuburbs = async () => {
      try {
        const res = await axios.get("/api/service/suburbs");
        if (res.data.suburbs && res.data.suburbs.length > 0) {
          setSuburbs(res.data.suburbs);
        }
      } catch (error) {
        console.error("Error fetching suburbs:", error);
      }
    };
    fetchSuburbs();
  }, []);

  // ✅ customIcon moved outside JSX
  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // ✅ full list of service areas
  const serviceAreas = [
    { postcode: '3125', name: 'Bennettswood', lat: -37.847, lng: 145.096 },
  { postcode: '3125', name: 'Burwood', lat: -37.850, lng: 145.099 },
  { postcode: '3125', name: 'Surrey Hills South', lat: -37.830, lng: 145.070 },
  { postcode: '3145', name: 'Caulfield East', lat: -37.884, lng: 145.045 },
  { postcode: '3145', name: 'Central Park', lat: -37.882, lng: 145.043 },
  { postcode: '3145', name: 'Malvern East', lat: -37.862, lng: 145.062 },
  { postcode: '3147', name: 'Ashburton', lat: -37.865, lng: 145.090 },
  { postcode: '3147', name: 'Ashwood', lat: -37.859, lng: 145.093 },
  { postcode: '3148', name: 'Chadstone', lat: -37.882, lng: 145.095 },
  { postcode: '3148', name: 'Chadstone Centre', lat: -37.884, lng: 145.093 },
  { postcode: '3148', name: 'Holmesglen', lat: -37.883, lng: 145.090 },
  { postcode: '3148', name: 'Jordanville', lat: -37.883, lng: 145.078 },
  { postcode: '3149', name: 'Mount Waverley', lat: -37.876, lng: 145.130 },
  { postcode: '3149', name: 'Pinewood', lat: -37.872, lng: 145.124 },
  { postcode: '3149', name: 'Syndal', lat: -37.871, lng: 145.122 },
  { postcode: '3150', name: 'Brandon Park', lat: -37.872, lng: 145.160 },
  { postcode: '3150', name: 'Glen Waverley', lat: -37.876, lng: 145.140 },
  { postcode: '3150', name: 'Wheelers Hill', lat: -37.885, lng: 145.169 },
  { postcode: '3151', name: 'Burwood East', lat: -37.843, lng: 145.146 },
  { postcode: '3151', name: 'Burwood Heights', lat: -37.836, lng: 145.145 },
  { postcode: '3152', name: 'Knox City Centre', lat: -37.859, lng: 145.244 },
  { postcode: '3152', name: 'Studfield', lat: -37.852, lng: 145.230 },
  { postcode: '3152', name: 'Wantirna', lat: -37.846, lng: 145.245 },
  { postcode: '3152', name: 'Wantirna South', lat: -37.855, lng: 145.252 },
  { postcode: '3156', name: 'Ferntree Gully', lat: -37.889, lng: 145.282 },
  { postcode: '3156', name: 'Lysterfield', lat: -37.943, lng: 145.263 },
  { postcode: '3156', name: 'Lysterfield South', lat: -37.956, lng: 145.271 },
  { postcode: '3156', name: 'Mountain Gate', lat: -37.923, lng: 145.275 },
  { postcode: '3156', name: 'Upper Ferntree Gully', lat: -37.886, lng: 145.282 },
  { postcode: '3162', name: 'Caulfield', lat: -37.879, lng: 145.027 },
  { postcode: '3162', name: 'Caulfield South', lat: -37.885, lng: 145.033 },
  { postcode: '3162', name: 'Hopetoun Gardens', lat: -37.883, lng: 145.029 },
  { postcode: '3163', name: 'Carnegie', lat: -37.885, lng: 145.055 },
  { postcode: '3163', name: 'Glen Huntly', lat: -37.885, lng: 145.069 },
  { postcode: '3163', name: 'Murrumbeena', lat: -37.911, lng: 145.070 },
  { postcode: '3165', name: 'Bentleigh East', lat: -37.902, lng: 145.068 },
  { postcode: '3165', name: 'Coatesville', lat: -37.912, lng: 145.059 },
  { postcode: '3166', name: 'Hughesdale', lat: -37.900, lng: 145.070 },
  { postcode: '3166', name: 'Huntingdale', lat: -37.911, lng: 145.077 },
  { postcode: '3166', name: 'Oakleigh', lat: -37.911, lng: 145.071 },
  { postcode: '3166', name: 'Oakleigh East', lat: -37.908, lng: 145.082 },
  { postcode: '3167', name: 'Oakleigh South', lat: -37.926, lng: 145.069 },
  { postcode: '3168', name: 'Clayton', lat: -37.914, lng: 145.133 },
  { postcode: '3168', name: 'Notting Hill', lat: -37.897, lng: 145.122 },
  { postcode: '3169', name: 'Clarinda', lat: -37.952, lng: 145.094 },
  { postcode: '3169', name: 'Clayton South', lat: -37.939, lng: 145.124 },
  { postcode: '3170', name: 'Mulgrave', lat: -37.902, lng: 145.151 },
  { postcode: '3170', name: 'Waverley Gardens', lat: -37.894, lng: 145.155 },
  { postcode: '3171', name: 'Sandown Village', lat: -37.917, lng: 145.160 },
  { postcode: '3171', name: 'Springvale', lat: -37.947, lng: 145.146 },
  { postcode: '3172', name: 'Dingley Village', lat: -37.960, lng: 145.135 },
  { postcode: '3172', name: 'Springvale South', lat: -37.967, lng: 145.140 },
  { postcode: '3173', name: 'Keysborough', lat: -37.956, lng: 145.138 },
  { postcode: '3174', name: 'Noble Park', lat: -37.954, lng: 145.168 },
  { postcode: '3174', name: 'Noble Park East', lat: -37.950, lng: 145.176 },
  { postcode: '3174', name: 'Noble Park North', lat: -37.933, lng: 145.173 },
  { postcode: '3175', name: 'Bangholme', lat: -38.016, lng: 145.211 },
  { postcode: '3175', name: 'Dandenong', lat: -37.981, lng: 145.214 },
  { postcode: '3175', name: 'Dandenong East', lat: -37.981, lng: 145.222 },
  { postcode: '3175', name: 'Dandenong North', lat: -37.955, lng: 145.214 },
  { postcode: '3175', name: 'Dandenong South', lat: -37.995, lng: 145.220 },
  { postcode: '3175', name: 'Dunearn', lat: -37.978, lng: 145.210 },
  { postcode: '3177', name: 'Doveton', lat: -37.996, lng: 145.235 },
  { postcode: '3177', name: 'Eumemmerring', lat: -38.003, lng: 145.245 },
  { postcode: '3178', name: 'Rowville', lat: -37.906, lng: 145.287 },
  { postcode: '3179', name: 'Scoresby', lat: -37.876, lng: 145.271 },
  { postcode: '3180', name: 'Knoxfield', lat: -37.861, lng: 145.277 },
  { postcode: '3185', name: 'Elsternwick', lat: -37.881, lng: 145.003 },
  { postcode: '3185', name: 'Gardenvale', lat: -37.887, lng: 145.002 },
  { postcode: '3185', name: 'Ripponlea', lat: -37.887, lng: 145.012 },
  { postcode: '3186', name: 'Brighton', lat: -37.907, lng: 144.991 },
  { postcode: '3186', name: 'Brighton North', lat: -37.894, lng: 144.991 },
  { postcode: '3186', name: 'Dendy', lat: -37.903, lng: 144.996 },
  { postcode: '3187', name: 'Brighton East', lat: -37.910, lng: 145.009 },
  { postcode: '3187', name: 'North Road', lat: -37.910, lng: 145.010 },
  { postcode: '3188', name: 'Hampton', lat: -37.916, lng: 145.000 },
  { postcode: '3188', name: 'Hampton East', lat: -37.913, lng: 145.012 },
  { postcode: '3188', name: 'Hampton North', lat: -37.907, lng: 145.011 },
  { postcode: '3189', name: 'Moorabbin', lat: -37.935, lng: 145.045 },
  { postcode: '3189', name: 'Moorabbin East', lat: -37.931, lng: 145.055 },
  { postcode: '3189', name: 'Wishart', lat: -37.932, lng: 145.042 },
  { postcode: '3190', name: 'Highett', lat: -37.918, lng: 145.040 },
  { postcode: '3191', name: 'Sandringham', lat: -37.929, lng: 145.020 },
  { postcode: '3192', name: 'Cheltenham', lat: -37.952, lng: 145.040 },
  { postcode: '3192', name: 'Cheltenham East', lat: -37.948, lng: 145.050 },
  { postcode: '3192', name: 'Cheltenham North', lat: -37.937, lng: 145.046 },
  { postcode: '3192', name: 'Southland Centre', lat: -37.944, lng: 145.041 },
  { postcode: '3193', name: 'Beaumaris', lat: -37.983, lng: 145.032 },
  { postcode: '3193', name: 'Black Rock', lat: -37.997, lng: 145.041 },
  { postcode: '3193', name: 'Black Rock North', lat: -37.998, lng: 145.042 },
  { postcode: '3193', name: 'Cromer', lat: -37.985, lng: 145.048 },
  { postcode: '3194', name: 'Mentone', lat: -37.975, lng: 145.051 },
  { postcode: '3194', name: 'Mentone East', lat: -37.969, lng: 145.057 },
  { postcode: '3194', name: 'Moorabbin Airport', lat: -37.936, lng: 145.057 },
  { postcode: '3195', name: 'Aspendale', lat: -38.020, lng: 145.099 },
  { postcode: '3195', name: 'Aspendale Gardens', lat: -38.016, lng: 145.107 },
  { postcode: '3195', name: 'Braeside', lat: -38.035, lng: 145.099 },
  { postcode: '3195', name: 'Mordialloc', lat: -38.011, lng: 145.084 },
  { postcode: '3195', name: 'Mordialloc North', lat: -38.005, lng: 145.082 },
  { postcode: '3195', name: 'Parkdale', lat: -37.991, lng: 145.080 },
  { postcode: '3195', name: 'Waterways', lat: -37.994, lng: 145.086 },
  { postcode: '3196', name: 'Bonbeach', lat: -38.032, lng: 145.101 },
  { postcode: '3196', name: 'Chelsea', lat: -38.037, lng: 145.096 },
  { postcode: '3196', name: 'Chelsea Heights', lat: -38.041, lng: 145.100 },
  { postcode: '3196', name: 'Edithvale', lat: -38.039, lng: 145.086 },
  { postcode: '3197', name: 'Carrum', lat: -38.045, lng: 145.093 },
  { postcode: '3197', name: 'Patterson Lakes', lat: -38.057, lng: 145.110 },
  { postcode: '3198', name: 'Belvedere Park', lat: -38.045, lng: 145.115 },
  { postcode: '3198', name: 'Seaford', lat: -38.086, lng: 145.110 },
  { postcode: '3199', name: 'Frankston', lat: -38.141, lng: 145.125 },
  { postcode: '3199', name: 'Frankston East', lat: -38.134, lng: 145.137 },
  { postcode: '3199', name: 'Frankston Heights', lat: -38.136, lng: 145.120 },
  { postcode: '3199', name: 'Frankston South', lat: -38.158, lng: 145.122 },
  { postcode: '3199', name: 'Karingal', lat: -38.136, lng: 145.130 },
  { postcode: '3199', name: 'Karingal Centre', lat: -38.139, lng: 145.130 },
  { postcode: '3200', name: 'Frankston North', lat: -38.124, lng: 145.136 },
  { postcode: '3200', name: 'Pines Forest', lat: -38.123, lng: 145.132 },
  { postcode: '3201', name: 'Carrum Downs', lat: -38.066, lng: 145.156 },
  { postcode: '3202', name: 'Heatherton', lat: -37.987, lng: 145.128 },
  { postcode: '3204', name: 'Bentleigh', lat: -37.912, lng: 145.014 },
  { postcode: '3204', name: 'Mckinnon', lat: -37.899, lng: 145.036 },
  { postcode: '3204', name: 'Ormond', lat: -37.905, lng: 145.028 },
  { postcode: '3204', name: 'Patterson', lat: -37.899, lng: 145.036 },
  { postcode: '3800', name: 'Monash University', lat: -37.915, lng: 145.135 },
  { postcode: '3802', name: 'Endeavour Hills', lat: -37.956, lng: 145.275 },
  { postcode: '3803', name: 'Hallam', lat: -38.020, lng: 145.295 },
  { postcode: '3804', name: 'Narre Warren East', lat: -38.020, lng: 145.310 },
  { postcode: '3804', name: 'Narre Warren North', lat: -38.009, lng: 145.302 },
  { postcode: '3805', name: 'Fountain Gate', lat: -38.020, lng: 145.308 },
  { postcode: '3805', name: 'Narre Warren', lat: -38.041, lng: 145.297 },
  { postcode: '3805', name: 'Narre Warren South', lat: -38.052, lng: 145.294 },
  { postcode: '3806', name: 'Berwick', lat: -38.051, lng: 145.318 },
  { postcode: '3806', name: 'Harkaway', lat: -38.053, lng: 145.331 },
  { postcode: '3806', name: 'Beaconsfield Upper', lat: -38.051, lng: 145.335 },
  { postcode: '3807', name: 'Beaconsfield', lat: -38.047, lng: 145.309 },
  ];

  // ✅ map center
  const centerPosition = [-37.9, 145.1];

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-27 sm:mt-35 bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white py-16 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Service Areas</h1>
          <p className="text-lg opacity-90">
            We proudly serve many suburbs across Australia. Select any suburb to
            learn more.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - List of Suburbs */}
          <div className="lg:col-span-1 bg-white shadow-md rounded-xl p-4 max-h-[600px] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-red-600" /> Suburbs We Serve
            </h2>
            <ul className="space-y-2">
              {suburbs.map((suburb, idx) => (
                <li key={idx}>
                  <Link
                    to={`/area-we-serve/${suburb.replace(/\s+/g, "-").toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 rounded-lg cursor-pointer transition bg-gray-100 hover:bg-blue-100"
                  >
                    {suburb}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - Map */}
         <div
  className="w-full max-w-full lg:max-w-4xl h-[500px] rounded-xl overflow-hidden shadow-md bg-gray-200 mx-auto"
  style={{ minHeight: "400px", width: "720px" }}
>
  <MapContainer
    center={centerPosition}
    zoom={10}
    scrollWheelZoom={true}
    style={{ height: "100%", width: "720px" }}
  >
    <TileLayer
      attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {serviceAreas.map(({ postcode, name, lat, lng }) => (
      <Marker key={`${postcode}-${name}`} position={[lat, lng]} icon={customIcon}>
        <Popup>
          {name} ({postcode})
        </Popup>
      </Marker>
    ))}
  </MapContainer>
</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AreasWeServe;
