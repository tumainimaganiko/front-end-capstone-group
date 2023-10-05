import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { addCar } from '../redux/cars/carsSlice';
import { fetchModels } from '../redux/cars/modelsSlice';
import Loader from '../components/loader/Loader';

const AddCarPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const models = useSelector((state) => state.models.models);
  const isLoading = useSelector((state) => state.cars.isLoading);
  const error = useSelector((state) => state.cars.error);
  const cars = useSelector((state) => state.cars.cars);

  const [isImageValid, setIsImageValid] = useState(true);
  const [isValidPlate, setIsValidPlate] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    plate_number: '',
    image: null,
    price: '',
    status: true,
    city: '',
    model_id: '',
  });

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    const {
      name, plate_number, price, city, model_id,
    } = formData;
    data.append('name', name);
    data.append('plate_number', plate_number);
    data.append('image', e.target.image.files[0]);
    data.append('price', price);
    data.append('city', city);
    data.append('model_id', model_id);
    data.append('status', true);
    dispatch(addCar({ car: data }));
    if (!isLoading && !error) {
      setFormData({
        name: '',
        plate_number: '',
        image: null,
        price: '',
        status: true,
        city: '',
        model_id: '',
      });
      navigate('/cars');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleModelChange = (e) => {
    const model_id = parseInt(e.target.value, 10);
    setFormData((prevData) => ({
      ...prevData,
      model_id,
    }));
  };

  const handleImageChange = (field, file) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: file,
    }));
  };

  const validatePlate = () => {
    const plate = formData.plate_number;
    const car = cars.find((car) => car.plate_number === plate);
    if (car) {
      setIsValidPlate(false);
    } else {
      setIsValidPlate(true);
    }
  };

  const handlePlateBlur = () => {
    validatePlate();
  };

  const validateImage = () => {
    if (formData.image !== null && formData.image.type.startsWith('image/')) {
      setIsImageValid(true);
    } else {
      setIsImageValid(false);
    }
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
              id="plate_number"
              className={`border border-gray-300 rounded w-full ${!isValidPlate ? 'border-red-500' : ''}`}
              onChange={(e) => handleInputChange('plate_number', e.target.value)}
              onBlur={handlePlateBlur}
              value={formData.plate_number}
              required
            />
            {!isValidPlate && (
              <p className="text-red-500 text-sm">The plate number should be unique</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="carPhoto" className="block font-medium">
              Car Photo:
            </label>
            {/* <input
              type="url"
              id="carPhoto"
              className={`border border-gray-300 rounded w-full ${
                !isImageValid ? 'border-red-500' : ''
              }`}
              onChange={(e) => handleInputChange('image', e.target.value)}
              onBlur={handleImageBlur}
              value={formData.image}
              required
            /> */}
            <input
              type="file"
              id="carPhoto"
              name="image"
              className={`border border-gray-300 rounded w-full ${!isImageValid ? 'border-red-500' : ''}`}
              onChange={(e) => handleImageChange('image', e.target.files[0])}
              onBlur={handleImageBlur}
              // value={formData.image}
              required
            />
            {!isImageValid && (
              <p className="text-red-500 text-sm">Please enter a valid image.</p>
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
              onChange={(e) => handleInputChange('price', parseInt(e.target.value, 10))}
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

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
};

export default AddCarPage;
