/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCar } from '../redux/cars/carsSlice';

function AddCarPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    carName: '',
    carDetails: '',
    carPhoto: '',
    pricePerDay: '0',
    city: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCar({ car: formData }));
    navigate('/Cars');
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <section className="p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add New Car</h1>
        <form id="Add-car-form" onSubmit={handleSubmit}>
          <div className="mb-4 md:mb-1">
            <label htmlFor="carName" className="block font-medium">
              Car Name:
            </label>
            <input
              type="text"
              id="carName"
              className="border border-gray-300 rounded w-full "
              onChange={(e) => handleInputChange('carName', e.target.value)}
              value={formData.carName}
              required
            />
          </div>

          <div className="mb-4 md:mb-1">
            <label htmlFor="carDetails" className="block font-medium">
              Car Details:
            </label>
            <textarea
              type="text"
              id="carDetails"
              className="border border-gray-300 rounded w-full"
              onChange={(e) => handleInputChange('carDetails', e.target.value)}
              value={formData.carDetails}
              required
            />
          </div>

          <div className="mb-4 md:mb-1">
            <label htmlFor="carPhoto" className="block font-medium">
              Car Photo (URL):
            </label>
            <input
              type="url"
              id="carPhoto"
              className="border border-gray-300 rounded w-full"
              onChange={(e) => handleInputChange('carPhoto', e.target.value)}
              value={formData.carPhoto}
              required
            />
          </div>

          <div className="mb-4 md:mb-1">
            <label htmlFor="pricePerDay" className="block font-medium">
              Price Per Day:
            </label>
            <input
              type="number"
              id="pricePerDay"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              onChange={(e) => handleInputChange('pricePerDay', e.target.value)}
              value={formData.pricePerDay}
              required
            />
          </div>

          <div className="mb-4 md:mb-1">
            <label htmlFor="city" className="block font-medium">
              City:
            </label>
            <input
              type="text"
              id="city"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              onChange={(e) => handleInputChange('city', e.target.value)}
              value={formData.city}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
          >
            Add Car
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddCarPage;
