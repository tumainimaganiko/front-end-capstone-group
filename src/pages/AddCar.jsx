/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { addCar } from '../redux/cars/carsSlice';
import { fetchModels } from '../redux/cars/modelsSlice';

function AddCarPage() {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const models = useSelector((state) => state.models.models);

  const [isImageValid, setIsImageValid] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    plate_number: '',
    image: '',
    price: '',
    status: 'true',
    city: '',
    model_id: '',
  });

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(addCar({ car: formData }));
    // navigate('/Cars');
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleModelChange = (e) => {
    const modelId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      modelId,
    }));
  };

  const validateImage = () => {
    const img = new Image();
    img.onload = () => setIsImageValid(true);
    img.onerror = () => setIsImageValid(false);
    img.src = formData.image;
  };
  const handleImageBlur = () => {
    validateImage();
  };

  return (
    <section className="p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add New Car</h1>
        <form id="Add-car-form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium">
              Car Name:
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 rounded w-full "
              onChange={(e) => handleInputChange('name', e.target.value)}
              value={formData.name}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="model_id" className="block font-medium">
              Select Model:
            </label>
            <select
              id="model_id"
              className="border border-gray-300 rounded w-full"
              onChange={handleModelChange}
              value={formData.model_id}
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

          <div className="mb-4">
            <label htmlFor="carDetails" className="block font-medium">
              Car Plate:
            </label>
            <input
              type="text"
              id="carDetails"
              className="border border-gray-300 rounded w-full"
              onChange={(e) => handleInputChange('plate_number', e.target.value)}
              value={formData.plate_number}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="carPhoto" className="block font-medium">
              Car Photo (URL):
            </label>
            <input
              type="url"
              id="carPhoto"
              className={`border border-gray-300 rounded w-full ${
                !isImageValid ? 'border-red-500' : ''
              }`}
              onChange={(e) => handleInputChange('image', e.target.value)}
              onBlur={handleImageBlur}
              value={formData.image}
              required
            />
            {!isImageValid && (
              <p className="text-red-500 text-sm">Please enter a valid image URL.</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="pricePerDay" className="block font-medium">
              Price Per Day:
            </label>
            <input
              type="number"
              id="pricePerDay"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              onChange={(e) => handleInputChange('price', e.target.value)}
              value={formData.price}
              required
              min="0"
            />
          </div>

          <div className="mb-4">
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
            className="bg-lime-600 hover:bg-primary text-white rounded px-4 py-2"
          >
            <FontAwesomeIcon icon={faCar} className="pr-4" />
            Add Car
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddCarPage;
