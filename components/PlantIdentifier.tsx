'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaLeaf, FaFlask, FaGlobeAmericas, FaInfoCircle } from 'react-icons/fa';

const PlantIdentifier = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setError(null);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const identifyPlant = async () => {
    if (!image) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch('/api/gemini', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to identify plant');
      }

      const data = await response.json();
      setResult(data.result);
      console.log(data.result)
    } catch (error) {
      console.error('Error identifying plant:', error);
      setError((error as Error).message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-green-600 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">Plant Identifier</div>
          <div className="space-x-4">
            <a href="#" className="text-white hover:text-green-200">Home</a>
            <a href="#" className="text-white hover:text-green-200">About</a>
            <a href="#" className="text-white hover:text-green-200">Contact</a>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Identify Your Plants</h1>
        
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-4">
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
              Upload a plant image
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>
          
          {imagePreview && (
            <div className="mb-4">
              <Image 
                src={imagePreview} 
                alt="Uploaded plant" 
                width={300} 
                height={300} 
                className="rounded-lg mx-auto"
                objectFit="cover"
              />
            </div>
          )}
          
          <button
            onClick={identifyPlant}
            disabled={!image || loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Identifying...' : 'Identify Plant'}
          </button>
        </div>

        {/* How to Use Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">How to Use</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Upload a clear image of the plant you want to identify.</li>
            <li>Click the "Identify Plant" button.</li>
            <li>Wait for our AI to analyze the image.</li>
            <li>View the detailed information about your plant!</li>
          </ol>
          <p className="mt-4 text-gray-600">
            Our app provides common name, scientific name, family, native region, and a brief description of the identified plant.
          </p>
        </div>

        {error && (
          <div className="mt-4 text-red-600 text-center">
            Error: {error}
          </div>
        )}
        
        {/* Result Cards */}
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <FaLeaf className="text-4xl text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Common Name</h3>
              <p className="text-3xl font-bold text-green-600">{result.commonname || result['common name'] || 'Unknown'}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <FaFlask className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Scientific Name</h3>
              <p className="text-3xl font-bold text-blue-600">{result.scientificname || result['scientific name'] || 'Unknown'}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <FaGlobeAmericas className="text-4xl text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Native Region</h3>
              <p className="text-3xl font-bold text-yellow-600">{result.nativeregion || result['native region'] || 'Unknown'}</p>
            </div>
          </div>
        )}
        
        {result && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <FaInfoCircle className="text-4xl text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{result.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantIdentifier;