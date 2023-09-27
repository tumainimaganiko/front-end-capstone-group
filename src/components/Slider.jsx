import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { fetchCars } from '../redux/cars/carsSlice';

function Slider() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const intervalRef = useRef(null);
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);

  useEffect(() => {
    dispatch(fetchCars());

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === cars.length - 1 ? 0 : prevIndex + 1));
    }, 3500);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [dispatch, cars.length]);

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === cars.length - 1 ? 0 : prevIndex + 1));
    }, 3500);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cars.length - 1 : prevIndex - 1));
    resetInterval();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cars.length - 1 ? 0 : prevIndex + 1));
    resetInterval();
  };

  const handleCarHover = (index) => {
    setHoveredIndex(index);
    resetInterval();
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
        <div className="flex border m-3">
          {visibleCars.map((car, index) => (
            <div
              key={car.id}
              className={`transition-opacity duration-1000 m-3 w-full sm:w-1/2 md:w-1/3 ${
                hoveredIndex === index ? 'hover:scale-105' : ''
              }`}
              onMouseEnter={() => handleCarHover(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                to={`/cars/${car.id}`}
                className="block"
              >
                <div className="flex flex-col items-center p-4">
                  <span>
                    <span className="text-2xl font-semibold">{car.price}</span>
                    <span className="text-sm">99$/day</span>
                  </span>
                  <img className="mb-4" src={car.image} alt="car" />
                  <h2 className="text-lg font-semibold mb-2">{car.name}</h2>
                  <Link
                    to="/"
                    className="bg-primary px-3 py-1 my-4 rounded hover:bg-lime-400 text-white"
                  >
                    Book Now
                  </Link>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          type="button"
          onClick={handlePrev}
          className="bg-primary text-gray-200 hover:bg-lime-300 rounded-e-full md:ps-6 p-1"
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          type="button"
          onClick={handleNext}
          className="bg-primary text-gray-200 hover:bg-lime-300 rounded-s-full p-1 md:pe-6"
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default Slider;
