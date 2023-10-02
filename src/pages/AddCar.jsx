/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCar } from '../redux/cars/carsSlice';
import { fetchModels } from '../redux/cars/modelsSlice';

function AddCarPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const models = useSelector((state) => state.models.models);

  const [formData, setFormData] = useState({
    carName: '',
    carDetails: '',
    carPhoto: '',
    pricePerDay: '0',
    city: '',
    selectedModel: '',
  });

  console.log(fetchModels());

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

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

  const handleModelChange = (e) => {
    const selectedModel = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      selectedModel,
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
            <label htmlFor="selectedModel" className="block font-medium">
              Select Model:
            </label>
            <select
              id="selectedModel"
              className="border border-gray-300 rounded w-full"
              onChange={handleModelChange}
              value={formData.selectedModel}
              required
            >
              <option value="">-- Select a Model --</option>
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
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
