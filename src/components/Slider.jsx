import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import Loader from './loader/Loader';
import { setCars } from '../redux/cars/carsSlice';

const Slider = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const { length } = cars;
  const timeout = useRef(null);

  const nextSlide = () => {
    setCurrent((current) => (current === length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setCurrent((current) => (current === 0 ? length - 1 : current - 1));
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
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
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

  if (!Array.isArray(cars) || cars.length <= 0) {
    return <p className="text-center">No cars to display</p>;
  }

  let visibleCars = window.innerWidth >= 640 ? cars.slice(current, current + 3) : cars.slice(0, 1);
  if (window.innerWidth >= 640) {
    if (visibleCars.length < 3) {
      visibleCars = [
        ...visibleCars,
        ...cars.slice(0, 3 - visibleCars.length),
      ];
    }
  } else {
    visibleCars = cars.slice(current, current + 1);
  }

  return (
    <>
      <section className="relative flex flex-row">
        {visibleCars.map((car) => (
          <div className="slide active flex flex-row" key={car.id}>
            <Link to={`/cars/${car.id}`} className="block">
              <div className="flex flex-col items-center p-4">
                <span>
                  <span className="text-2xl font-semibold">{car.price}</span>
                  <span className="text-sm">$/day</span>
                </span>
                <img className="mb-4 sm:w-52 max-h-28" src={car.image_url} alt="car" />
                <h2 className="text-lg font-semibold mb-2">{car.name}</h2>
                <Link
                  to={`/cars/${car.id}`}
                  className="bg-primary px-3 py-1 my-4 rounded hover:bg-lime-400 text-white"
                >
                  Details
                </Link>
              </div>
            </Link>
          </div>
        ))}
      </section>
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
          className="bg-primary text-gray-200 hover:bg-lime-300 rounded-s-full p-1 md:pe-[0.625rem]"
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
      </div>
    </>
  );
};

export default Slider;
