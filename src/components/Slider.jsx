import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { fetchCars } from '../redux/cars/carsSlice';

function Slider() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cars.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cars.length - 1 ? 0 : prevIndex + 1));
  };

  const visibleCars = [];
  if (window.innerWidth < 640) {
    visibleCars.push(cars[currentIndex]);
  } else {
    const firstIndex = currentIndex === 0 ? cars.length - 1 : currentIndex - 1;
    let secondIndex;
    if (currentIndex === 0) {
      secondIndex = cars.length - 2;
    } else if (currentIndex === 1) {
      secondIndex = cars.length - 1;
    } else {
      secondIndex = currentIndex - 2;
    }
    visibleCars.push(cars[firstIndex], cars[secondIndex], cars[currentIndex]);
  }

  return (
    <div className="relative flex justify-center">
      <div className="overflow-hidden">
        <div className="flex">
          {visibleCars.map((car) => (
            <div
              key={car.id}
              className="transition-opacity duration-1000 w-full sm:w-1/2 md:w-1/3"
            >
              <div className="flex flex-col items-center p-4">
                <img
                  className="mb-4"
                  src={car.image}
                  alt="car"
                />
                <h2 className="text-lg font-semibold mb-2">{car.name}</h2>
                <Link
                  to="/"
                  className="bg-primary px-3 py-1 my-4 rounded hover:bg-lime-400 text-white"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          type="button"
          onClick={handlePrev}
          className="bg-gray-200 text-primary hover:bg-gray-300 rounded-full p-2"
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          type="button"
          onClick={handleNext}
          className="bg-gray-200 text-primary hover:bg-gray-300 rounded-full p-2"
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default Slider;
