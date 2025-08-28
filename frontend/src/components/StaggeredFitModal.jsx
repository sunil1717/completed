import React, { useState } from "react";
import { X } from "lucide-react";
import filterOptions from "../data/tyre_unique_values.json";


export default function StaggeredFitModal({ onClose, onSubmit }) {


  const [front, setFront] = useState({ width: "", profile: "", rim: "" });
  const [rear, setRear] = useState({ width: "", profile: "", rim: "" });

   const parsedSizes = filterOptions.SIZE.map(sizeStr => {
    const match = sizeStr.match(/^(\d+)\/([\d.]+)R(\d+)$/);
    return match ? { width: match[1], profile: match[2], rimSize: match[3] } : null;
  }).filter(Boolean);

  const uniqueWidths = [...new Set(parsedSizes.map(s => s.width))].sort();
  const uniqueProfiles = [...new Set(parsedSizes.map(s => s.profile))].sort();
  const uniqueRimSizes = [...new Set(parsedSizes.map(s => s.rimSize))].sort();

  const handleFindTyres = () => {
    const selectedData = { front, rear };
    onSubmit(selectedData); 
    onClose();               
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50 ">
      <div className="bg-white text-black rounded-2xl shadow-lg w-[500px]   p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-6">Staggered Fit</h2>

        {/* Front Tyres */}
        <h3 className="text-lg font-medium mb-2">Front Tyres</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <select
            className="border rounded-lg p-2"
            value={front.width}
            onChange={(e) => setFront({ ...front, width: e.target.value })}
          >
            <option value="">Width</option>
            {uniqueWidths.map((w) => (
                        <option className="text-gray-700" key={w} value={w}>{w}</option>
                      ))}
          </select>

          <select
            className="border rounded-lg p-2"
            value={front.profile}
            onChange={(e) => setFront({ ...front, profile: e.target.value })}
          >
            <option value="">Profile</option>
            {uniqueProfiles.map((p) => (
                        <option className="text-gray-700" key={p} value={p}>{p}</option>
                      ))}
          </select>

          <select
            className="border rounded-lg p-2"
            value={front.rim}
            onChange={(e) => setFront({ ...front, rim: e.target.value })}
          >
            <option value="">Rim</option>
            {uniqueRimSizes.map((r) => (
                        <option className="text-gray-700" key={r} value={r}>R{r}</option>
                      ))}
          </select>
        </div>

        {/* Rear Tyres */}
        <h3 className="text-lg font-medium mb-2">Rear Tyres</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <select
            className="border rounded-lg p-2"
            value={rear.width}
            onChange={(e) => setRear({ ...rear, width: e.target.value })}
          >
            <option value="">Width</option>
            {uniqueWidths.map((w) => (
                        <option className="text-gray-700" key={w} value={w}>{w}</option>
                      ))}
          </select>

          <select
            className="border rounded-lg p-2"
            value={rear.profile}
            onChange={(e) => setRear({ ...rear, profile: e.target.value })}
          >
            <option value="">Profile</option>
            {uniqueProfiles.map((p) => (
                        <option className="text-gray-700" key={p} value={p}>{p}</option>
                      ))}
          </select>

          <select
            className="border rounded-lg p-2"
            value={rear.rim}
            onChange={(e) => setRear({ ...rear, rim: e.target.value })}
          >
            <option value="">Rim</option>
           {uniqueRimSizes.map((r) => (
                        <option className="text-gray-700" key={r} value={r}>R{r}</option>
                      ))}
          </select>
        </div>

        {/* Find Tyres Button */}
        <button
          className="w-80 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
          disabled={!front.width || !front.profile || !front.rim || !rear.width || !rear.profile || !rear.rim }
          onClick={handleFindTyres}
        >
           Find Tyres
        </button>
      </div>
    </div>
  );
}
