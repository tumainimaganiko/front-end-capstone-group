import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import Loader from './loader/Loader';
import { setCars } from '../redux/cars/carsSlice';

function Slider() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const { length } = cars;
  const timeout = useRef(null);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    axios
      .get('https://car-rental-api-91yl.onrender.com/api/v1/car')
      .then((res) => {
        dispatch(setCars(res.data));
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    }, 3000);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, length]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-center">{error}</p>;
  }

  return (
    <>
      <div className="overflow-hidden">
        <div className="flex justify-between bg-secondary items-center m-3 relative">
          {cars.map((car, index) => (
            <div
              key={car.id}
              className={`transition-opacity duration-1000 w-full ${
                index === current ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {index === current && (
                <div className="flex flex-col justify-center items-center h-full">
                  <h1 className="text-4xl text-white font-bold mb-4">{car.name}</h1>
                  <Link
                    to={`/Cars/${car.id}`}
                    className="bg-white text-black px-4 py-2 rounded-full"
                  >
                    View Details
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          type="button"
          onClick={prevSlide}
          className="bg-primary text-gray-200 hover:bg-lime-300 rounded-e-full md:ps-6 p-1 "
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          type="button"
          onClick={nextSlide}
          className="bg-primary text-gray-200 hover:bg-lime-300 rounded-s-full p-1 md:pe-6"
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
      </div>

    </>
  );
}

export default Slider;
